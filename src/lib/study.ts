import type { TutorPromptInput } from "./prompts";
import type { LocalPlanInput, LocalStudyPlan } from "./types";

export function buildFallbackStudyAnswer({
  grade,
  subject,
  question,
}: TutorPromptInput): string {
  const cleanedQuestion = question.trim() || "这道题";

  return [
    `【题目分析】先确认${grade}${subject}题目在问什么：${cleanedQuestion}`,
    `【知识点讲解】圈出题干里的关键词，回忆${subject}课本中对应定义、公式或写作要求。`,
    "【解题步骤】1. 写已知条件。2. 写目标。3. 选公式、例证或段落结构。4. 检查单位、逻辑和表达。",
    "【最终答案】备用模式不直接代写答案，请把你的草稿写出来，再逐步核对。",
    "【同类练习】把数字、情境或论据换一个，再做一题巩固同一知识点。",
    "【学习建议】先用 10 分钟复盘错因，再把关键步骤记入错题本。",
  ].join("\n\n");
}

export function generateLocalPlan({
  grade,
  weakSubjects,
  minutesPerDay,
}: LocalPlanInput): LocalStudyPlan {
  const primarySubject = weakSubjects[0] ?? "数学";
  const secondarySubject = weakSubjects[1];
  const safeMinutes = Math.max(20, Math.min(minutesPerDay, 240));
  const practiceCount = Math.max(3, Math.round(safeMinutes / 12));
  const reviewMinutes = Math.max(8, Math.round(safeMinutes * 0.25));

  return {
    goal: `${grade}今天先稳住${primarySubject}薄弱点，完成一轮理解、练习和复盘。`,
    tasks: [
      `用 ${reviewMinutes} 分钟复习${primarySubject}课本例题或课堂笔记。`,
      `围绕${primarySubject}完成 ${practiceCount} 道基础到中等练习。`,
      secondarySubject
        ? `留出 ${Math.max(10, safeMinutes - reviewMinutes - 20)} 分钟照顾${secondarySubject}，做一次轻量回顾。`
        : "把今天最容易错的一步写成一句提醒，放进错题本。",
    ],
    review: `复习${primarySubject}的定义、公式、关键词或段落框架，最后口头讲一遍。`,
    practiceCount,
    encouragement: "今天把一个薄弱点讲明白，就是很扎实的进步。",
  };
}
