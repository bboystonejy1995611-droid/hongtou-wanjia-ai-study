import {
  ArrowRight,
  BookOpenText,
  BrainCircuit,
  ClipboardCheck,
  Cpu,
  DatabaseZap,
  FilePenLine,
  GraduationCap,
  Laptop,
  MessageSquareText,
  NotebookPen,
  Parentheses,
  ScanSearch,
  ShieldCheck,
  Smartphone,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

import { DevicePulseCard } from "@/components/device-pulse-card";
import { FallbackToolkit } from "@/components/fallback-toolkit";
import { ModeCard } from "@/components/mode-card";
import { QuickCheckin } from "@/components/quick-checkin";
import { APP_NAME, OLLAMA_MODEL_TIERS } from "@/lib/constants";

const featureEntries = [
  {
    href: "/ask",
    icon: MessageSquareText,
    title: "战术答疑",
    copy: "拍照或输入题目，按年级和科目进入本地解析。",
  },
  {
    href: "/ask",
    icon: GraduationCap,
    title: "段位训练",
    copy: "小学到大学自动切换讲解深度和训练节奏。",
  },
  {
    href: "/writing",
    icon: FilePenLine,
    title: "作文精修",
    copy: "像复盘战局一样看结构、亮点和提升动作。",
  },
  {
    href: "/mistakes",
    icon: NotebookPen,
    title: "复盘档案",
    copy: "把错因、讲解摘要和再练任务存进本地档案。",
  },
  {
    href: "/plan",
    icon: ClipboardCheck,
    title: "今日任务",
    copy: "薄弱科目和训练时长一选就能开局执行。",
  },
  {
    href: "/report",
    icon: BookOpenText,
    title: "成长战报",
    copy: "本周训练次数、常问科目和下周建议自动整理。",
  },
];

export default function HomePage() {
  return (
    <div className="home-page-shell" data-theme="cyber-arena">
      <section className="hero-band home-hero" data-home-hero="flagship">
        <img
          alt="孩子与家长在电脑和平板旁整理本地学习内容"
          className="hero-image"
          src="/images/hero-local-learning.svg"
        />
        <div className="home-signal-grid" aria-hidden="true" />
        <div className="relative z-10 mx-auto flex min-h-[min(86vh,900px)] w-full max-w-7xl items-center px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="home-hero-layout w-full">
            <div className="max-w-3xl text-white">
              <span className="home-hero-chip">
                <BrainCircuit aria-hidden="true" className="h-4 w-4" />
                赛博训练舱
              </span>
              <h1 className="mt-5 text-4xl font-black leading-tight sm:text-6xl">
                {APP_NAME}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-blue-50 sm:text-xl">
                不用云端 API，不产生调用费用。把全科答疑、作文精修、错题复盘和成长战报装进每一台可用设备。
              </p>

              <div className="home-capability-row mt-6">
                {[
                  {
                    icon: Cpu,
                    label: "本地算力",
                  },
                  {
                    icon: ShieldCheck,
                    label: "数据留本机",
                  },
                  {
                    icon: Smartphone,
                    label: "多端开局",
                  },
                ].map(({ icon: Icon, label }) => (
                  <span key={label}>
                    <Icon aria-hidden="true" className="h-4 w-4" />
                    {label}
                  </span>
                ))}
              </div>

              <div className="home-hero-actions mt-8">
                <Link className="button-primary home-cta-primary" href="/ask">
                  <MessageSquareText aria-hidden="true" className="h-5 w-5" />
                  进入训练
                </Link>
                <Link className="home-cta-secondary" href="/install-guide">
                  家长安装引导
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
                <Link className="home-cta-secondary" href="/install-guide#mobile-guide">
                  手机/平板使用说明
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <aside className="home-console-panel" aria-label="本地学习机能力面板">
              <div className="home-console-topline">
                <span>
                  <Sparkles aria-hidden="true" className="h-4 w-4" />
                  LOCAL AI STUDY CORE
                </span>
                <strong>免费本地版</strong>
              </div>

              <div className="home-console-readout">
                <p>训练引擎路线</p>
                <h2>电脑增强 · 移动轻量 · 工具箱保底</h2>
              </div>

              <div className="home-console-layers">
                <div>
                  <Cpu aria-hidden="true" className="h-5 w-5" />
                  <span>
                    <strong>Ollama</strong>
                    <small>普通家庭电脑优先使用 qwen3:1.7b</small>
                  </span>
                </div>
                <div>
                  <DatabaseZap aria-hidden="true" className="h-5 w-5" />
                  <span>
                    <strong>localStorage</strong>
                    <small>错题、记录、报告本地保存</small>
                  </span>
                </div>
                <div>
                  <Smartphone aria-hidden="true" className="h-5 w-5" />
                  <span>
                    <strong>WebGPU / WebLLM</strong>
                    <small>移动端下载轻量模型</small>
                  </span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <div className="home-mode-deck mx-auto -mt-14 grid w-full max-w-7xl gap-6 px-4 pb-16 sm:px-6 lg:grid-cols-[1.35fr_0.85fr] lg:px-8">
        <section className="surface home-mode-bank relative z-10 p-5 sm:p-7">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="chip">训练路径</span>
              <h2 className="mt-4 text-2xl font-black text-slate-950 sm:text-3xl">
                每台设备都有合适的训练档位
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-7 text-slate-600">
              先检测，再进入本机最稳的答疑方式。低配置设备也保留任务、模板和复盘动作。
            </p>
          </div>
          <div className="mt-6 grid gap-4 xl:grid-cols-3">
            <ModeCard
              copy="Windows 和 macOS 连接本机 Ollama，适合完整答疑与批改。"
              icon={Laptop}
              points={[
                "普通家庭电脑优先使用 qwen3:1.7b",
                "16GB 左右可尝试 qwen3:4b",
                "高配置电脑可选 qwen3:8b",
                "保留错题、计划和周总结",
              ]}
              title="电脑增强模式"
              tone="blue"
            />
            <ModeCard
              copy="手机和平板浏览器支持 WebGPU 时，下载轻量模型后使用。"
              icon={Smartphone}
              points={[
                "基础答疑和知识点讲解",
                "作文简单批改",
                "速度随设备性能变化",
              ]}
              title="手机轻量模式"
              tone="violet"
            />
            <ModeCard
              copy="模型暂时不可用时，仍然可以把学习动作安排清楚。"
              icon={Parentheses}
              points={[
                "不调用 AI",
                "计划、模板、打卡",
                "家长报告材料照样积累",
              ]}
              title="低配置备用模式"
              tone="cyan"
            />
          </div>

          <div className="home-model-guide mt-5">
            <div>
              <p>电脑端模型建议</p>
              <h3>从轻量档开始，更容易第一次跑起来</h3>
            </div>
            <div className="home-model-tier-list">
              {OLLAMA_MODEL_TIERS.map((tier) => (
                <span key={tier.model}>
                  <strong>{tier.label}</strong>
                  <small>{tier.model}</small>
                  <em>{tier.note}</em>
                </span>
              ))}
            </div>
          </div>
        </section>

        <DevicePulseCard />
      </div>

      <section className="mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <div className="home-resource-note">
          <strong>放心使用本地 AI</strong>
          <p>
            不产生 API 调用费用，但会消耗本机 CPU、内存和硬盘空间。没有独立显卡也可以先尝试轻量模型，速度取决于电脑配置；如果设备跑不动，就切到学习工具箱模式。
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="home-section-heading">
          <div className="max-w-2xl">
              <span className="chip">核心训练舱</span>
            <h2 className="mt-4 text-3xl font-black text-slate-950">
              孩子愿意点开的学习主流程，一屏进入
            </h2>
          </div>
          <p>
            从题目识别到复盘，再到家长战报，把“学会了什么”和“下一步做什么”接起来。
          </p>
        </div>
        <div className="home-feature-deck mt-6">
          {featureEntries.map(({ copy, href, icon: Icon, title }, index) => (
            <Link
              className={`home-feature-card group ${index === 0 ? "home-feature-prime" : ""}`}
              href={href}
              key={title}
            >
              <span className="home-feature-icon">
                <Icon aria-hidden="true" className="h-5 w-5" />
              </span>
              <span className="home-feature-copy">
                <h3>{title}</h3>
                <p>{copy}</p>
              </span>
              <ArrowRight aria-hidden="true" className="home-feature-arrow h-5 w-5" />
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-6 px-4 pb-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <QuickCheckin />
        <FallbackToolkit />
      </section>
    </div>
  );
}
