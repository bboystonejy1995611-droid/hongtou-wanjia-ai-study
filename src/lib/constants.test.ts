import { describe, expect, it } from "vitest";

import {
  DEFAULT_OLLAMA_MODEL,
  OLLAMA_MODEL_TIERS,
  OLLAMA_MODELS,
} from "./constants";

describe("desktop Ollama model strategy", () => {
  it("prioritizes the lightweight qwen3 model for family computers", () => {
    expect(DEFAULT_OLLAMA_MODEL).toBe("qwen3:1.7b");
    expect(OLLAMA_MODELS[0]).toBe("qwen3:1.7b");
    expect(OLLAMA_MODEL_TIERS.map((tier) => tier.label)).toEqual([
      "轻量模式",
      "推荐模式",
      "增强模式",
    ]);
    expect(OLLAMA_MODEL_TIERS[1]).toMatchObject({
      model: "qwen3:4b",
      note: expect.stringContaining("16GB"),
    });
    expect(OLLAMA_MODEL_TIERS[2]).toMatchObject({
      model: "qwen3:8b",
    });
  });
});
