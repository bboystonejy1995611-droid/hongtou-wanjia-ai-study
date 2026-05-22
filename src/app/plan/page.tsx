"use client";

import {
  CalendarCheck2,
  CheckCircle2,
  ClipboardCheck,
  TimerReset,
} from "lucide-react";
import { useMemo, useState } from "react";

import { useStudyData } from "@/hooks/use-study-data";
import { GRADES, SUBJECTS } from "@/lib/constants";
import { generateLocalPlan } from "@/lib/study";
import type { Grade, Subject } from "@/lib/types";

export default function PlanPage() {
  const { addRecord } = useStudyData();
  const [grade, setGrade] = useState<Grade>("小学");
  const [minutes, setMinutes] = useState(45);
  const [weakSubjects, setWeakSubjects] = useState<Subject[]>(["数学"]);
  const [generated, setGenerated] = useState(false);
  const [checkedIn, setCheckedIn] = useState(false);
  const plan = useMemo(
    () =>
      generateLocalPlan({
        grade,
        minutesPerDay: minutes,
        weakSubjects,
      }),
    [grade, minutes, weakSubjects],
  );

  function toggleSubject(subject: Subject) {
    setWeakSubjects((current) =>
      current.includes(subject)
        ? current.length === 1
          ? current
          : current.filter((item) => item !== subject)
        : [...current, subject].slice(0, 3),
    );
  }

  return (
    <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <section className="surface p-5 sm:p-7">
        <span className="chip">
          <ClipboardCheck aria-hidden="true" className="h-4 w-4" />
          学习计划生成器
        </span>
        <h1 className="mt-4 text-3xl font-black text-slate-950">
          今天学什么，先排成能完成的任务
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
          本页用本地规则生成计划，不依赖 AI。低配置设备也可以直接生成今日目标、任务、复习内容和鼓励语。
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
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
              每天学习时间
              <span className="surface-quiet flex min-h-12 items-center gap-3 px-3">
                <TimerReset aria-hidden="true" className="h-4 w-4 text-blue-700" />
                <input
                  className="w-full accent-blue-600"
                  max={180}
                  min={20}
                  onChange={(event) => setMinutes(Number(event.target.value))}
                  step={5}
                  type="range"
                  value={minutes}
                />
                <strong className="min-w-14 text-right">{minutes} 分</strong>
              </span>
            </label>
          </div>

          <div className="mt-4">
            <p className="text-sm font-bold text-slate-700">薄弱科目</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {SUBJECTS.map((subject) => {
                const selected = weakSubjects.includes(subject);

                return (
                  <button
                    className={selected ? "button-secondary" : "button-ghost"}
                    key={subject}
                    onClick={() => toggleSubject(subject)}
                    type="button"
                  >
                    {subject}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            className="button-primary mt-5"
            onClick={() => {
              addRecord({
                detail: `${minutes} 分钟`,
                grade,
                kind: "plan",
                subject: weakSubjects[0],
                title: `生成${weakSubjects.join("、")}学习计划`,
              });
              setGenerated(true);
            }}
            type="button"
          >
            <CalendarCheck2 aria-hidden="true" className="h-4 w-4" />
            生成今日学习计划
          </button>
        </article>

        <article className="surface p-5 sm:p-6">
          <h2 className="text-2xl font-black text-slate-950">今日计划</h2>
          <div className="mt-4 grid gap-3">
            <div className="surface-quiet p-4">
              <p className="text-sm font-bold text-blue-700">今日学习目标</p>
              <p className="mt-2 text-base leading-7 text-slate-800">{plan.goal}</p>
            </div>
            <div className="surface-quiet p-4">
              <p className="text-sm font-bold text-blue-700">今日任务</p>
              <ol className="mt-2 grid gap-2 pl-5 text-sm leading-7 text-slate-700">
                {plan.tasks.map((task) => (
                  <li className="list-decimal" key={task}>
                    {task}
                  </li>
                ))}
              </ol>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="surface-quiet p-4">
                <p className="text-sm font-bold text-blue-700">复习内容</p>
                <p className="mt-2 text-sm leading-7 text-slate-700">{plan.review}</p>
              </div>
              <div className="surface-quiet p-4">
                <p className="text-sm font-bold text-blue-700">练习数量</p>
                <p className="mt-2 text-3xl font-black text-slate-950">
                  {plan.practiceCount}
                </p>
                <p className="text-sm text-slate-600">道左右</p>
              </div>
            </div>
            <div className="surface-quiet p-4">
              <p className="text-sm font-bold text-emerald-700">鼓励语</p>
              <p className="mt-2 text-base font-bold text-slate-800">
                {plan.encouragement}
              </p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              className="button-secondary"
              disabled={!generated || checkedIn}
              onClick={() => {
                addRecord({
                  detail: plan.goal,
                  grade,
                  kind: "checkin",
                  subject: weakSubjects[0],
                  title: "完成计划后打卡",
                });
                setCheckedIn(true);
              }}
              type="button"
            >
              <CheckCircle2 aria-hidden="true" className="h-4 w-4" />
              {checkedIn ? "今日已打卡" : "完成后打卡"}
            </button>
            <p className="text-sm leading-6 text-slate-600">
              打卡会进入学习记录和家长报告。
            </p>
          </div>
        </article>
      </section>
    </div>
  );
}

