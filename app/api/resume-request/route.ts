import { NextRequest, NextResponse } from "next/server";

type Locale = "en" | "zh";

const MAX_REASON_LENGTH = 600;
const RATE_LIMIT_WINDOW_MS = 10 * 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const rateLimitStore = new Map<string, number[]>();

const copy = {
  zh: {
    invalidEmail: "请输入有效邮箱。",
    invalidReason: "请填写简短的查看原因。",
    rateLimited: "提交过于频繁，请稍后再试。",
    notConfigured: "Formspree 表单转发暂未配置。",
    failed: "表单转发失败，请稍后再试。",
    subject: "有人申请查看你的简历"
  },
  en: {
    invalidEmail: "Please enter a valid email.",
    invalidReason: "Please enter a brief reason.",
    rateLimited: "Too many submissions. Please try again later.",
    notConfigured: "Formspree forwarding is not configured yet.",
    failed: "Form forwarding failed. Please try again later.",
    subject: "Someone requested access to your resume"
  }
} as const;

function normalizeLocale(input: unknown): Locale {
  return input === "en" ? "en" : "zh";
}

function cleanText(input: unknown, maxLength: number) {
  return typeof input === "string" ? input.replace(/\s+/g, " ").trim().slice(0, maxLength) : "";
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

function buildFormspreePayload({
  email,
  reason,
  locale,
  request
}: {
  email: string;
  reason: string;
  locale: Locale;
  request: NextRequest;
}) {
  const createdAt = new Date().toLocaleString("zh-CN", {
    timeZone: "Asia/Shanghai",
    hour12: false
  });
  const pageUrl = request.headers.get("referer") ?? "Unknown";

  return {
    _subject: copy[locale].subject,
    _replyto: email,
    email,
    reason,
    message:
      locale === "en"
        ? `A visitor requested access to Guohua Zheng's resume.\n\nVisitor email: ${email}\nReason: ${reason}\nTime: ${createdAt}\nPage: ${pageUrl}`
        : `有访客申请查看郑国华的简历。\n\n访客邮箱：${email}\n查看原因：${reason}\n提交时间：${createdAt}\n来源页面：${pageUrl}`,
    locale,
    pageUrl,
    submittedAt: createdAt
  };
}

function getFormspreeEndpoint() {
  const endpoint = process.env.FORMSPREE_ENDPOINT?.trim();

  if (!endpoint) {
    return null;
  }

  try {
    const parsed = new URL(endpoint);
    return parsed.protocol === "https:" ? parsed.toString() : null;
  } catch {
    return null;
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const locale = normalizeLocale(body?.locale);
  const localeCopy = copy[locale];
  const clientId = getClientId(request);

  if (isRateLimited(clientId)) {
    return NextResponse.json({ error: localeCopy.rateLimited, code: "RATE_LIMITED" }, { status: 429 });
  }

  const email = cleanText(body?.email, 120).toLowerCase();
  const reason = cleanText(body?.reason, MAX_REASON_LENGTH);

  if (!emailPattern.test(email)) {
    return NextResponse.json({ error: localeCopy.invalidEmail, code: "INVALID_EMAIL" }, { status: 400 });
  }

  if (reason.length < 4) {
    return NextResponse.json({ error: localeCopy.invalidReason, code: "INVALID_REASON" }, { status: 400 });
  }

  const endpoint = getFormspreeEndpoint();

  if (!endpoint) {
    return NextResponse.json(
      { error: localeCopy.notConfigured, code: "FORMSPREE_NOT_CONFIGURED" },
      { status: 503 }
    );
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(buildFormspreePayload({ email, reason, locale, request }))
  });

  if (!response.ok) {
    const providerError = await response.text().catch(() => "");
    console.error("Failed to forward resume request through Formspree", providerError);
    return NextResponse.json({ error: localeCopy.failed, code: "FORMSPREE_FAILED" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
