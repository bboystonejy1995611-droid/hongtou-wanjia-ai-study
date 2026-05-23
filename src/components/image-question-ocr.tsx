"use client";

import {
  Camera,
  CircleAlert,
  FileImage,
  LoaderCircle,
  ScanText,
} from "lucide-react";
import { type ChangeEvent, useEffect, useState } from "react";

import { recognizeQuestionImage } from "@/lib/image-ocr";

interface ImageQuestionOcrProps {
  onTextRecognized: (text: string) => void;
}

type OcrStatus = "idle" | "recognizing" | "done" | "error";

export function ImageQuestionOcr({ onTextRecognized }: ImageQuestionOcrProps) {
  const [status, setStatus] = useState<OcrStatus>("idle");
  const [progressText, setProgressText] = useState(
    "清晰印刷题效果更好，识别后请简单检查文字。",
  );
  const [error, setError] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  async function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const image = event.target.files?.[0];

    if (!image) {
      return;
    }

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setPreviewUrl(URL.createObjectURL(image));
    setFileName(image.name || "拍照题目");
    setError("");
    setStatus("recognizing");
    setProgressText("正在准备识别题目图片...");

    try {
      const text = await recognizeQuestionImage(image, (progress) => {
        setProgressText(progress.text);
      });

      onTextRecognized(text);
      setStatus("done");
      setProgressText("已识别并填入题目框，请检查后再开始答疑。");
    } catch (ocrError) {
      setStatus("error");
      setError(
        ocrError instanceof Error
          ? ocrError.message
          : "图片识别失败，请换一张清晰图片或直接手动输入。",
      );
      setProgressText("清晰印刷题效果更好，识别后请简单检查文字。");
    } finally {
      event.target.value = "";
    }
  }

  const recognizing = status === "recognizing";

  return (
    <div className="mt-4 rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-violet-50 p-4 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm">
            <ScanText aria-hidden="true" className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">
              拍照识题
            </p>
            <h3 className="mt-1 text-lg font-black text-slate-950">
              上传题目图片
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              电脑端选择图片上传；手机和平板可以拍照或从相册选择。识别结果会自动填入题目框。
            </p>
          </div>
        </div>

        <label className="button-secondary cursor-pointer justify-center">
          {recognizing ? (
            <LoaderCircle aria-hidden="true" className="h-4 w-4 animate-spin" />
          ) : (
            <FileImage aria-hidden="true" className="h-4 w-4" />
          )}
          {recognizing ? "正在识别" : "上传题目图片"}
          <input
            accept="image/*"
            capture="environment"
            className="sr-only"
            disabled={recognizing}
            onChange={(event) => void handleImageChange(event)}
            type="file"
          />
        </label>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
        <p className="flex items-start gap-2 text-sm leading-6 text-slate-600">
          <Camera aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-blue-700" />
          <span>{progressText}</span>
        </p>
        {fileName ? (
          <span className="truncate rounded-full border border-blue-100 bg-white px-3 py-1 text-xs font-bold text-slate-500">
            {fileName}
          </span>
        ) : null}
      </div>

      {previewUrl ? (
        <div className="mt-4 overflow-hidden rounded-lg border border-white/80 bg-white">
          <img
            alt="题目图片预览"
            className="max-h-48 w-full object-contain"
            src={previewUrl}
          />
        </div>
      ) : null}

      {error ? (
        <p className="mt-4 flex items-start gap-2 rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm leading-6 text-rose-900">
          <CircleAlert aria-hidden="true" className="mt-1 h-4 w-4 shrink-0" />
          {error}
        </p>
      ) : null}
    </div>
  );
}
