import { NextRequest, NextResponse } from "next/server";
import {
  formatChunksForPrompt,
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

const MAX_MESSAGE_LENGTH = 500;
const MAX_HISTORY_MESSAGES = 8;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 10;

const rateLimitStore = new Map<string, number[]>();

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

    const retrieveResult = shouldRefuseBeforeModel(latestUserMessage.content);

    if (retrieveResult.refuse) {
      return NextResponse.json({
        reply: retrieveResult.reason,
        refused: true
      });
    }

    const rankedChunks = retrieveResult.ranked ?? [];

    const apiKey = process.env.DEEPSEEK_API_KEY;
    const baseUrl = process.env.DEEPSEEK_BASE_URL ?? "https://api.deepseek.com";
    const model = process.env.DEEPSEEK_MODEL ?? "deepseek-chat";

    if (!apiKey) {
      return NextResponse.json(
        {
          reply:
            "当前站点尚未配置资料助手的模型服务。请先在环境变量中设置 DEEPSEEK_API_KEY。"
        },
        { status: 500 }
      );
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

    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model,
        messages: modelMessages,
        temperature: 0.2,
        max_tokens: 280
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        {
          reply:
            "资料助手暂时未能完成回答。请稍后再试，或改问更聚焦的教育、实习、科研或技能问题。",
          error: errorText
        },
        { status: 500 }
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
