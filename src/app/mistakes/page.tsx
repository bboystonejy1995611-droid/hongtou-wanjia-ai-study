"use client";

import {
  BookPlus,
  CheckCircle2,
  NotebookPen,
  RotateCcw,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { useStudyData } from "@/hooks/use-study-data";
import { GRADES, SUBJECTS } from "@/lib/constants";
import type { Grade, Subject } from "@/lib/types";

export default function MistakesPage() {
  const { addMistake, deleteMistake, hydrated, mistakes, toggleMistake } =
    useStudyData();
  const [grade, setGrade] = useState<Grade>("小学");
  const [subject, setSubject] = useState<Subject>("数学");
  const [question, setQuestion] = useState("");
  const [knowledgePoint, setKnowledgePoint] = useState("");
  const [explanation, setExplanation] = useState("");
  const [retryQuestion, setRetryQuestion] = useState("");

  function handleSave() {
    if (!question.trim()) {
      return;
    }

    addMistake({
      explanation: explanation.trim() || "先记录错因，稍后补充讲解摘要。",
      grade,
      knowledgePoint: knowledgePoint.trim() || `${subject}待复盘知识点`,
      question: question.trim(),
      retryQuestion:
        retryQuestion.trim() || `围绕“${question.trim().slice(0, 24)}”再练一题。`,
      subject,
    });
    setQuestion("");
    setKnowledgePoint("");
    setExplanation("");
    setRetryQuestion("");
  }

  return (
    <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <section className="surface p-5 sm:p-7">
        <span className="chip">
          <NotebookPen aria-hidden="true" className="h-4 w-4" />
          错题本
        </span>
        <h1 className="mt-4 text-3xl font-black text-slate-950">
          把错题变成下一次能讲清的题
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
          错题本优先保存在本机浏览器。答疑页可以一键收录，也可以在这里手动补充知识点、讲解摘要和再练一题。
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
        <article className="surface p-5 sm:p-6">
          <h2 className="text-2xl font-black text-slate-950">手动新增错题</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
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

          <label className="mt-4 grid gap-2 text-sm font-bold text-slate-700">
            题目
            <textarea
              className="field min-h-32"
              onChange={(event) => setQuestion(event.target.value)}
              value={question}
            />
          </label>
          <label className="mt-4 grid gap-2 text-sm font-bold text-slate-700">
            知识点
            <input
              className="field"
              onChange={(event) => setKnowledgePoint(event.target.value)}
              placeholder="例如：二次函数顶点式"
              value={knowledgePoint}
            />
          </label>
          <label className="mt-4 grid gap-2 text-sm font-bold text-slate-700">
            AI 讲解摘要或错因
            <textarea
              className="field min-h-28"
              onChange={(event) => setExplanation(event.target.value)}
              value={explanation}
            />
          </label>
          <label className="mt-4 grid gap-2 text-sm font-bold text-slate-700">
            再练一题
            <textarea
              className="field min-h-24"
              onChange={(event) => setRetryQuestion(event.target.value)}
              value={retryQuestion}
            />
          </label>
          <button className="button-primary mt-5" onClick={handleSave} type="button">
            <BookPlus aria-hidden="true" className="h-4 w-4" />
            保存到本地错题本
          </button>
        </article>

        <article className="surface p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl font-black text-slate-950">已保存错题</h2>
            <p className="text-sm font-bold text-slate-500">
              {hydrated ? `${mistakes.length} 条` : "读取中"}
            </p>
          </div>

          <div className="mt-4 grid gap-3">
            {mistakes.length === 0 ? (
              <div className="surface-quiet p-5 text-sm leading-7 text-slate-600">
                还没有错题。可以从答疑页收录，也可以先手动记一题。
              </div>
            ) : (
              mistakes.map((mistake) => (
                <article className="surface-quiet p-4" key={mistake.id}>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-bold text-blue-700">
                        {mistake.grade} · {mistake.subject}
                      </p>
                      <h3 className="mt-2 text-lg font-black text-slate-950">
                        {mistake.question}
                      </h3>
                    </div>
                    <button
                      className={
                        mistake.mastered ? "button-secondary" : "button-ghost"
                      }
                      onClick={() => toggleMistake(mistake.id)}
                      type="button"
                    >
                      <CheckCircle2 aria-hidden="true" className="h-4 w-4" />
                      {mistake.mastered ? "已掌握" : "标记掌握"}
                    </button>
                  </div>
                  <div className="mt-3 grid gap-2 text-sm leading-7 text-slate-600">
                    <p>
                      <strong className="text-slate-900">知识点：</strong>
                      {mistake.knowledgePoint}
                    </p>
                    <p>
                      <strong className="text-slate-900">讲解摘要：</strong>
                      {mistake.explanation}
                    </p>
                    <p>
                      <strong className="text-slate-900">再练一题：</strong>
                      {mistake.retryQuestion}
                    </p>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <Link className="button-secondary" href="/ask">
                      <RotateCcw aria-hidden="true" className="h-4 w-4" />
                      去答疑页再练
                    </Link>
                    <button
                      className="button-ghost"
                      onClick={() => deleteMistake(mistake.id)}
                      type="button"
                    >
                      <Trash2 aria-hidden="true" className="h-4 w-4" />
                      删除
                    </button>
                  </div>
                </article>
              ))
            )}
          </div>
        </article>
      </section>
    </div>
  );
}

