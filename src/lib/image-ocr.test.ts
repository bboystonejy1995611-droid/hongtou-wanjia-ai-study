import { describe, expect, it } from "vitest";

import { normalizeOcrText } from "./image-ocr";

describe("image OCR text cleanup", () => {
  it("keeps recognized question text readable after OCR line cleanup", () => {
    expect(normalizeOcrText("  解 方程：\n\n  x + 3 = 8  \n  ")).toBe(
      "解 方程：\nx + 3 = 8",
    );
  });
});
