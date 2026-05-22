import type {
  InitProgressReport,
  MLCEngine,
} from "@mlc-ai/web-llm";

export const MOBILE_WEBLLM_MODEL = "Qwen3-0.6B-q4f16_1-MLC";

export type MobileModelProgress = InitProgressReport;

export async function loadMobileWebLlmEngine(
  onProgress: (report: MobileModelProgress) => void,
): Promise<MLCEngine> {
  const { CreateMLCEngine } = await import("@mlc-ai/web-llm");

  return CreateMLCEngine(MOBILE_WEBLLM_MODEL, {
    initProgressCallback: onProgress,
  });
}

export async function chatWithMobileWebLlm(
  engine: MLCEngine,
  prompt: string,
): Promise<string> {
  const result = await engine.chat.completions.create({
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.35,
  });
  const content = result.choices[0]?.message.content;
  const answer = typeof content === "string" ? content.trim() : "";

  if (!answer) {
    throw new Error("浏览器本地模型还没有给出回答，请稍后再试。");
  }

  return answer;
}

