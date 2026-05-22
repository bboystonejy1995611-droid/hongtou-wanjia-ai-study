import { describe, expect, it } from "vitest";

import { summarizeParentReport } from "./report";
import type { MistakeEntry, StudyRecord } from "./types";

describe("parent report summary", () => {
  it("summarizes the current week from local records and mistakes", () => {
    const now = new Date("2026-05-22T12:00:00+08:00");
    const records: StudyRecord[] = [
      {
        id: "ask-1",
        kind: "ask",
        grade: "初中",
        subject: "数学",
        title: "二次函数顶点",
        createdAt: "2026-05-21T12:00:00+08:00",
      },
      {
        id: "ask-2",
        kind: "ask",
        grade: "初中",
        subject: "数学",
        title: "勾股定理",
        createdAt: "2026-05-20T12:00:00+08:00",
      },
      {
        id: "essay-1",
        kind: "essay",
        grade: "小学",
        subject: "作文",
        title: "春游作文",
        createdAt: "2026-05-19T12:00:00+08:00",
      },
      {
        id: "old",
        kind: "checkin",
        grade: "高中",
        subject: "英语",
        title: "旧打卡",
        createdAt: "2026-05-01T12:00:00+08:00",
      },
    ];
    const mistakes: MistakeEntry[] = [
      {
        id: "m-1",
        grade: "初中",
        subject: "数学",
        question: "顶点式怎么写？",
        explanation: "抓住配方法。",
        knowledgePoint: "二次函数顶点式",
        mastered: false,
        retryQuestion: "把 y=x^2+4x+1 化成顶点式。",
        createdAt: "2026-05-21T12:00:00+08:00",
      },
      {
        id: "m-2",
        grade: "初中",
        subject: "英语",
        question: "现在完成时",
        explanation: "区分 have done。",
        knowledgePoint: "现在完成时",
        mastered: true,
        retryQuestion: "翻译：我已经完成作业。",
        createdAt: "2026-05-20T12:00:00+08:00",
      },
    ];

    const summary = summarizeParentReport(records, mistakes, now);

    expect(summary.weeklyStudyCount).toBe(3);
    expect(summary.topSubject).toBe("数学");
    expect(summary.weakPoints).toContain("二次函数顶点式");
    expect(summary.progressHighlights.join("")).toContain("作文");
  });
});

