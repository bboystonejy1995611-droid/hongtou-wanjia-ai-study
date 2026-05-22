import {
  BookCheck,
  ClipboardCheck,
  FilePenLine,
  House,
  LaptopMinimalCheck,
  MessageSquareText,
  NotebookPen,
} from "lucide-react";
import Link from "next/link";

import { APP_NAME } from "@/lib/constants";

const navItems = [
  {
    href: "/",
    icon: House,
    label: "首页",
  },
  {
    href: "/device-check",
    icon: LaptopMinimalCheck,
    label: "设备检测",
  },
  {
    href: "/ask",
    icon: MessageSquareText,
    label: "AI 答疑",
  },
  {
    href: "/writing",
    icon: FilePenLine,
    label: "作文批改",
  },
  {
    href: "/mistakes",
    icon: NotebookPen,
    label: "错题本",
  },
  {
    href: "/plan",
    icon: ClipboardCheck,
    label: "学习计划",
  },
  {
    href: "/report",
    icon: BookCheck,
    label: "家长报告",
  },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/88 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <Link className="flex min-w-0 items-center gap-3" href="/">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[linear-gradient(135deg,#0b63f6,#6b4cff)] text-sm font-black text-white shadow-lg shadow-blue-200">
              舞
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-black text-slate-950">
                {APP_NAME}
              </span>
              <span className="block truncate text-xs text-slate-500">
                本地优先 · 无需登录 · 数据留在浏览器
              </span>
            </span>
          </Link>

          <nav
            aria-label="主导航"
            className="flex gap-2 overflow-x-auto pb-1 text-sm lg:pb-0"
          >
            {navItems.map(({ href, icon: Icon, label }) => (
              <Link
                className="inline-flex min-h-10 shrink-0 items-center gap-2 rounded-full border border-slate-200 bg-white px-3 font-bold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                href={href}
                key={href}
              >
                <Icon aria-hidden="true" className="h-4 w-4" />
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main>{children}</main>

      <footer className="border-t border-slate-200 bg-white/82">
        <div className="mx-auto grid w-full max-w-7xl gap-3 px-4 py-6 text-sm text-slate-600 sm:px-6 lg:grid-cols-[1fr_auto] lg:px-8">
          <p>
            红头顽家本地学习助手优先使用设备本地能力，备用模式也能整理计划、错题和家长沟通材料。
          </p>
          <Link className="font-bold text-blue-700" href="/records">
            查看学习记录与周总结
          </Link>
        </div>
      </footer>
    </>
  );
}
