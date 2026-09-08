import { NextRequest, NextResponse } from "next/server";
import {
  formatChunksForPrompt,
  getRetrievalConfidence,
  retrieveRelevantChunks
} from "@/lib/agent/retrieve";
import {
  AGENT_SYSTEM_PROMPT,
  buildContextPrompt,
  buildModePrompt
} from "@/lib/agent/systemPrompt";
import type { AgentAction, AgentResponse, AgentSection, AgentSource } from "@/lib/agent/types";
import { createRateLimiter } from "@/lib/rate-limit";
import { contactData } from "@/data/profile";
import {
  generateAgentReply,
  type ModelMessage
} from "@/lib/agent/model";

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

export const maxDuration = 60;
const consumeRateLimit = createRateLimiter({ windowMs: RATE_LIMIT_WINDOW_MS, maxRequests: RATE_LIMIT_MAX_REQUESTS });

const routeCopy = {
  zh: {
    rateLimited: "提问有点快，稍等一下再继续聊。",
    emptyQuestion: "先输入一句想聊的内容吧。",
    tooLong: `问题请控制在 ${MAX_MESSAGE_LENGTH} 字以内。`,
    noEvidence:
      "这个问题不太在国华的站内资料里。我可以简单聊聊，但如果想了解国华本人，问工作、项目、科研或联系方式会更准。",
    refuse:
      "这个问题我不太适合展开。可以换个轻一点的问题，或者问问国华的经历、项目和研究。",
    noAnswer:
      "这个我掌握的信息不多，只能先简单说到这里。你也可以换个问法。",
    genericError:
      "助手暂时卡了一下。可以稍后再试，或者换个更短的问题。",
    languagePrompt:
      "请用轻松、自然、有判断力的中文回答，像一位熟悉国华作品的朋友。默认 1 句结论 + 最多 3 条要点，总长度尽量控制在 220 个中文字符内。优先结合郑国华站内资料；普通闲聊或泛问题也可以直接回答，不要生硬地把每个话题都拉回个人资料。不要假装有实时信息，也不要编造国华资料。",
    structuredPrompt:
      "请只输出 JSON，不要输出 Markdown 或解释。JSON 格式：{\"summary\":\"一句自然结论\",\"bullets\":[\"0-3条短要点\"],\"metrics\":[{\"label\":\"指标名\",\"value\":\"数值\",\"detail\":\"可选说明\"}],\"note\":\"可选补充\"}。如果没有要点或指标，用空数组。语气可以轻松一点。"
  },
  en: {
    rateLimited:
      "You're asking a bit quickly. Give it a moment, then keep going.",
    emptyQuestion: "Type something you'd like to ask.",
    tooLong: `Please keep your question within ${MAX_MESSAGE_LENGTH} characters.`,
    noEvidence:
      "That is not really covered by Guohua's site profile. I can keep it brief, but for Guohua-specific details, work, projects, research and contact questions will be more accurate.",
    refuse:
      "I may not be the best place to go deep on that. Try a lighter question, or ask about Guohua's work, projects or research.",
    noAnswer:
      "I do not have much information on that, so I can only keep the answer brief.",
    genericError:
      "The assistant got stuck for a moment. Please try again or ask a shorter question.",
    languagePrompt:
      "Answer in relaxed, natural English with a clear point of view, like a thoughtful guide who knows Guohua's work. Default to one short conclusion plus up to 3 bullets, ideally under 130 words. Use Guohua's site profile when relevant, but answer casual or general questions directly without forcing every topic back to his profile. Do not pretend to know real-time facts or invent Guohua-specific details.",
    structuredPrompt:
      "Return JSON only, with no Markdown or extra explanation. JSON shape: {\"summary\":\"one natural conclusion\",\"bullets\":[\"0-3 short points\"],\"metrics\":[{\"label\":\"metric name\",\"value\":\"value\",\"detail\":\"optional detail\"}],\"note\":\"optional note\"}. Use natural English casing, not all caps. Empty arrays are fine."
  }
} as const;

const PROFILE_INTENT_HINTS = [
  "郑国华",
  "国华",
  "他的",
  "这位候选人",
  "教育",
  "学校",
  "北大",
  "人大",
  "工作",
  "实习",
  "tako",
  "memory",
  "个性化",
  "personalization",
  "项目",
  "科研",
  "论文",
  "简历",
  "联系",
  "邮箱",
  "github",
  "面试",
  "招聘",
  "候选人",
  "guohua",
  "zheng",
  "resume",
  "contact",
  "candidate",
  "interview",
  "projects", "portfolio", "education", "internship", "work experience", "research", "skills"
];

const GENERAL_CONCEPT_HINTS = [
  "什么是",
  "怎么理解",
  "有什么区别",
  "原理",
  "教程",
  "what is",
  "how does",
  "explain",
  "difference between",
  "tutorial",
  "怎么找工作",
  "如何找工作",
  "求职建议",
  "推荐", "建议", "帮我", "给我", "我想", "recommend", "suggest", "help me", "advice"
];

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

  if (["hi", "hello", "hey", "你好", "您好", "哈喽", "嗨", "在吗", "在不在"].includes(normalized)) {
    return locale === "en"
      ? "Hi, I'm here. You can ask me about Guohua's education, work, projects, research or contact information."
      : "你好，我在。你可以问我关于国华的教育、工作、项目、科研或联系方式。";
  }

  if (["谢谢", "谢谢你", "感谢", "thankyou", "thanks", "thx"].includes(normalized)) {
    return locale === "en"
      ? "You're welcome. I can also help you quickly find details from Guohua's site profile."
      : "不客气。需要的话，我也可以继续帮你快速定位国华的网站信息。";
  }

  if (["你是谁", "你是啥", "你是什么", "你叫什么", "介绍一下你自己", "whoareyou", "whatareyou"].includes(normalized)) {
    return locale === "en"
      ? "I'm the AI assistant on Guohua's personal website, here to help you understand his background, work, projects and contact information."
      : "我是国华个人网站里的 AI 助手，主要帮你快速了解他的背景、经历、项目和联系方式。";
  }

  if (
    ["你能做什么", "你会什么", "怎么用", "help", "帮助", "whatcanyoudo"].includes(normalized)
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

function hasProfileIntent(question: string, sources: AgentSource[] = []) {
  return sources.length > 0 || questionIncludes(question, PROFILE_INTENT_HINTS);
}

function isGeneralConceptQuestion(question: string) {
  const explicitProfile = /国华|guohua|zheng|他的|他在|他做|候选人|your (work|project|experience)|\bhis\b|tako|redflow|scenecart|场景购|小红书|fitlog|练一下|随手记|codex widget/i.test(question);
  return questionIncludes(question, GENERAL_CONCEPT_HINTS) && !explicitProfile;
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

  if (!hasProfileIntent(question, sources)) {
    return [];
  }

  if (
    questionIncludes(question, [
      "简历",
      "履历",
      "具体工作",
      "工作细节",
      "成果数据",
      "内部数据",
      "resume",
      "cv",
      "specific details",
      "internal metrics"
    ])
  ) {
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

  return actions.slice(0, 1);
}

function buildFollowups(question: string, sources: AgentSource[], locale: Locale) {
  const followups: string[] = [];
  const add = (item: string) => {
    if (!followups.includes(item) && normalizeCasualInput(item) !== normalizeCasualInput(question)) {
      followups.push(item);
    }
  };

  if (!hasProfileIntent(question, sources)) {
    return [];
  }

  if (locale === "zh") {
    if (hasAnyCategory(sources, ["experience", "skills"])) {
      add("他的 Agent 经验具体体现在哪里？");
      add("他的个性化 AI 经验是什么？");
      add("哪段经历最匹配 AI 产品经理岗位？");
      add("他的实习方向有哪些？");
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
      add("What is his personalized AI experience?");
      add("Which internship best fits an AI product role?");
      add("What are his internship focus areas?");
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

  return followups.slice(0, 2);
}

function cleanString(value: unknown, maxLength = 260) {
  if (typeof value !== "string") return "";
  const text = value.replace(/\s+/g, " ").trim();
  const characters = Array.from(text);
  if (characters.length <= maxLength) return text;
  let excerpt = characters.slice(0, maxLength - 1).join("");
  // Keep a visible truncation marker and avoid cutting an English word in half.
  if (/[A-Za-z0-9]$/.test(excerpt) && /^[A-Za-z0-9]/.test(characters[maxLength - 1])) {
    const wordBoundary = excerpt.lastIndexOf(" ");
    if (wordBoundary > 0) excerpt = excerpt.slice(0, wordBoundary);
  }
  return `${excerpt.trimEnd()}…`;
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
    const summary = cleanString(parsed.summary, locale === "zh" ? 180 : 900);
    const bullets = cleanStringList(parsed.bullets, 3, locale === "zh" ? 120 : 600);
    const metrics = cleanMetrics(parsed.metrics);
    const note = cleanString(parsed.note, locale === "zh" ? 140 : 700);
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
  if (rankedChunks[0]?.chunk.category === "contact") {
    const reply = locale === "zh"
      ? `可以通过邮箱 ${contactData.email} 联系国华。${contactData.github ? ` GitHub：${contactData.github}` : ""}`
      : `You can contact Guohua at ${contactData.email}.${contactData.github ? ` GitHub: ${contactData.github}` : ""}`;
    return { reply, sections: [{ type: "summary" as const, content: reply }] };
  }
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
  const briefEvidence = (item: RankedChunk, maxLength: number) => {
    const text = item.chunk.text.replace(/\s+/g, " ").trim();
    const summary = text.length > maxLength ? `${text.slice(0, maxLength).trim()}...` : text;
    return `${item.chunk.title}: ${summary}`;
  };

  if (locale === "en") {
    const sections: AgentSection[] = [
      {
        type: "summary",
        content: `Quick version from Guohua's site profile.`
      },
      {
        type: "bullets",
        title: "Highlights",
        items: topChunks.map((item) => briefEvidence(item, 90))
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
      content: `可以，先给你一个基于站内资料的简短版。`
    },
    {
      type: "bullets",
      title: `${categoryText}线索`,
      items: topChunks.map((item) => briefEvidence(item, 70).replace(":", "："))
    }
  ];

  return {
    reply: buildReplyFromSections(sections),
    sections
  };
}

function buildGeneralFallback(locale: Locale) {
  const content =
    locale === "zh"
      ? "暂时没能连接到 AI，无法可靠回答这个问题。可以重试；关于国华的经历、项目和联系方式，我仍能从公开资料中帮你查找。"
      : "I couldn’t connect to the AI to answer this reliably. Please retry. I can still look up Guohua’s work, projects and contact details from the public site.";
  const sections: AgentSection[] = [{ type: "summary", content }];

  return {
    reply: content,
    sections
  };
}

function getClientId(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() ?? "anonymous";
  }

  return request.headers.get("x-real-ip") ?? "anonymous";
}

function retrievalQuestion(messages: ChatMessage[]): string {
  const question = messages.at(-1)!.content;
  const refersBack = /^(那|它|这个|这些|再|具体|详细|展开|还有|为什么|what about|how (does|did) (it|he)|tell me more|more detail|and |why)/i.test(question);
  const newTopic = /国华|guohua|zheng|场景购|scenecart|redflow|小红书|fitlog|练一下|随手记|codex widget|tako|联系|邮箱|教育|学校|科研|论文|天气|音乐|滑雪|contact|email|weather|education|research/i.test(question);
  if (question.length > 100 || !refersBack || newTopic) return question;
  const previousIndex = messages.findLastIndex((message, index) => index < messages.length - 1 && message.role === "user");
  if (previousIndex < 0) return question;
  const previous = retrievalQuestion(messages.slice(0, previousIndex + 1));
  return hasProfileIntent(previous) && !isGeneralConceptQuestion(previous) ? `${previous}\n追问：${question}` : question;
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
  let requestLocale: Locale = "zh";

  try {
    const raw = await request.text();
    if (raw.length > 16_000) return NextResponse.json({ reply: "Request too large." }, { status: 413 });
    let body;
    try { body = JSON.parse(raw); } catch { return NextResponse.json({ reply: "Invalid JSON." }, { status: 400 }); }
    if (!body || typeof body !== "object" || !Array.isArray(body.messages)) {
      return NextResponse.json({ reply: "Invalid messages." }, { status: 400 });
    }
    const locale = normalizeLocale(body.locale);
    requestLocale = locale;
    const copy = routeCopy[locale];
    const latest = body.messages.at(-1);
    if (!latest || latest.role !== "user" || typeof latest.content !== "string" || !latest.content.trim()) {
      return NextResponse.json({ reply: copy.emptyQuestion }, { status: 400 });
    }
    if (latest.content.trim().length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json({ reply: copy.tooLong }, { status: 400 });
    }
    const limit = consumeRateLimit(getClientId(request));
    if (limit.limited) {
      return NextResponse.json({ reply: copy.rateLimited }, { status: 429, headers: { "Retry-After": String(limit.retryAfter) } });
    }
    const sanitized = sanitizeHistory(body.messages);
    const firstUserIndex = sanitized.findIndex((message) => message.role === "user");
    const messages = sanitized.slice(firstUserIndex);
    const latestUserMessage = messages.at(-1)!;
    const casualReply = buildCasualReply(latestUserMessage.content, locale);
    if (casualReply) {
      return NextResponse.json({ reply: casualReply, casual: true, mode: "general", sections: [{ type: "summary", content: casualReply }] } satisfies AgentResponse);
    }
    const query = retrievalQuestion(messages);
    const retrievedChunks = retrieveRelevantChunks(query, 5, locale);
    const retrievalConfidence = getRetrievalConfidence(retrievedChunks);
    const isProfileQuestion = !isGeneralConceptQuestion(query) &&
      (hasProfileIntent(query) || retrievalConfidence !== "low");
    const rankedChunks = isProfileQuestion ? retrievedChunks : [];
    const sources = toSources(rankedChunks);
    const mode = isProfileQuestion ? "profile" : "general";

    const context = isProfileQuestion ? formatChunksForPrompt(rankedChunks) : "";
    const modelMessages: ModelMessage[] = [
      { role: "system", content: [AGENT_SYSTEM_PROMPT, copy.languagePrompt, copy.structuredPrompt,
        buildModePrompt(mode, locale), buildContextPrompt(context)].join("\n\n") },
      ...messages.map(({ role, content }) => ({ role, content }))
    ];

    const modelResult = await generateAgentReply(modelMessages);

    if (!modelResult) {
      const fallback = isProfileQuestion
        ? buildRetrievalFallback(rankedChunks, locale)
        : buildGeneralFallback(locale);
      return NextResponse.json(
        {
          reply: fallback.reply,
          mode,
          sections: fallback.sections,
          fallback: true,
          sources: sources.slice(0, 3),
          actions: buildActions(latestUserMessage.content, sources, locale),
          followups: buildFollowups(latestUserMessage.content, sources, locale)
        } satisfies AgentResponse,
        { status: isProfileQuestion ? 200 : 503 }
      );
    }

    const reply = modelResult.text;

    if (!reply) {
      const sections: AgentSection[] = [{ type: "summary", content: copy.noAnswer }];
      return NextResponse.json(
        {
          reply: copy.noAnswer,
          mode,
          sections,
          sources: sources.slice(0, 3),
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
      mode,
      refused: false,
      sections,
      sources,
      actions: buildActions(latestUserMessage.content, sources, locale),
      followups: buildFollowups(latestUserMessage.content, sources, locale)
    } satisfies AgentResponse);
  } catch {
    const content = routeCopy[requestLocale].genericError;
    const sections: AgentSection[] = [
      {
        type: "summary",
        content
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
