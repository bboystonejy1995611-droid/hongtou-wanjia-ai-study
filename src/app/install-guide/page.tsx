import {
  BadgeCheck,
  CircleHelp,
  Cpu,
  Download,
  House,
  Laptop,
  PlayCircle,
  Smartphone,
  Sparkles,
  Wrench,
} from "lucide-react";
import Link from "next/link";

const parentNotes = [
  {
    icon: Cpu,
    title: "电脑端 AI 在本机运行",
    copy: "本工具不接云端 AI API，不产生 AI API 调用费用。电脑端答疑会优先使用家里电脑上的本地模型。",
  },
  {
    icon: Download,
    title: "第一次要准备轻量模型",
    copy: "普通家庭电脑先从 qwen3:1.7b 开始。第一次下载会花一些时间，之后就能在本机继续使用。",
  },
  {
    icon: Laptop,
    title: "没有独立显卡也能先试",
    copy: "轻量模型可以先尝试，回答速度会随电脑配置变化。本地 AI 也会使用 CPU、内存和硬盘空间。",
  },
  {
    icon: Smartphone,
    title: "手机平板先走轻量路线",
    copy: "手机和平板默认先使用学习工具箱模式，先做计划、错题和报告模板，不必先装电脑软件。",
  },
];

const startChecks = [
  "脚本会检查电脑有没有 Node.js 运行环境。",
  "如果还没安装，会用中文提醒去官网下载。",
  "安装完成后重新双击 start.bat，就会继续启动。",
];

const toolboxItems = [
  "错题本",
  "学习计划",
  "作文结构模板",
  "数学解题步骤模板",
  "英语作文模板",
  "家长周报模板",
  "每日打卡",
];

export default function InstallGuidePage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <section className="surface overflow-hidden bg-[linear-gradient(135deg,rgba(255,255,255,0.98),rgba(229,242,255,0.92))] p-5 sm:p-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <span className="chip">
              <Sparkles aria-hidden="true" className="h-4 w-4" />
              家长安装引导
            </span>
            <h1 className="mt-5 text-3xl font-black leading-tight text-slate-950 sm:text-5xl">
              第一次使用，按两步准备就好
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
              先让电脑准备好本地 AI，再打开学习助手。整个流程不需要登录账号，也不会接入付费云端 AI
              接口。
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link className="button-primary" href="/device-check">
                <BadgeCheck aria-hidden="true" className="h-4 w-4" />
                准备后检测设备
              </Link>
              <Link className="button-ghost" href="/">
                <House aria-hidden="true" className="h-4 w-4" />
                返回首页
              </Link>
            </div>
          </div>

          <aside className="rounded-lg border border-blue-200/80 bg-slate-950 p-5 text-white shadow-[0_24px_64px_rgba(5,20,48,0.22)] sm:p-6">
            <p className="text-sm font-black text-cyan-200">请先记住</p>
            <h2 className="mt-3 text-2xl font-black leading-snug">免费的是 AI 调用，不是电脑资源</h2>
            <p className="mt-3 text-sm leading-7 text-blue-100">
              本地 AI 不产生 API 调用费用，但会使用本机 CPU、内存和硬盘空间。电脑如果带不动，也能继续用学习工具箱模式。
            </p>
          </aside>
        </div>
      </section>

      <section className="mt-6 grid gap-4 lg:grid-cols-2">
        <article className="surface p-5 sm:p-6">
          <span className="chip">电脑 AI 增强版</span>
          <h2 className="mt-4 text-2xl font-black text-slate-950">适合想体验本地 AI 答疑的 Windows 家庭</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            有电脑、愿意安装 Node.js 和 Ollama、网络能下载 qwen3:1.7b 时，可以走这一版。收到 zip
            后先解压到桌面，第一次准备完成后，以后双击启动脚本即可打开页面。
          </p>
        </article>
        <article className="surface p-5 sm:p-6">
          <span className="chip">手机 / 平板学习工具箱版</span>
          <h2 className="mt-4 text-2xl font-black text-slate-950">不用先装模型，也能先把学习流程用起来</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            手机和平板默认先使用学习工具箱模式。本地 AI 增强版是电脑上的可选功能，不是家长必须完成的步骤。
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {toolboxItems.map((item) => (
              <span className="chip" key={item}>
                {item}
              </span>
            ))}
          </div>
        </article>
      </section>

      <section className="mt-6 grid gap-4 lg:grid-cols-2">
        <article className="surface p-5 sm:p-6">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
              <Download aria-hidden="true" className="h-6 w-6" />
            </span>
            <div>
              <span className="chip">第一步</span>
              <h2 className="mt-3 text-2xl font-black text-slate-950">双击 install.bat 准备电脑端 AI</h2>
            </div>
          </div>
          <div className="mt-5 grid gap-3 text-sm leading-7 text-slate-700">
            <p className="surface-quiet p-4">
              电脑端第一次使用，需要先安装 Ollama，再下载轻量模型 <strong>qwen3:1.7b</strong>。
            </p>
            <p className="surface-quiet p-4">
              `install.bat` 会先检查 Ollama。如果电脑还没装好，它会提醒您去官网下载安装。
            </p>
            <p className="surface-quiet p-4">
              Ollama 已准备好后，脚本会检查模型；如果还没有，会自动开始下载轻量模型。
            </p>
          </div>
        </article>

        <article className="surface p-5 sm:p-6">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-cyan-700">
              <PlayCircle aria-hidden="true" className="h-6 w-6" />
            </span>
            <div>
              <span className="chip">第二步</span>
              <h2 className="mt-3 text-2xl font-black text-slate-950">双击 start.bat 打开学习助手</h2>
            </div>
          </div>
          <div className="mt-5 grid gap-3">
            {startChecks.map((item) => (
              <p className="surface-quiet flex gap-3 p-4 text-sm leading-7 text-slate-700" key={item}>
                <BadgeCheck aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-emerald-600" />
                <span>{item}</span>
              </p>
            ))}
          </div>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            电脑端使用 AI 答疑时，请让 Ollama 保持运行；如果只是整理计划、错题或模板，也可以先从工具箱开始。
          </p>
        </article>
      </section>

      <section className="surface mt-6 p-5 sm:p-6" id="mobile-guide">
        <span className="chip">手机/平板测试说明</span>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <article className="surface-quiet p-4 sm:p-5">
            <h2 className="text-xl font-black text-slate-950">方式一：同一个 WiFi 下测试</h2>
            <ol className="mt-3 grid gap-2 pl-5 text-sm leading-7 text-slate-700">
              <li>电脑先运行 start.bat，启动项目。</li>
              <li>手机和平板连接同一个 WiFi。</li>
              <li>在电脑上查看本机 IPv4 地址。</li>
              <li>手机浏览器访问 http://电脑IP地址:3000。</li>
            </ol>
            <p className="mt-3 rounded-lg bg-white p-3 text-sm font-black text-blue-700">
              例如：http://192.168.1.8:3000
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              如果手机打不开，可能是 Windows 防火墙拦截，需要允许 Node.js 或浏览器开发服务通过防火墙。
              手机和平板访问的是电脑正在运行的学习助手，电脑关机或关闭 start.bat 后就访问不了。
            </p>
          </article>
          <article className="surface-quiet p-4 sm:p-5">
            <h2 className="text-xl font-black text-slate-950">方式二：正式分享给家长</h2>
            <p className="mt-3 text-sm leading-7 text-slate-700">
              外地家长或不同 WiFi 的家庭，要使用手机版，需要把学习工具箱版部署成网页链接。
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              手机版网页链接默认不启用电脑本地 AI，只提供学习工具箱、错题本、学习计划、作文模板和家长报告模板。
            </p>
          </article>
        </div>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {parentNotes.map(({ copy, icon: Icon, title }) => (
          <article className="surface p-5" key={title}>
            <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-violet-100 text-violet-700">
              <Icon aria-hidden="true" className="h-5 w-5" />
            </span>
            <h2 className="mt-4 text-lg font-black text-slate-950">{title}</h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">{copy}</p>
          </article>
        ))}
      </section>

      <section className="surface mt-6 grid gap-5 p-5 sm:p-6 lg:grid-cols-[auto_1fr_auto] lg:items-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
          <Wrench aria-hidden="true" className="h-6 w-6" />
        </span>
        <div>
          <span className="chip">
            <CircleHelp aria-hidden="true" className="h-4 w-4" />
            电脑跑不动怎么办
          </span>
          <h2 className="mt-3 text-2xl font-black text-slate-950">先把学习流程用起来，再决定是否升级设备</h2>
          <p className="mt-2 text-sm leading-7 text-slate-600">
            学习工具箱模式不调用 AI，也能做错题整理、每日计划、作文结构模板和家长周报模板。
          </p>
        </div>
        <Link className="button-secondary" href="/plan">
          先做学习计划
        </Link>
      </section>
    </div>
  );
}
