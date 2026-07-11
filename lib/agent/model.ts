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

const REQUEST_TIMEOUT_MS = 14_000;

function normalizeBaseUrl(value: string) {
  return value.replace(/\/+$/, "");
}

function getModelCandidates(): ModelCandidate[] {
  const candidates: ModelCandidate[] = [];

  if (process.env.DEEPSEEK_API_KEY) {
    candidates.push({
      provider: "deepseek",
      apiKey: process.env.DEEPSEEK_API_KEY,
      baseUrl: normalizeBaseUrl(process.env.DEEPSEEK_BASE_URL ?? "https://api.deepseek.com"),
      model: process.env.DEEPSEEK_MODEL ?? process.env.AGENT_MODEL ?? "deepseek-chat"
    });
  }

  if (process.env.OPENAI_API_KEY) {
    candidates.push({
      provider: "openai",
      apiKey: process.env.OPENAI_API_KEY,
      baseUrl: normalizeBaseUrl(process.env.OPENAI_BASE_URL ?? "https://api.openai.com/v1"),
      model: process.env.OPENAI_MODEL ?? process.env.AGENT_FALLBACK_MODEL ?? "gpt-4.1-mini"
    });
  }

  return candidates;
}

async function requestCandidate(candidate: ModelCandidate, messages: ModelMessage[]) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const endpoint = `${candidate.baseUrl}/chat/completions`;
    const requestBody = {
      model: candidate.model,
      messages,
      temperature: 0.58,
      max_tokens: 440
    };
    const send = (structured: boolean) =>
      fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${candidate.apiKey}`
        },
        body: JSON.stringify(
          structured ? { ...requestBody, response_format: { type: "json_object" } } : requestBody
        ),
        cache: "no-store",
        signal: controller.signal
      });

    let response = await send(true);

    if (!response.ok && response.status === 400) {
      await response.text().catch(() => "");
      response = await send(false);
    }

    if (!response.ok) {
      await response.text().catch(() => "");
      return null;
    }

    const data = await response.json();
    const text = data?.choices?.[0]?.message?.content;

    if (typeof text !== "string" || !text.trim()) {
      return null;
    }

    return {
      text: text.trim(),
      provider: candidate.provider,
      model: candidate.model
    } satisfies ModelResult;
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

export function hasConfiguredAgentModel() {
  return getModelCandidates().length > 0;
}

export async function generateAgentReply(messages: ModelMessage[]) {
  for (const candidate of getModelCandidates()) {
    const result = await requestCandidate(candidate, messages);
    if (result) {
      return result;
    }
  }

  return null;
}
