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

type ChatRole = "user" | "assistant";

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

function normalizeCasualInput(input: string) {
  return input
    .toLowerCase()
    .replace(/[\s,，.。!！?？~～、]/g, "")
    .trim();
}

function buildCasualReply(question: string) {
  const normalized = normalizeCasualInput(question);

  if (!normalized) {
    return null;
  }

  if (
    ["hi", "hello", "hey", "你好", "您好", "哈喽", "嗨", "在吗", "在不在"].some((item) =>
      normalized.includes(item)
    )
  ) {
    return "你好，我在。你可以问我关于国华的教育、工作、项目、科研或联系方式。";
  }

  if (["谢谢", "感谢", "thank", "thanks", "thx"].some((item) => normalized.includes(item))) {
    return "不客气。需要的话，我也可以继续帮你快速定位国华的网站信息。";
  }

  if (["你是谁", "你是啥", "你是什么", "whoareyou"].some((item) => normalized.includes(item))) {
    return "我是国华个人网站里的 AI 助手，主要帮你快速了解他的背景、经历、项目和联系方式。";
  }

  if (
    ["你能做什么", "你会什么", "怎么用", "help", "帮助"].some((item) =>
      normalized.includes(item)
    )
  ) {
    return "我可以简短回答国华的教育、工作、项目、科研、技能和联系方式，也可以做一点简单寒暄。";
  }

  if (["早上好", "中午好", "下午好", "晚上好", "晚安"].some((item) => normalized.includes(item))) {
    return "你好呀。祝你今天顺利，也欢迎继续问我关于国华的资料。";
  }

  return null;
}

function buildRetrievalFallbackReply(rankedChunks: RankedChunk[]) {
  if (rankedChunks.length === 0) {
    return "我在站内资料里没有检索到足够证据回答这个问题。你可以换成更具体的教育、工作、项目、科研、生活或联系方式问题。";
  }

  const topChunks = rankedChunks.slice(0, 3);
  const categories = Array.from(new Set(topChunks.map((item) => item.chunk.category)));
  const evidence = topChunks
    .map((item) => {
      const summary =
        item.chunk.text.length > 150 ? `${item.chunk.text.slice(0, 150).trim()}...` : item.chunk.text;
      return `- ${item.chunk.title}：${summary}`;
    })
    .join("\n");

  return `我从站内资料中检索到 ${categories.join("、")} 相关信息，先做一个简短归纳：\n${evidence}\n\n你也可以继续问得更具体，我会再从站内资料里缩小范围。`;
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
    const clientId = getClientId(request);

    if (isRateLimited(clientId)) {
      return NextResponse.json(
        {
          reply:
            "提问频率有点快。请稍等片刻后再继续提问关于郑国华资料的问题。"
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    const messages = sanitizeHistory(body.messages);
    const latestUserMessage = [...messages].reverse().find((message) => message.role === "user");

    if (!latestUserMessage) {
      return NextResponse.json(
        { reply: "请输入一个与郑国华资料相关的问题。" },
        { status: 400 }
      );
    }

    if (latestUserMessage.content.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json(
        { reply: `问题请控制在 ${MAX_MESSAGE_LENGTH} 字以内。` },
        { status: 400 }
      );
    }

    const casualReply = buildCasualReply(latestUserMessage.content);

    if (casualReply) {
      return NextResponse.json({
        reply: casualReply,
        refused: false,
        casual: true
      });
    }

    const retrieveResult = shouldRefuseBeforeModel(latestUserMessage.content);

    if (retrieveResult.refuse) {
      return NextResponse.json({
        reply: retrieveResult.reason,
        refused: true
      });
    }

    const rankedChunks = retrieveResult.ranked?.length
      ? retrieveResult.ranked
      : retrieveRelevantChunks(latestUserMessage.content);
    const modelConfig = getModelConfig();

    if (!modelConfig) {
      return NextResponse.json({
        reply: buildRetrievalFallbackReply(rankedChunks),
        refused: false,
        fallback: true,
        sources: rankedChunks.map((item) => ({
          id: item.chunk.id,
          title: item.chunk.title,
          category: item.chunk.category
        }))
      });
    }

    const context = formatChunksForPrompt(rankedChunks);
    const modelMessages = [
      { role: "system", content: AGENT_SYSTEM_PROMPT },
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
      const errorText = await response.text();
      return NextResponse.json(
        {
          reply: buildRetrievalFallbackReply(rankedChunks),
          fallback: true,
          error: errorText
        },
        { status: 200 }
      );
    }

    const data = await response.json();
    const reply = data?.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      return NextResponse.json(
        {
          reply:
            "我目前的资料里没有足够信息回答这个问题。你可以改问他的教育、实习、科研或技能相关内容。"
        },
        { status: 200 }
      );
    }

    return NextResponse.json({
      reply,
      refused: false,
      sources: rankedChunks.map((item) => ({
        id: item.chunk.id,
        title: item.chunk.title,
        category: item.chunk.category
      }))
    });
  } catch {
    return NextResponse.json(
      {
        reply:
          "资料助手暂时出现了一点问题。你可以稍后再试，或改问更明确的个人资料问题。"
      },
      { status: 500 }
    );
  }
}
