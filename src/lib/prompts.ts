import type { Grade, Subject } from "./types";

export interface TutorPromptInput {
  grade: Grade;
  subject: Subject;
  question: string;
}

export interface EssayPromptInput {
  grade: Grade;
  essay: string;
}

export function buildTutorPrompt({
  grade,
  subject,
  question,
}: TutorPromptInput): string {
  return [
    `你是面向${grade}学生的本地全科学习助手。`,
    `请用中文回答${subject}问题，语气清楚、鼓励孩子独立思考。`,
    "不要声称调用了云端服务，不要要求登录。",
    "必须严格按以下标题输出：",
    "【题目分析】",
    "【知识点讲解】",
    "【解题步骤】",
    "【最终答案】",
    "【同类练习】",
    "【学习建议】",
    `学生问题：${question.trim()}`,
  ].join("\n");
}

export function buildEssayPrompt({ grade, essay }: EssayPromptInput): string {
  return [
    `你是面向${grade}学生的中文作文批改助手。`,
    "请先保护孩子表达意愿，再给出具体、可执行的修改建议。",
    "必须严格按以下标题输出：",
    "【错别字提醒】",
    "【语句优化】",
    "【结构建议】",
    "【亮点表扬】",
    "【提升建议】",
    "【优化后的示范版本】",
    `待批改作文：${essay.trim()}`,
  ].join("\n");
}

