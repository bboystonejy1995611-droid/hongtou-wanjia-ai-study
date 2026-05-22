"use client";

import { BookOpenCheck, Clock3, History } from "lucide-react";
import { useMemo } from "react";

import { useStudyData } from "@/hooks/use-study-data";
import { summarizeParentReport } from "@/lib/report";

const recordKindLabels = {
  ask: "答疑",
  essay: "作文",
  plan: "计划",
  checkin: "打卡",
  mistake: "错题",
  report: "报告",
};

export default function RecordsPage() {
  const { mistakes, records } = useStudyData();
  const summary = useMemo(
    () => summarizeParentReport(records, mistakes),
    [mistakes, records],
  );

  return (
    <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <section className="surface p-5 sm:p-7">
        <span className="chip">
          <History aria-hidden="true" className="h-4 w-4" />
          学习记录与周总结
        </span>
        <h1 className="mt-4 text-3xl font-black text-slate-950">
          记录不求多，能看出节奏就有价值
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
          答疑、作文、计划、错题和打卡都会留下本地记录。周总结根据最近七天内容归纳。
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <article className="surface p-5 sm:p-6">
          <div className="flex items-center gap-2">
            <Clock3 aria-hidden="true" className="h-5 w-5 text-blue-700" />
            <h2 className="text-2xl font-black text-slate-950">本地记录</h2>
          </div>
          <div className="mt-5 grid gap-4">
            {records.length === 0 ? (
              <div className="surface-quiet p-5 text-sm leading-7 text-slate-600">
                还没有记录。去答疑、做计划或完成一次打卡即可开始。
              </div>
            ) : (
              records.slice(0, 14).map((record) => (
                <article className="record-line" key={record.id}>
                  <p className="text-sm font-bold text-blue-700">
                    {recordKindLabels[record.kind]} · {record.grade} · {record.subject}
                  </p>
                  <h3 className="mt-1 font-black text-slate-950">{record.title}</h3>
                  <p className="mt-1 text-sm text-slate-500">
                    {new Date(record.createdAt).toLocaleString("zh-CN")}
                  </p>
                </article>
              ))
            )}
          </div>
        </article>

        <article className="surface p-5 sm:p-6">
          <div className="flex items-center gap-2">
            <BookOpenCheck aria-hidden="true" className="h-5 w-5 text-emerald-700" />
            <h2 className="text-2xl font-black text-slate-950">周总结</h2>
          </div>
          <div className="mt-4 grid gap-3 text-sm leading-7 text-slate-700">
            <div className="surface-quiet p-4">
              <p className="font-black text-slate-950">学习次数</p>
              <p className="mt-1">{summary.weeklyStudyCount} 次</p>
            </div>
            <div className="surface-quiet p-4">
              <p className="font-black text-slate-950">常问科目</p>
              <p className="mt-1">{summary.topSubject}</p>
            </div>
            <div className="surface-quiet p-4">
              <p className="font-black text-slate-950">重点复盘</p>
              <p className="mt-1">{summary.weakPoints.join("、")}</p>
            </div>
            <div className="surface-quiet p-4">
              <p className="font-black text-slate-950">下一步</p>
              <p className="mt-1">{summary.nextWeekAdvice.join(" ")}</p>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
}

