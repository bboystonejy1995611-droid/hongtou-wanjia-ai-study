import {
  BookText,
  Calculator,
  ClipboardPenLine,
  Languages,
  NotebookTabs,
  ScrollText,
} from "lucide-react";

const tools = [
  {
    icon: NotebookTabs,
    title: "错题整理",
    copy: "记录题目、错因、再练一题和掌握状态，先把复盘链路留住。",
  },
  {
    icon: ClipboardPenLine,
    title: "学习计划生成器",
    copy: "按年级、薄弱科目和每天时长生成可执行任务。",
  },
  {
    icon: BookText,
    title: "作文结构模板",
    copy: "开头点题，中段写细节，结尾回扣感受与变化。",
  },
  {
    icon: Calculator,
    title: "数学步骤模板",
    copy: "已知、目标、公式、代入、验算五步走，减少跳步。",
  },
  {
    icon: Languages,
    title: "英语作文模板",
    copy: "主题句、事实支持、连接词、结尾建议逐段搭框架。",
  },
  {
    icon: ScrollText,
    title: "家长周报模板",
    copy: "本周次数、常问科目、薄弱点、进步表现和下周建议。",
  },
];

export function FallbackToolkit() {
  return (
    <section className="surface p-5 sm:p-6">
      <div className="max-w-2xl">
        <span className="chip">不调用 AI 也能用</span>
        <h2 className="mt-4 text-2xl font-black text-slate-950">
          低配置备用模式工具箱
        </h2>
        <p className="mt-2 text-sm leading-7 text-slate-600">
          设备暂时带不动本地模型时，先把学习流程守住。这里的模板和记录全部在浏览器本地完成。
        </p>
      </div>
      <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {tools.map(({ copy, icon: Icon, title }) => (
          <article className="surface-quiet p-4" key={title}>
            <Icon aria-hidden="true" className="h-5 w-5 text-cyan-700" />
            <h3 className="mt-3 text-base font-black text-slate-950">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

