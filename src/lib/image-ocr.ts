const OCR_LANGUAGES = "chi_sim+eng";
const MAX_IMAGE_BYTES = 12 * 1024 * 1024;

const OCR_STATUS_LABELS: Record<string, string> = {
  "initializing api": "正在准备识别引擎...",
  "initializing tesseract": "正在初始化本地识别引擎...",
  "loading language traineddata": "正在加载中英文识别资源...",
  "loading tesseract core": "正在加载本地 OCR 核心...",
  "recognizing text": "正在识别题目文字...",
};

export interface ImageOcrProgress {
  progress: number;
  status: string;
  text: string;
}

interface TesseractProgressMessage {
  progress: number;
  status: string;
}

function formatProgress(message: TesseractProgressMessage): ImageOcrProgress {
  const progress =
    Number.isFinite(message.progress) && message.progress > 0
      ? Math.min(100, Math.round(message.progress * 100))
      : 0;
  const status = message.status || "recognizing";
  const statusText = OCR_STATUS_LABELS[status] ?? "正在识别题目文字...";

  return {
    progress,
    status,
    text: progress > 0 ? `${statusText} ${progress}%` : statusText,
  };
}

export function normalizeOcrText(text: string) {
  return text
    .replace(/\r/g, "")
    .split("\n")
    .map((line) => line.replace(/[ \t]+/g, " ").trim())
    .filter(Boolean)
    .join("\n")
    .trim();
}

export async function recognizeQuestionImage(
  image: File,
  onProgress?: (progress: ImageOcrProgress) => void,
) {
  if (!image.type.startsWith("image/")) {
    throw new Error("请选择题目图片文件。");
  }

  if (image.size > MAX_IMAGE_BYTES) {
    throw new Error("图片太大了，请先裁剪或换一张更清晰的题目图片。");
  }

  onProgress?.({
    progress: 0,
    status: "queued",
    text: "正在准备识别题目图片...",
  });

  const { recognize } = await import("tesseract.js");
  const result = await recognize(image, OCR_LANGUAGES, {
    cacheMethod: "write",
    corePath: "/ocr/tesseract-core-simd-lstm.wasm.js",
    gzip: true,
    langPath: "/ocr/lang-data",
    logger: (message: TesseractProgressMessage) => {
      onProgress?.(formatProgress(message));
    },
    workerPath: "/ocr/worker.min.js",
  });
  const text = normalizeOcrText(result.data.text);

  if (!text) {
    throw new Error("没有识别到清晰文字，请换一张更清楚的图片，或直接手动输入。");
  }

  return text;
}
