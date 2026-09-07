export type ModelMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

type ModelCandidate = {
  provider: "deepseek" | "openai";
  apiKey: string;
  baseUrl: string;
  model: string;
};

type ModelResult = {
  text: string;
  provider: ModelCandidate["provider"];
  model: string;
};

const PROVIDER_TIMEOUT_MS = 20_000;
const TOTAL_TIMEOUT_MS = 30_000;

function env(name: string) {
  return process.env[name]?.trim() || undefined;
}

function getModelCandidates(): ModelCandidate[] {
  const candidates: ModelCandidate[] = [];
  for (const provider of ["deepseek", "openai"] as const) {
    const prefix = provider.toUpperCase();
    const apiKey = env(`${prefix}_API_KEY`);
    if (!apiKey || /^(?:your[_-]|<.*>$|changeme$|replace[_-]?me$|sk-your[_-])/i.test(apiKey)) {
      continue;
    }
    candidates.push({
      provider,
      apiKey,
      baseUrl: (env(`${prefix}_BASE_URL`) ?? (provider === "deepseek"
        ? "https://api.deepseek.com"
        : "https://api.openai.com/v1")).replace(/\/+$/, ""),
      model: env(`${prefix}_MODEL`) ?? (provider === "deepseek"
        ? env("AGENT_MODEL") ?? "deepseek-chat"
        : env("AGENT_FALLBACK_MODEL") ?? "gpt-4.1-mini")
    });
  }
  return candidates;
}

function httpFailure(status: number) {
  if (status === 401 || status === 403) return "authentication";
  if (status === 402) return "quota";
  if (status === 429) return "rate_limit";
  if (status >= 500) return "provider_error";
  return "invalid_request";
}

function supportsFormatRetry(errorBody: string) {
  return /response_format|json_object/i.test(errorBody) &&
    /unsupported|not supported|does not support|not support|not allowed|unknown parameter|unrecognized/i.test(errorBody);
}

function validReply(text: string, structured: boolean) {
  const cleaned = text.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();
  if (!structured && !/^[{\[]|"(?:summary|bullets|metrics|note)"\s*:/.test(cleaned)) return true;
  try {
    const value = JSON.parse(cleaned);
    if (!value || typeof value !== "object" || Array.isArray(value)) return false;
    const hasText = (item: unknown) => typeof item === "string" && Boolean(item.trim());
    return hasText(value.summary) || hasText(value.note) ||
      (Array.isArray(value.bullets) && value.bullets.some(hasText)) ||
      (Array.isArray(value.metrics) && value.metrics.some((item: { label?: unknown; value?: unknown } | null) =>
        item && hasText(item.label) && hasText(item.value)));
  } catch {
    return false;
  }
}

async function requestCandidate(candidate: ModelCandidate, messages: ModelMessage[], budgetMs: number) {
  const controller = new AbortController();
  const startedAt = Date.now();
  const timeout = setTimeout(() => controller.abort(), budgetMs);
  const diagnose = (category: string, attempt: number, status?: number) => {
    // Only fixed categories and transport metadata: never prompts, keys or upstream error bodies.
    console.warn("[agent:model]", {
      provider: candidate.provider, category, status, attempt, elapsedMs: Date.now() - startedAt
    });
  };

  try {
    for (let attempt = 1; attempt <= 2; attempt += 1) {
      if (controller.signal.aborted || Date.now() - startedAt >= budgetMs) return null;
      const structured = attempt === 1;
      try {
        const response = await fetch(`${candidate.baseUrl}/chat/completions`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${candidate.apiKey}`
          },
          body: JSON.stringify({
            model: candidate.model,
            messages,
            temperature: 0.58,
            max_tokens: 800,
            ...(structured ? { response_format: { type: "json_object" } } : {})
          }),
          cache: "no-store",
          signal: controller.signal
        });

        if (!response.ok) {
          const errorBody = await response.text().catch(() => "");
          diagnose(httpFailure(response.status), attempt, response.status);
          if (structured && response.status === 400 && supportsFormatRetry(errorBody)) continue;
          return null;
        }

        const data = await response.json().catch(() => null);
        if (controller.signal.aborted) {
          diagnose("timeout", attempt, response.status);
          return null;
        }
        const choice = data?.choices?.[0];
        const text = typeof choice?.message?.content === "string" ? choice.message.content.trim() : "";
        const category = choice?.finish_reason === "length" ? "truncated_output"
          : choice?.finish_reason && choice.finish_reason !== "stop" ? "incomplete_output"
          : !data ? "invalid_response"
          : !text ? "empty_output"
          : !validReply(text, structured) ? "invalid_output" : null;
        if (category) {
          diagnose(category, attempt, response.status);
          if (structured && category !== "incomplete_output") continue;
          return null;
        }
        return { text, provider: candidate.provider, model: candidate.model } satisfies ModelResult;
      } catch {
        diagnose(controller.signal.aborted ? "timeout" : "network_error", attempt);
        return null;
      }
    }
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

export function hasConfiguredAgentModel() {
  return getModelCandidates().length > 0;
}

export async function generateAgentReply(messages: ModelMessage[]) {
  const candidates = getModelCandidates();
  const deadline = Date.now() + TOTAL_TIMEOUT_MS;
  if (!candidates.length) console.warn("[agent:model]", { category: "not_configured" });
  for (const candidate of candidates) {
    const remaining = deadline - Date.now();
    if (remaining <= 0) break;
    const result = await requestCandidate(candidate, messages, Math.min(PROVIDER_TIMEOUT_MS, remaining));
    if (result) return result;
  }
  return null;
}
