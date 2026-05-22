"use client";

import { CheckCircle2 } from "lucide-react";
import { useState } from "react";

import { useStudyData } from "@/hooks/use-study-data";
import { GRADES, SUBJECTS } from "@/lib/constants";
import type { Grade, Subject } from "@/lib/types";

export function QuickCheckin() {
  const { addRecord } = useStudyData();
  const [grade, setGrade] = useState<Grade>("小学");
  const [subject, setSubject] = useState<Subject>("数学");
  const [done, setDone] = useState(false);

  return (
    <section className="surface p-5 sm:p-6">
      <span className="chip">
        <CheckCircle2 aria-hidden="true" className="h-4 w-4" />
        每日学习打卡
      </span>
      <h2 className="mt-4 text-2xl font-black text-slate-950">
        今天先留下一个学习足迹
      </h2>
      <p className="mt-2 text-sm leading-7 text-slate-600">
        打卡会写入本地学习记录，家长报告会据此整理本周节奏。
      </p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
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
          今天主学科
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

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          className="button-primary"
          onClick={() => {
            addRecord({
              grade,
              kind: "checkin",
              subject,
              title: `完成${subject}学习打卡`,
            });
            setDone(true);
          }}
          type="button"
        >
          <CheckCircle2 aria-hidden="true" className="h-4 w-4" />
          完成今日打卡
        </button>
        {done ? (
          <p className="text-sm font-bold text-emerald-700">
            已写入本地记录，继续保持。
          </p>
        ) : null}
      </div>
    </section>
  );
}

