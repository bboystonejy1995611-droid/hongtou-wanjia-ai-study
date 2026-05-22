import { describe, expect, it } from "vitest";

import { buildFallbackStudyAnswer, generateLocalPlan } from "./study";

describe("fallback study tools", () => {
  it("returns a study answer template with the full tutor structure", () => {
    const answer = buildFallbackStudyAnswer({
      grade: "高中",
      subject: "物理",
      question: "动能定理怎么用？",
    });

    expect(answer).toContain("【题目分析】");
    expect(answer).toContain("【解题步骤】");
    expect(answer).toContain("【学习建议】");
    expect(answer).toContain("动能定理怎么用");
  });

  it("creates a practical local study plan from the chosen weak subject", () => {
    const plan = generateLocalPlan({
      grade: "小学",
      weakSubjects: ["英语", "数学"],
      minutesPerDay: 45,
    });

    expect(plan.goal).toContain("英语");
    expect(plan.tasks.length).toBeGreaterThanOrEqual(3);
    expect(plan.practiceCount).toBeGreaterThan(0);
    expect(plan.encouragement).toContain("今天");
  });
});

