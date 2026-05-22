import { describe, expect, it } from "vitest";

import { buildEssayPrompt, buildTutorPrompt } from "./prompts";

describe("local AI prompts", () => {
  it("asks the tutor to return the required study sections", () => {
    const prompt = buildTutorPrompt({
      grade: "初中",
      subject: "数学",
      question: "一元二次方程怎么配方？",
    });

    expect(prompt).toContain("【题目分析】");
    expect(prompt).toContain("【同类练习】");
    expect(prompt).toContain("初中");
    expect(prompt).toContain("数学");
  });

  it("keeps essay correction focused on the requested feedback blocks", () => {
    const prompt = buildEssayPrompt({
      grade: "小学",
      essay: "今天我跳舞很开心。",
    });

    expect(prompt).toContain("【错别字提醒】");
    expect(prompt).toContain("【亮点表扬】");
    expect(prompt).toContain("【优化后的示范版本】");
  });
});

