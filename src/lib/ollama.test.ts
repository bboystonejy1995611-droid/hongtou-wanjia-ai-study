import { describe, expect, it, vi } from "vitest";

import { chatWithOllama, checkOllamaReachable } from "./ollama";

describe("Ollama browser adapter", () => {
  it("posts a non-streaming chat request to the local Ollama server", async () => {
    const fetcher = vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify({
          message: {
            content: "本地回答",
          },
        }),
        { status: 200 },
      ),
    );

    const answer = await chatWithOllama({
      model: "qwen3:4b",
      prompt: "解释勾股定理",
      fetcher,
    });

    expect(answer).toBe("本地回答");
    expect(fetcher).toHaveBeenCalledWith(
      "http://localhost:11434/api/chat",
      expect.objectContaining({
        method: "POST",
      }),
    );
  });

  it("treats failed reachability probes as disconnected", async () => {
    const fetcher = vi.fn().mockRejectedValue(new Error("offline"));

    await expect(checkOllamaReachable({ fetcher })).resolves.toBe(false);
  });
});
