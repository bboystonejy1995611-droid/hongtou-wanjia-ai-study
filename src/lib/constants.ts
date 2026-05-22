import type { Grade, StudyMode, Subject } from "./types";

export const APP_NAME = "红头顽家 AI 学习助手｜免费本地版";
export const ORGANIZATION_NAME = "红头顽家";

export const GRADES: Grade[] = ["小学", "初中", "高中", "大学"];

export const SUBJECTS: Subject[] = [
  "语文",
  "数学",
  "英语",
  "物理",
  "化学",
  "生物",
  "历史",
  "地理",
  "政治",
  "高数",
  "计算机",
  "作文",
  "论文写作",
];

export const OLLAMA_MODEL_TIERS = [
  {
    label: "轻量模式",
    model: "qwen3:1.7b",
    note: "普通家庭电脑优先使用",
  },
  {
    label: "推荐模式",
    model: "qwen3:4b",
    note: "适合约 16GB 内存的电脑",
  },
  {
    label: "增强模式",
    model: "qwen3:8b",
    note: "适合高配置电脑",
  },
] as const;

export const DEFAULT_OLLAMA_MODEL = OLLAMA_MODEL_TIERS[0].model;

export const OLLAMA_MODELS = [
  DEFAULT_OLLAMA_MODEL,
  "qwen3:4b",
  "qwen3:8b",
  "gemma3:4b",
] as const;

export const MODE_LABELS: Record<StudyMode, string> = {
  "desktop-ai": "电脑增强模式",
  "mobile-ai": "移动 AI 轻量模式",
  fallback: "低配置备用模式",
};

export const STORAGE_KEYS = {
  mistakes: "dance-growth-local-mistakes",
  records: "dance-growth-local-study-records",
  reports: "dance-growth-local-parent-reports",
};
