"use client";

import {
  CircleAlert,
  FilePenLine,
  LoaderCircle,
  RefreshCw,
  WandSparkles,
} from "lucide-react";
import { useState } from "react";

import { StructuredAnswer } from "@/components/structured-answer";
import { useDeviceProfile } from "@/hooks/use-device-profile";
import { useMobileWebLlm } from "@/hooks/use-mobile-webllm";
import { useStudyData } from "@/hooks/use-study-data";
import {
  DEFAULT_OLLAMA_MODEL,
  GRADES,
  MODE_LABELS,
  OLLAMA_MODELS,
} from "@/lib/constants";
import { chatWithOllama } from "@/lib/ollama";
import { buildEssayPrompt } from "@/lib/prompts";
import type { Grade } from "@/lib/types";

const fallbackEssayGuide = [
  "【错别字提醒】逐句朗读，圈出拿不准的字，再查字典核对。",
  "【语句优化】每段挑一句最长的句子，拆成两句，让动作和感受更清楚。",
  "【结构建议】先写开头点题，中段写两到三个细节，结尾写变化或收获。",
  "【亮点表扬】先标出最有画面感的词句，保留孩子自己的表达。",
  "【提升建议】补一个动作、一个声音、一个内心想法，让细节更完整。",
  "【优化后的示范版本】备用模式提供框架，不直接代写整篇作文。可按“场景-动作-感受-收束”重写一段。",
].join("\n\n");

export default function WritingPage() {
  const { addRecord } = useStudyData();
  const { checking, profile, refresh } = useDeviceProfile();
  const mobile = useMobileWebLlm();
  const [grade, setGrade] = useState<Grade>("小学");
  const [model, setModel] =
    useState<(typeof OLLAMA_MODELS)[number]>(DEFAULT_OLLAMA_MODEL);
  const [essay, setEssay] = useState("");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [working, setWorking] = useState(false);
  const [forceFallback, setForceFallback] = useState(false);
  const effectiveMode = forceFallback ? "fallback" : profile.mode;

  async function handleReview() {
    if (!essay.trim()) {
      setError("请先粘贴作文内容。");
      return;
    }

    setWorking(true);
    setError("");
    setAnswer("");

    try {
      const prompt = buildEssayPrompt({
        essay,
        grade,
      });
      const nextAnswer =
        effectiveMode === "desktop-ai"
          ? await chatWithOllama({
              model,
              prompt,
            })
          : effectiveMode === "mobile-ai"
            ? await mobile.ask(prompt)
            : fallbackEssayGuide;

      setAnswer(nextAnswer);
      addRecord({
        detail: effectiveMode,
        grade,
        kind: "essay",
        subject: "作文",
        title: essay.trim().slice(0, 38) || "作文批改",
      });
    } catch (reviewError) {
      setError(
        reviewError instanceof Error
          ? reviewError.message
          : "作文批改失败，请先使用结构模板继续修改。",
      );
    } finally {
      setWorking(false);
    }
  }

  return (
    <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <section className="surface p-5 sm:p-7">
        <span className="chip">
          <FilePenLine aria-hidden="true" className="h-4 w-4" />
          作文批改
        </span>
        <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <h1 className="text-3xl font-black text-slate-950">
              先看表达，再把句子和结构磨亮
            </h1>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              本地模型会给出错别字提醒、语句优化、结构建议、亮点表扬、提升建议和示范版本。
            </p>
          </div>
          <div className="surface-quiet flex flex-wrap items-center gap-3 p-4">
            <p className="text-sm font-bold text-slate-600">
              {checking ? "检测中" : MODE_LABELS[effectiveMode]}
            </p>
            <button
              aria-label="重新检测本地模式"
              className="button-ghost"
              onClick={() => void refresh()}
              type="button"
            >
              <RefreshCw aria-hidden="true" className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
        <article className="surface p-5 sm:p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-bold text-slate-700">
              年级
              <select
                className="field"
                onChange={(event) => setGrade(event.target.value as Grade)}
                value={grade}
              >
                {GRADES.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
            {effectiveMode === "desktop-ai" ? (
              <label className="grid gap-2 text-sm font-bold text-slate-700">
                Ollama 模型
                <select
                  className="field"
                  onChange={(event) =>
                    setModel(event.target.value as (typeof OLLAMA_MODELS)[number])
                  }
                  value={model}
                >
                  {OLLAMA_MODELS.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </label>
            ) : (
              <div className="surface-quiet p-3 text-sm leading-6 text-slate-600">
                移动端轻量批改更适合短作文和基础修改。
              </div>
            )}
          </div>

          <label className="mt-4 grid gap-2 text-sm font-bold text-slate-700">
            粘贴作文
            <textarea
              className="field min-h-80"
              onChange={(event) => setEssay(event.target.value)}
              placeholder="把孩子作文粘贴到这里。备用模式也会给出作文结构模板。"
              value={essay}
            />
          </label>

          {effectiveMode === "mobile-ai" ? (
            <div className="mt-4 rounded-lg border border-violet-200 bg-violet-50 p-4 text-sm leading-7 text-violet-950">
              <p className="font-black">首次使用需下载轻量模型</p>
              <p className="mt-1">{mobile.progressText}</p>
              <button
                className="button-secondary mt-3"
                disabled={mobile.status === "loading"}
                onClick={() => void mobile.load()}
                type="button"
              >
                <WandSparkles aria-hidden="true" className="h-4 w-4" />
                {mobile.status === "ready" ? "模型已就绪" : "加载浏览器模型"}
              </button>
            </div>
          ) : null}

          {error ? (
            <p className="mt-4 flex items-start gap-2 rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm leading-6 text-rose-900">
              <CircleAlert aria-hidden="true" className="mt-1 h-4 w-4" />
              {error}
            </p>
          ) : null}

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              className="button-primary"
              disabled={working}
              onClick={() => void handleReview()}
              type="button"
            >
              {working ? (
                <LoaderCircle aria-hidden="true" className="h-4 w-4 animate-spin" />
              ) : (
                <FilePenLine aria-hidden="true" className="h-4 w-4" />
              )}
              {effectiveMode === "fallback" ? "生成批改模板" : "开始本地批改"}
            </button>
            <button
              className="button-ghost"
              onClick={() => setForceFallback((current) => !current)}
              type="button"
            >
              {forceFallback ? "回到自动模式" : "切到结构模板"}
            </button>
          </div>
        </article>

        <article className="surface p-5 sm:p-6">
          <h2 className="text-2xl font-black text-slate-950">批改结果</h2>
          <p className="mt-2 text-sm leading-7 text-slate-600">
            先读表扬和结构，再看修改建议，孩子会更愿意继续写。
          </p>
          <div className="mt-5">
            {answer ? (
              <StructuredAnswer answer={answer} />
            ) : (
              <div className="surface-quiet min-h-96 p-5 text-sm leading-7 text-slate-600">
                这里会显示作文批改结果。备用模式不会调用 AI，而是给出可直接套用的批改框架。
              </div>
            )}
          </div>
        </article>
      </section>
    </div>
  );
}
