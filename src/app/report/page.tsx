"use client";

import { BarChart3, BookCheck, Save, ScrollText } from "lucide-react";
import { useMemo, useState } from "react";

import { useStudyData } from "@/hooks/use-study-data";
import { summarizeParentReport } from "@/lib/report";

export default function ReportPage() {
  const { mistakes, records, reports, saveReport } = useStudyData();
  const [saved, setSaved] = useState(false);
  const summary = useMemo(
    () => summarizeParentReport(records, mistakes),
    [mistakes, records],
  );

  return (
    <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <section className="surface p-5 sm:p-7">
        <span className="chip">
          <BookCheck aria-hidden="true" className="h-4 w-4" />
          家长报告
        </span>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-black text-slate-950">
              用本地学习记录整理本周观察
            </h1>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              报告依据错题本和学习记录生成，不上传数据。数据少时会先给家长一个可填写的周报模板。
            </p>
          </div>
          <button
            className="button-primary"
            disabled={saved}
            onClick={() => {
              saveReport(summary);
              setSaved(true);
            }}
            type="button"
          >
            <Save aria-hidden="true" className="h-4 w-4" />
            {saved ? "报告已存本地" : "保存报告快照"}
          </button>
        </div>
      </section>

      <section className="metric-grid">
        <article className="surface p-5">
          <BarChart3 aria-hidden="true" className="h-5 w-5 text-blue-700" />
          <p className="mt-3 text-sm font-bold text-slate-500">本周学习次数</p>
          <p className="mt-2 text-4xl font-black text-slate-950">
            {summary.weeklyStudyCount}
          </p>
        </article>
        <article className="surface p-5">
          <ScrollText aria-hidden="true" className="h-5 w-5 text-violet-700" />
          <p className="mt-3 text-sm font-bold text-slate-500">常问科目</p>
          <p className="mt-2 text-3xl font-black text-slate-950">
            {summary.topSubject}
          </p>
        </article>
        <article className="surface p-5">
          <BookCheck aria-hidden="true" className="h-5 w-5 text-emerald-700" />
          <p className="mt-3 text-sm font-bold text-slate-500">待复盘知识点</p>
          <p className="mt-2 text-lg font-black text-slate-950">
            {summary.weakPoints[0]}
          </p>
        </article>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <article className="surface p-5 sm:p-6">
          <h2 className="text-2xl font-black text-slate-950">本周家长周报</h2>
          <div className="mt-4 grid gap-3">
            <div className="surface-quiet p-4">
              <p className="text-sm font-black text-blue-700">薄弱知识点</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {summary.weakPoints.map((point) => (
                  <span className="chip" key={point}>
                    {point}
                  </span>
                ))}
              </div>
            </div>
            <div className="surface-quiet p-4">
              <p className="text-sm font-black text-blue-700">进步表现</p>
              <ul className="mt-2 grid gap-2 text-sm leading-7 text-slate-700">
                {summary.progressHighlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="surface-quiet p-4">
              <p className="text-sm font-black text-blue-700">下周建议</p>
              <ul className="mt-2 grid gap-2 text-sm leading-7 text-slate-700">
                {summary.nextWeekAdvice.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </article>

        <article className="surface p-5 sm:p-6">
          <h2 className="text-2xl font-black text-slate-950">已保存报告</h2>
          <div className="mt-4 grid gap-3">
            {reports.length === 0 ? (
              <div className="surface-quiet p-4 text-sm leading-7 text-slate-600">
                还没有报告快照。保存后可以在本机回看每周变化。
              </div>
            ) : (
              reports.slice(0, 5).map((report) => (
                <article className="surface-quiet p-4" key={report.id}>
                  <p className="text-sm font-bold text-slate-500">
                    {new Date(report.createdAt).toLocaleString("zh-CN")}
                  </p>
                  <p className="mt-2 font-black text-slate-950">
                    {report.weeklyStudyCount} 次学习 · 常问 {report.topSubject}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    重点：{report.weakPoints.join("、")}
                  </p>
                </article>
              ))
            )}
          </div>
        </article>
      </section>
    </div>
  );
}

