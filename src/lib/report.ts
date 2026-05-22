import type {
  MistakeEntry,
  ParentReportSnapshot,
  StudyRecord,
} from "./types";

function withinRecentWeek(createdAt: string, now: Date): boolean {
  const createdTime = new Date(createdAt).getTime();
  const sevenDaysAgo = now.getTime() - 7 * 24 * 60 * 60 * 1000;

  return Number.isFinite(createdTime) && createdTime >= sevenDaysAgo;
}

function mostFrequentSubject(records: StudyRecord[]): string {
  const subjectCounts = new Map<string, number>();

  for (const record of records) {
    subjectCounts.set(record.subject, (subjectCounts.get(record.subject) ?? 0) + 1);
  }

  const winner = [...subjectCounts.entries()].sort((left, right) => {
    return right[1] - left[1] || left[0].localeCompare(right[0], "zh-CN");
  })[0];

  return winner?.[0] ?? "暂无";
}

export function summarizeParentReport(
  records: StudyRecord[],
  mistakes: MistakeEntry[],
  now = new Date(),
): ParentReportSnapshot {
  const recentRecords = records.filter((record) =>
    withinRecentWeek(record.createdAt, now),
  );
  const openMistakes = mistakes.filter((mistake) => !mistake.mastered);
  const weakPoints = [...new Set(openMistakes.map((mistake) => mistake.knowledgePoint))]
    .filter(Boolean)
    .slice(0, 4);
  const kinds = new Set(recentRecords.map((record) => record.kind));

  return {
    id: `report-${now.getTime()}`,
    createdAt: now.toISOString(),
    weeklyStudyCount: recentRecords.length,
    topSubject: mostFrequentSubject(recentRecords),
    weakPoints: weakPoints.length > 0 ? weakPoints : ["继续观察错题与提问方向"],
    progressHighlights: [
      recentRecords.length > 0
        ? `本周留下 ${recentRecords.length} 条本地学习记录。`
        : "本周还没有学习记录，先从一次打卡开始。",
      kinds.has("essay")
        ? "作文表达已经纳入复盘，能同时关注内容和结构。"
        : "可以补一次作文或表达练习，观察孩子的输出状态。",
    ],
    nextWeekAdvice: [
      weakPoints.length > 0
        ? `优先复盘${weakPoints[0]}，每次只盯一个错因。`
        : "继续积累错题，先看高频科目和高频步骤。",
      "安排一次孩子自己讲题的环节，家长只追问关键步骤。",
    ],
  };
}

