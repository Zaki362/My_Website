import { NextRequest, NextResponse } from "next/server";
import {
  formatChunksForPrompt,
  retrieveRelevantChunks,
  shouldRefuseBeforeModel
} from "@/lib/agent/retrieve";
import {
  AGENT_SYSTEM_PROMPT,
  buildContextPrompt
} from "@/lib/agent/systemPrompt";
import type { AgentAction, AgentResponse, AgentSection, AgentSource } from "@/lib/agent/types";
import { contactData } from "@/data/profile";

type ChatRole = "user" | "assistant";
type Locale = "en" | "zh";

type ChatMessage = {
  role: ChatRole;
  content: string;
};

type RankedChunk = {
  chunk: {
    id: string;
    title: string;
    category: string;
    text: string;
    tags: string[];
  };
  score: number;
};

const MAX_MESSAGE_LENGTH = 500;
const MAX_HISTORY_MESSAGES = 8;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 10;

const rateLimitStore = new Map<string, number[]>();

const routeCopy = {
  zh: {
    rateLimited: "提问频率有点快。请稍等片刻后再继续提问关于郑国华资料的问题。",
    emptyQuestion: "请输入一个与郑国华资料相关的问题。",
    tooLong: `问题请控制在 ${MAX_MESSAGE_LENGTH} 字以内。`,
    noEvidence:
      "我在站内资料里没有检索到足够证据回答这个问题。你可以换成更具体的教育、工作、项目、科研、生活或联系方式问题。",
    refuse:
      "这个助手主要回答与郑国华本人相关的资料问题。你可以改问他的教育背景、实习经历、科研、竞赛、技能或项目方向。",
    noAnswer:
      "我目前的资料里没有足够信息回答这个问题。你可以改问他的教育、实习、科研或技能相关内容。",
    genericError:
      "资料助手暂时出现了一点问题。你可以稍后再试，或改问更明确的个人资料问题。",
    languagePrompt:
      "请用简洁中文回答，保持 2 到 6 句。可以简单寒暄，但涉及资料问题时必须基于检索内容。",
    structuredPrompt:
      "请只输出 JSON，不要输出 Markdown 或解释。JSON 格式：{\"summary\":\"一句结论\",\"bullets\":[\"2-4条要点\"],\"metrics\":[{\"label\":\"指标名\",\"value\":\"数值\",\"detail\":\"可选说明\"}],\"note\":\"可选补充\"}。如果没有指标，metrics 用空数组。"
  },
  en: {
    rateLimited:
      "You are asking a bit quickly. Please wait a moment, then continue with questions about Guohua Zheng.",
    emptyQuestion: "Please enter a question about Guohua Zheng's profile.",
    tooLong: `Please keep your question within ${MAX_MESSAGE_LENGTH} characters.`,
    noEvidence:
      "I could not find enough evidence in the site profile. Try asking a more specific question about education, work, projects, research, life or contact information.",
    refuse:
      "This assistant mainly answers questions about Guohua Zheng's own profile. You can ask about his education, work experience, research, honors, skills or projects.",
    noAnswer:
      "I do not have enough site information to answer that. You can ask about Guohua's education, work experience, research, projects or skills.",
    genericError:
      "The assistant ran into a temporary issue. Please try again later or ask a more specific profile question.",
    languagePrompt:
      "Answer in concise English, ideally 2 to 6 sentences. Simple greetings are allowed, but profile questions must be grounded in the retrieved site context.",
    structuredPrompt:
      "Return JSON only, with no Markdown or extra explanation. JSON shape: {\"summary\":\"one-sentence conclusion\",\"bullets\":[\"2-4 concise points\"],\"metrics\":[{\"label\":\"metric name\",\"value\":\"value\",\"detail\":\"optional detail\"}],\"note\":\"optional note\"}. Use natural English casing, not all caps. If there are no metrics, use an empty metrics array."
  }
} as const;

function normalizeCasualInput(input: string) {
  return input
    .toLowerCase()
    .replace(/[\s,，.。!！?？~～、]/g, "")
    .trim();
}

function normalizeLocale(input: unknown): Locale {
  return input === "en" ? "en" : "zh";
}

function buildCasualReply(question: string, locale: Locale) {
  const normalized = normalizeCasualInput(question);

  if (!normalized) {
    return null;
  }

  if (
    ["hi", "hello", "hey", "你好", "您好", "哈喽", "嗨", "在吗", "在不在"].some((item) =>
      normalized.includes(item)
    )
  ) {
    return locale === "en"
      ? "Hi, I'm here. You can ask me about Guohua's education, work, projects, research or contact information."
      : "你好，我在。你可以问我关于国华的教育、工作、项目、科研或联系方式。";
  }

  if (["谢谢", "感谢", "thank", "thanks", "thx"].some((item) => normalized.includes(item))) {
    return locale === "en"
      ? "You're welcome. I can also help you quickly find details from Guohua's site profile."
      : "不客气。需要的话，我也可以继续帮你快速定位国华的网站信息。";
  }

  if (["你是谁", "你是啥", "你是什么", "whoareyou"].some((item) => normalized.includes(item))) {
    return locale === "en"
      ? "I'm the AI assistant on Guohua's personal website, here to help you understand his background, work, projects and contact information."
      : "我是国华个人网站里的 AI 助手，主要帮你快速了解他的背景、经历、项目和联系方式。";
  }

  if (
    ["你能做什么", "你会什么", "怎么用", "help", "帮助"].some((item) =>
      normalized.includes(item)
    )
  ) {
    return locale === "en"
      ? "I can briefly answer questions about Guohua's education, work, projects, research, skills and contact information. Light greetings are fine too."
      : "我可以简短回答国华的教育、工作、项目、科研、技能和联系方式，也可以做一点简单寒暄。";
  }

  if (["早上好", "中午好", "下午好", "晚上好", "晚安"].some((item) => normalized.includes(item))) {
    return locale === "en"
      ? "Hi. Hope your day is going well, and feel free to keep asking about Guohua's profile."
      : "你好呀。祝你今天顺利，也欢迎继续问我关于国华的资料。";
  }

  return null;
}

function sourceCategoryLabel(category: string, locale: Locale) {
  const labels: Record<string, { zh: string; en: string }> = {
    identity: { zh: "定位", en: "Profile" },
    education: { zh: "教育", en: "Education" },
    honor: { zh: "荣誉", en: "Honors" },
    experience: { zh: "工作", en: "Work" },
    research: { zh: "科研", en: "Research" },
    campus: { zh: "校园", en: "Campus" },
    skills: { zh: "技能", en: "Skills" },
    "project-interest": { zh: "方向", en: "Interests" },
    project: { zh: "项目", en: "Projects" },
    contact: { zh: "联系", en: "Contact" },
    beyond: { zh: "生活", en: "Life" }
  };

  return labels[category]?.[locale] ?? category;
}

function toSources(rankedChunks: RankedChunk[]) {
  const seen = new Set<string>();
  const sources: AgentSource[] = [];

  for (const item of rankedChunks) {
    if (seen.has(item.chunk.id)) {
      continue;
    }

    seen.add(item.chunk.id);
    sources.push({
      id: item.chunk.id,
      title: item.chunk.title,
      category: item.chunk.category
    });
  }

  return sources.slice(0, 5);
}

function hasAnyCategory(sources: AgentSource[], categories: string[]) {
  return sources.some((source) => categories.includes(source.category));
}

function questionIncludes(question: string, hints: string[]) {
  const normalized = normalizeCasualInput(question);
  return hints.some((hint) => normalized.includes(normalizeCasualInput(hint)));
}

function addAction(actions: AgentAction[], action: AgentAction) {
  if (!actions.some((item) => item.id === action.id)) {
    actions.push(action);
  }
}

function buildActions(question: string, sources: AgentSource[], locale: Locale): AgentAction[] {
  const actions: AgentAction[] = [];
  const copy =
    locale === "zh"
      ? {
          work: "查看工作",
          projects: "查看项目",
          research: "查看科研",
          education: "查看教育",
          contact: "联系国华",
          copyEmail: "复制邮箱",
          resume: "申请简历"
        }
      : {
          work: "View work",
          projects: "View projects",
          research: "View research",
          education: "View education",
          contact: "Contact Guohua",
          copyEmail: "Copy email",
          resume: "Request resume"
        };

  if (questionIncludes(question, ["简历", "履历", "resume", "cv"])) {
    addAction(actions, { id: "resume", label: copy.resume, kind: "resume", variant: "primary" });
  }

  if (hasAnyCategory(sources, ["experience", "skills"]) || questionIncludes(question, ["工作", "实习", "agent", "aigc", "面试", "招聘", "candidate", "fit", "hire"])) {
    addAction(actions, { id: "work", label: copy.work, kind: "anchor", href: "#experience", variant: actions.length ? "secondary" : "primary" });
  }

  if (hasAnyCategory(sources, ["project", "project-interest"]) || questionIncludes(question, ["项目", "作品", "vibe", "project", "portfolio"])) {
    addAction(actions, { id: "projects", label: copy.projects, kind: "anchor", href: "#projects", variant: actions.length ? "secondary" : "primary" });
  }

  if (hasAnyCategory(sources, ["research"]) || questionIncludes(question, ["科研", "论文", "research", "paper"])) {
    addAction(actions, { id: "research", label: copy.research, kind: "anchor", href: "#research", variant: actions.length ? "secondary" : "primary" });
  }

  if (hasAnyCategory(sources, ["education", "honor", "campus"]) || questionIncludes(question, ["教育", "学校", "北大", "人大", "education", "school"])) {
    addAction(actions, { id: "education", label: copy.education, kind: "anchor", href: "#education", variant: actions.length ? "secondary" : "primary" });
  }

  if (hasAnyCategory(sources, ["contact"]) || questionIncludes(question, ["联系", "邮箱", "合作", "contact", "email"])) {
    addAction(actions, { id: "contact", label: copy.contact, kind: "anchor", href: "#contact", variant: actions.length ? "secondary" : "primary" });
    addAction(actions, { id: "copy-email", label: copy.copyEmail, kind: "copy", value: contactData.email, variant: "secondary" });
  }

  if (actions.length === 0) {
    addAction(actions, { id: "work", label: copy.work, kind: "anchor", href: "#experience", variant: "primary" });
    addAction(actions, { id: "projects", label: copy.projects, kind: "anchor", href: "#projects", variant: "secondary" });
    addAction(actions, { id: "contact", label: copy.contact, kind: "anchor", href: "#contact", variant: "secondary" });
  }

  return actions.slice(0, 3);
}

function buildFollowups(question: string, sources: AgentSource[], locale: Locale) {
  const followups: string[] = [];
  const add = (item: string) => {
    if (!followups.includes(item) && normalizeCasualInput(item) !== normalizeCasualInput(question)) {
      followups.push(item);
    }
  };

  if (locale === "zh") {
    if (hasAnyCategory(sources, ["experience", "skills"])) {
      add("他的 Agent 经验具体体现在哪里？");
      add("哪段经历最匹配 AI 产品经理岗位？");
      add("有哪些可量化成果？");
    }
    if (hasAnyCategory(sources, ["project", "project-interest"])) {
      add("有哪些 Vibe Coding 项目？");
      add("这些项目体现了什么产品能力？");
    }
    if (hasAnyCategory(sources, ["research"])) {
      add("这篇论文能证明什么能力？");
    }
    if (hasAnyCategory(sources, ["education", "honor", "campus"])) {
      add("他的教育和荣誉亮点是什么？");
    }
    if (hasAnyCategory(sources, ["contact"]) || questionIncludes(question, ["简历", "联系"])) {
      add("如何申请查看简历？");
    }
    add("他适合 AI 产品经理岗位吗？");
    add("怎么联系国华？");
  } else {
    if (hasAnyCategory(sources, ["experience", "skills"])) {
      add("What is his Agent experience?");
      add("Which internship best fits an AI product role?");
      add("What measurable impact did he deliver?");
    }
    if (hasAnyCategory(sources, ["project", "project-interest"])) {
      add("What Vibe Coding projects has he built?");
      add("What product skills do the projects show?");
    }
    if (hasAnyCategory(sources, ["research"])) {
      add("What does the JEEM paper demonstrate?");
    }
    if (hasAnyCategory(sources, ["education", "honor", "campus"])) {
      add("What are his education and honors highlights?");
    }
    if (hasAnyCategory(sources, ["contact"]) || questionIncludes(question, ["resume", "contact"])) {
      add("How can I request his resume?");
    }
    add("Why is he a good AI product candidate?");
    add("How can I contact Guohua?");
  }

  return followups.slice(0, 3);
}

function cleanString(value: unknown, maxLength = 260) {
  return typeof value === "string" ? value.replace(/\s+/g, " ").trim().slice(0, maxLength) : "";
}

function cleanStringList(value: unknown, maxItems: number, maxLength = 180) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => cleanString(item, maxLength))
    .filter(Boolean)
    .slice(0, maxItems);
}

function cleanMetrics(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => {
      if (!item || typeof item !== "object") {
        return null;
      }

      const label = cleanString(Reflect.get(item, "label"), 44);
      const metricValue = cleanString(Reflect.get(item, "value"), 44);
      const detail = cleanString(Reflect.get(item, "detail"), 90);

      if (!label || !metricValue) {
        return null;
      }

      return detail ? { label, value: metricValue, detail } : { label, value: metricValue };
    })
    .filter((item): item is { label: string; value: string; detail?: string } => Boolean(item))
    .slice(0, 3);
}

function buildReplyFromSections(sections: AgentSection[]) {
  return sections
    .map((section) => {
      if (section.type === "summary" || section.type === "note") {
        return section.content;
      }

      if (section.type === "bullets") {
        return section.items.map((item) => `- ${item}`).join("\n");
      }

      return section.items
        .map((item) => `- ${item.label}: ${item.value}${item.detail ? `, ${item.detail}` : ""}`)
        .join("\n");
    })
    .filter(Boolean)
    .join("\n");
}

function sectionsFromPlainText(reply: string, locale: Locale): AgentSection[] {
  const lines = reply
    .split(/\n+/)
    .map((line) => line.replace(/^[-*•]\s*/, "").trim())
    .filter(Boolean);
  const summary = lines[0] ?? (locale === "zh" ? routeCopy.zh.noAnswer : routeCopy.en.noAnswer);
  const bullets = lines.slice(1, 5);

  return [
    { type: "summary", content: summary },
    ...(bullets.length ? [{ type: "bullets" as const, title: locale === "zh" ? "要点" : "Key points", items: bullets }] : [])
  ];
}

function parseStructuredSections(rawReply: string, locale: Locale) {
  const firstBrace = rawReply.indexOf("{");
  const lastBrace = rawReply.lastIndexOf("}");

  if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
    return sectionsFromPlainText(rawReply, locale);
  }

  try {
    const parsed = JSON.parse(rawReply.slice(firstBrace, lastBrace + 1)) as Record<string, unknown>;
    const summary = cleanString(parsed.summary, 260);
    const bullets = cleanStringList(parsed.bullets, 4, 180);
    const metrics = cleanMetrics(parsed.metrics);
    const note = cleanString(parsed.note, 220);
    const sections: AgentSection[] = [];

    if (summary) {
      sections.push({ type: "summary", content: summary });
    }

    if (bullets.length) {
      sections.push({ type: "bullets", title: locale === "zh" ? "要点" : "Key points", items: bullets });
    }

    if (metrics.length) {
      sections.push({ type: "metrics", title: locale === "zh" ? "证据指标" : "Evidence metrics", items: metrics });
    }

    if (note) {
      sections.push({ type: "note", content: note });
    }

    return sections.length ? sections : sectionsFromPlainText(rawReply, locale);
  } catch {
    return sectionsFromPlainText(rawReply, locale);
  }
}

function buildRetrievalFallback(rankedChunks: RankedChunk[], locale: Locale) {
  if (rankedChunks.length === 0) {
    const sections: AgentSection[] = [{ type: "summary", content: routeCopy[locale].noEvidence }];
    return {
      reply: buildReplyFromSections(sections),
      sections
    };
  }

  const topChunks = rankedChunks.slice(0, 3);
  const categories = Array.from(new Set(topChunks.map((item) => item.chunk.category)));
  const categoryText = categories.map((category) => sourceCategoryLabel(category, locale)).join(locale === "zh" ? "、" : ", ");

  if (locale === "en") {
    const sections: AgentSection[] = [
      {
        type: "summary",
        content: `I found related site evidence in ${categoryText}, but the model service is temporarily unavailable.`
      },
      {
        type: "bullets",
        title: "Available evidence",
        items: topChunks.map((item) => `${sourceCategoryLabel(item.chunk.category, locale)}: ${item.chunk.title}`)
      }
    ];

    return {
      reply: buildReplyFromSections(sections),
      sections
    };
  }

  const sections: AgentSection[] = [
    {
      type: "summary",
      content: `我从站内资料中检索到 ${categoryText} 相关信息，先做一个简短归纳。`
    },
    {
      type: "bullets",
      title: "站内证据",
      items: topChunks.map((item) => {
        const summary =
          item.chunk.text.length > 110 ? `${item.chunk.text.slice(0, 110).trim()}...` : item.chunk.text;
        return `${item.chunk.title}：${summary}`;
      })
    }
  ];

  return {
    reply: buildReplyFromSections(sections),
    sections
  };
}

function getModelConfig() {
  if (process.env.DEEPSEEK_API_KEY) {
    return {
      apiKey: process.env.DEEPSEEK_API_KEY,
      baseUrl: process.env.DEEPSEEK_BASE_URL ?? "https://api.deepseek.com",
      model: process.env.DEEPSEEK_MODEL ?? process.env.AGENT_MODEL ?? "deepseek-chat"
    };
  }

  if (process.env.OPENAI_API_KEY) {
    return {
      apiKey: process.env.OPENAI_API_KEY,
      baseUrl: process.env.OPENAI_BASE_URL ?? "https://api.openai.com/v1",
      model: process.env.OPENAI_MODEL ?? process.env.AGENT_MODEL ?? "gpt-4.1-mini"
    };
  }

  return null;
}

function getClientId(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() ?? "anonymous";
  }

  return request.headers.get("x-real-ip") ?? "anonymous";
}

function isRateLimited(clientId: string) {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  const requests = rateLimitStore.get(clientId) ?? [];
  const recent = requests.filter((timestamp) => timestamp > windowStart);

  if (recent.length >= RATE_LIMIT_MAX_REQUESTS) {
    rateLimitStore.set(clientId, recent);
    return true;
  }

  recent.push(now);
  rateLimitStore.set(clientId, recent);
  return false;
}

function sanitizeHistory(messages: unknown): ChatMessage[] {
  if (!Array.isArray(messages)) {
    return [];
  }

  return messages
    .filter((message): message is ChatMessage => {
      if (!message || typeof message !== "object") {
        return false;
      }

      const role = Reflect.get(message, "role");
      const content = Reflect.get(message, "content");

      return (
        (role === "user" || role === "assistant") &&
        typeof content === "string" &&
        content.trim().length > 0
      );
    })
    .slice(-MAX_HISTORY_MESSAGES)
    .map((message) => ({
      role: message.role,
      content: message.content.trim().slice(0, MAX_MESSAGE_LENGTH)
    }));
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const locale = normalizeLocale(body.locale);
    const copy = routeCopy[locale];
    const clientId = getClientId(request);

    if (isRateLimited(clientId)) {
      return NextResponse.json(
        {
          reply: copy.rateLimited
        },
        { status: 429 }
      );
    }

    const messages = sanitizeHistory(body.messages);
    const latestUserMessage = [...messages].reverse().find((message) => message.role === "user");

    if (!latestUserMessage) {
      return NextResponse.json(
        { reply: copy.emptyQuestion },
        { status: 400 }
      );
    }

    if (latestUserMessage.content.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json(
        { reply: copy.tooLong },
        { status: 400 }
      );
    }

    const casualReply = buildCasualReply(latestUserMessage.content, locale);

    if (casualReply) {
      const sources: AgentSource[] = [];
      const sections: AgentSection[] = [{ type: "summary", content: casualReply }];
      return NextResponse.json({
        reply: casualReply,
        refused: false,
        casual: true,
        sections,
        actions: buildActions(latestUserMessage.content, sources, locale),
        followups: buildFollowups(latestUserMessage.content, sources, locale)
      } satisfies AgentResponse);
    }

    const retrieveResult = shouldRefuseBeforeModel(latestUserMessage.content);

    if (retrieveResult.refuse) {
      const refusedReply = locale === "zh" ? retrieveResult.reason ?? copy.refuse : copy.refuse;
      const sections: AgentSection[] = [{ type: "summary", content: refusedReply }];
      return NextResponse.json({
        reply: refusedReply,
        refused: true,
        sections,
        followups: buildFollowups(latestUserMessage.content, [], locale)
      } satisfies AgentResponse);
    }

    const rankedChunks = retrieveResult.ranked?.length
      ? retrieveResult.ranked
      : retrieveRelevantChunks(latestUserMessage.content);
    const sources = toSources(rankedChunks);
    const modelConfig = getModelConfig();

    if (!modelConfig) {
      const fallback = buildRetrievalFallback(rankedChunks, locale);
      return NextResponse.json({
        reply: fallback.reply,
        refused: false,
        fallback: true,
        sections: fallback.sections,
        sources,
        actions: buildActions(latestUserMessage.content, sources, locale),
        followups: buildFollowups(latestUserMessage.content, sources, locale)
      } satisfies AgentResponse);
    }

    const context = formatChunksForPrompt(rankedChunks);
    const modelMessages = [
      { role: "system", content: AGENT_SYSTEM_PROMPT },
      { role: "system", content: copy.languagePrompt },
      { role: "system", content: copy.structuredPrompt },
      { role: "system", content: buildContextPrompt(context) },
      ...messages.map((message) => ({
        role: message.role,
        content: message.content
      }))
    ];

    const response = await fetch(`${modelConfig.baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${modelConfig.apiKey}`
      },
      body: JSON.stringify({
        model: modelConfig.model,
        messages: modelMessages,
        temperature: 0.18,
        max_tokens: 420
      })
    });

    if (!response.ok) {
      await response.text().catch(() => "");
      const fallback = buildRetrievalFallback(rankedChunks, locale);
      return NextResponse.json(
        {
          reply: fallback.reply,
          sections: fallback.sections,
          fallback: true,
          sources,
          actions: buildActions(latestUserMessage.content, sources, locale),
          followups: buildFollowups(latestUserMessage.content, sources, locale)
        } satisfies AgentResponse,
        { status: 200 }
      );
    }

    const data = await response.json();
    const reply = data?.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      const sections: AgentSection[] = [{ type: "summary", content: copy.noAnswer }];
      return NextResponse.json(
        {
          reply: copy.noAnswer,
          sections,
          sources,
          actions: buildActions(latestUserMessage.content, sources, locale),
          followups: buildFollowups(latestUserMessage.content, sources, locale)
        } satisfies AgentResponse,
        { status: 200 }
      );
    }

    const sections = parseStructuredSections(reply, locale);
    const structuredReply = buildReplyFromSections(sections);

    return NextResponse.json({
      reply: structuredReply,
      refused: false,
      sections,
      sources,
      actions: buildActions(latestUserMessage.content, sources, locale),
      followups: buildFollowups(latestUserMessage.content, sources, locale)
    } satisfies AgentResponse);
  } catch {
    const sections: AgentSection[] = [
      {
        type: "summary",
        content:
          "The assistant ran into a temporary issue. Please try again later, or ask a more specific profile question."
      }
    ];
    return NextResponse.json(
      {
        reply: buildReplyFromSections(sections),
        sections
      } satisfies AgentResponse,
      { status: 500 }
    );
  }
}
