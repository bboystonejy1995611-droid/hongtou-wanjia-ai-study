type Fetcher = typeof fetch;

export const OLLAMA_BASE_URL = "http://localhost:11434";

export interface OllamaProbeOptions {
  fetcher?: Fetcher;
  timeoutMs?: number;
}

export interface OllamaChatInput {
  model: string;
  prompt: string;
  fetcher?: Fetcher;
  signal?: AbortSignal;
}

interface OllamaChatResponse {
  message?: {
    content?: string;
  };
  error?: string;
}

export async function checkOllamaReachable({
  fetcher = fetch,
  timeoutMs = 1400,
}: OllamaProbeOptions = {}): Promise<boolean> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetcher(`${OLLAMA_BASE_URL}/api/tags`, {
      cache: "no-store",
      signal: controller.signal,
    });

    return response.ok;
  } catch {
    return false;
  } finally {
    clearTimeout(timeout);
  }
}

export async function chatWithOllama({
  model,
  prompt,
  fetcher = fetch,
  signal,
}: OllamaChatInput): Promise<string> {
  const response = await fetcher(`${OLLAMA_BASE_URL}/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      stream: false,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    }),
    signal,
  });

  const payload = (await response.json()) as OllamaChatResponse;

  if (!response.ok) {
    throw new Error(payload.error || "Ollama 本地模型暂时没有返回结果。");
  }

  const answer = payload.message?.content?.trim();

  if (!answer) {
    throw new Error("Ollama 返回了空回答，请换个问题再试。");
  }

  return answer;
}
