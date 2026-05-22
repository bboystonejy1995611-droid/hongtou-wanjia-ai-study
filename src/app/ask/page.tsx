"use client";

import {
  BookPlus,
  CircleAlert,
  Cpu,
  LoaderCircle,
  MessageSquareText,
  RefreshCw,
} from "lucide-react";
import { useState } from "react";

import { FallbackToolkit } from "@/components/fallback-toolkit";
import { StructuredAnswer } from "@/components/structured-answer";
import { useDeviceProfile } from "@/hooks/use-device-profile";
import { useMobileWebLlm } from "@/hooks/use-mobile-webllm";
import { useStudyData } from "@/hooks/use-study-data";
import {
  DEFAULT_OLLAMA_MODEL,
  GRADES,
  MODE_LABELS,
  OLLAMA_MODELS,
  SUBJECTS,
} from "@/lib/constants";
import { chatWithOllama } from "@/lib/ollama";
import { buildTutorPrompt } from "@/lib/prompts";
import { buildFallbackStudyAnswer } from "@/lib/study";
import type { Grade, Subject } from "@/lib/types";

export default function AskPage() {
  const { addMistake, addRecord } = useStudyData();
  const { checking, profile, refresh } = useDeviceProfile();
  const mobile = useMobileWebLlm();
  const [grade, setGrade] = useState<Grade>("小学");
  const [subject, setSubject] = useState<Subject>("数学");
  const [model, setModel] =
    useState<(typeof OLLAMA_MODELS)[number]>(DEFAULT_OLLAMA_MODEL);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [working, setWorking] = useState(false);
  const [forceFallback, setForceFallback] = useState(false);
  const [saved, setSaved] = useState(false);
  const effectiveMode = forceFallback ? "fallback" : profile.mode;

  async function handleAsk() {
    const trimmedQuestion = question.trim();

    if (!trimmedQuestion) {
      setError("请先输入题目或问题。");
      return;
    }

    setAnswer("");
    setError("");
    setSaved(false);
    setWorking(true);

    try {
      const prompt = buildTutorPrompt({
        grade,
        question: trimmedQuestion,
        subject,
      });
      const nextAnswer =
        effectiveMode === "desktop-ai"
          ? await chatWithOllama({
              model,
              prompt,
            })
          : effectiveMode === "mobile-ai"
            ? await mobile.ask(prompt)
            : buildFallbackStudyAnswer({
                grade,
                question: trimmedQuestion,
                subject,
              });

      setAnswer(nextAnswer);
      addRecord({
        detail: effectiveMode,
        grade,
        kind: "ask",
        subject,
        title: trimmedQuestion.slice(0, 40),
      });
    } catch (askError) {
      setError(
        askError instanceof Error
          ? askError.message
          : "本地回答失败，请切到备用模板继续学习。",
      );
    } finally {
      setWorking(false);
    }
  }

  return (
    <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <section className="surface p-5 sm:p-7">
        <span className="chip">
          <MessageSquareText aria-hidden="true" className="h-4 w-4" />
          AI 全科答疑
        </span>
        <div className="mt-4 grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <h1 className="text-3xl font-black text-slate-950">
              选年级和科目，再把问题讲清楚
            </h1>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              本页会按当前设备模式接入本地引擎。移动端适合基础答疑和轻量学习，不适合超复杂题目。
            </p>
          </div>
          <div className="surface-quiet flex flex-wrap items-center justify-between gap-3 p-4">
            <div>
              <p className="text-sm font-bold text-slate-500">当前路线</p>
              <p className="mt-1 text-xl font-black text-slate-950">
                {checking ? "正在检测" : MODE_LABELS[effectiveMode]}
              </p>
            </div>
            <button
              aria-label="重新检测本地引擎"
              className="button-ghost"
              onClick={() => void refresh()}
              type="button"
            >
              <RefreshCw aria-hidden="true" className="h-4 w-4" />
              重新检测
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
            <label className="grid gap-2 text-sm font-bold text-slate-700">
              科目
              <select
                className="field"
                onChange={(event) => setSubject(event.target.value as Subject)}
                value={subject}
              >
                {SUBJECTS.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
          </div>

          {effectiveMode === "desktop-ai" ? (
            <label className="mt-4 grid gap-2 text-sm font-bold text-slate-700">
              电脑本地模型
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
          ) : null}

          <label className="mt-4 grid gap-2 text-sm font-bold text-slate-700">
            输入题目或问题
            <textarea
              className="field min-h-48"
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="例如：请用初中生能懂的方式讲解一元二次方程配方法。"
              value={question}
            />
          </label>

          {effectiveMode === "mobile-ai" ? (
            <div className="mt-4 rounded-lg border border-violet-200 bg-violet-50 p-4 text-sm leading-7 text-violet-950">
              <p className="font-black">移动端轻量模型</p>
              <p className="mt-1">{mobile.progressText}</p>
              <button
                className="button-secondary mt-3"
                disabled={mobile.status === "loading"}
                onClick={() => void mobile.load()}
                type="button"
              >
                <Cpu aria-hidden="true" className="h-4 w-4" />
                {mobile.status === "ready" ? "模型已就绪" : "下载并加载轻量模型"}
              </button>
            </div>
          ) : null}

          {profile.deviceType === "desktop" && !profile.ollamaReachable ? (
            <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-7 text-amber-950">
              <p className="font-black">Ollama 未安装或未启动</p>
              <p className="mt-1">
                安装 Ollama 并运行 <code>ollama pull qwen3:1.7b</code> 后重新检测。
              </p>
            </div>
          ) : null}

          {error ? (
            <p className="mt-4 flex items-start gap-2 rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm leading-6 text-rose-900">
              <CircleAlert aria-hidden="true" className="mt-1 h-4 w-4 shrink-0" />
              {error}
            </p>
          ) : null}

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              className="button-primary"
              disabled={working}
              onClick={() => void handleAsk()}
              type="button"
            >
              {working ? (
                <LoaderCircle aria-hidden="true" className="h-4 w-4 animate-spin" />
              ) : (
                <MessageSquareText aria-hidden="true" className="h-4 w-4" />
              )}
              {effectiveMode === "fallback" ? "生成学习步骤模板" : "开始本地答疑"}
            </button>
            <button
              className="button-ghost"
              onClick={() => setForceFallback((current) => !current)}
              type="button"
            >
              {forceFallback ? "回到自动模式" : "切到备用模板"}
            </button>
          </div>
        </article>

        <article className="surface p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-sm font-bold text-slate-500">回答结构</p>
              <h2 className="mt-1 text-2xl font-black text-slate-950">
                分析、讲解、步骤、答案、练习、建议
              </h2>
            </div>
            {answer ? (
              <button
                className="button-secondary"
                disabled={saved}
                onClick={() => {
                  addMistake({
                    explanation: answer.slice(0, 260),
                    grade,
                    knowledgePoint: `${subject}问题复盘`,
                    question: question.trim(),
                    retryQuestion: `围绕“${question.trim().slice(0, 28)}”再练一题。`,
                    subject,
                  });
                  setSaved(true);
                }}
                type="button"
              >
                <BookPlus aria-hidden="true" className="h-4 w-4" />
                {saved ? "已收进错题本" : "收进错题本"}
              </button>
            ) : null}
          </div>

          <div className="mt-5">
            {answer ? (
              <StructuredAnswer answer={answer} />
            ) : (
              <div className="surface-quiet min-h-72 p-5 text-sm leading-7 text-slate-600">
                提交问题后，这里会显示结构化回答。备用模式会给出学习模板和引导步骤，不会调用 AI。
              </div>
            )}
          </div>
        </article>
      </section>

      <FallbackToolkit />
    </div>
  );
}
