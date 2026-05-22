export type DeviceType = "desktop" | "mobile" | "tablet";

export type StudyMode = "desktop-ai" | "mobile-ai" | "fallback";

export type Grade = "小学" | "初中" | "高中" | "大学";

export type Subject =
  | "语文"
  | "数学"
  | "英语"
  | "物理"
  | "化学"
  | "生物"
  | "历史"
  | "地理"
  | "政治"
  | "高数"
  | "计算机"
  | "作文"
  | "论文写作";

export type StudyRecordKind =
  | "ask"
  | "essay"
  | "plan"
  | "checkin"
  | "mistake"
  | "report";

export interface MistakeEntry {
  id: string;
  grade: Grade;
  subject: Subject;
  question: string;
  explanation: string;
  knowledgePoint: string;
  mastered: boolean;
  retryQuestion: string;
  createdAt: string;
}

export interface StudyRecord {
  id: string;
  kind: StudyRecordKind;
  grade: Grade;
  subject: Subject;
  title: string;
  detail?: string;
  createdAt: string;
}

export interface ParentReportSnapshot {
  id: string;
  createdAt: string;
  weeklyStudyCount: number;
  topSubject: string;
  weakPoints: string[];
  progressHighlights: string[];
  nextWeekAdvice: string[];
}

export interface LocalPlanInput {
  grade: Grade;
  weakSubjects: Subject[];
  minutesPerDay: number;
}

export interface LocalStudyPlan {
  goal: string;
  tasks: string[];
  review: string;
  practiceCount: number;
  encouragement: string;
}

