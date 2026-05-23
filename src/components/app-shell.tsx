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
    label: "训练首页",
  },
  {
    href: "/device-check",
    icon: LaptopMinimalCheck,
    label: "设备雷达",
  },
  {
    href: "/ask",
    icon: MessageSquareText,
    label: "战术答疑",
  },
  {
    href: "/writing",
    icon: FilePenLine,
    label: "作文精修",
  },
  {
    href: "/mistakes",
    icon: NotebookPen,
    label: "复盘档案",
  },
  {
    href: "/plan",
    icon: ClipboardCheck,
    label: "今日任务",
  },
  {
    href: "/report",
    icon: BookCheck,
    label: "成长战报",
  },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="sticky top-0 z-30 border-b border-cyan-300/20 bg-[#040917]/90 shadow-[0_18px_44px_rgba(0,0,0,0.32)] backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <Link className="flex min-w-0 items-center gap-3" href="/">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-cyan-300/40 bg-[linear-gradient(135deg,#113bff,#8a35ff)] text-sm font-black text-white shadow-[0_0_24px_rgba(54,211,255,0.4)]">
              红
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-black text-white">
                {APP_NAME}
              </span>
              <span className="block truncate text-xs text-cyan-100/70">
                赛博训练舱 · 本地优先 · 数据留在浏览器
              </span>
            </span>
          </Link>

          <nav
            aria-label="主导航"
            className="flex gap-2 overflow-x-auto pb-1 text-sm lg:pb-0"
          >
            {navItems.map(({ href, icon: Icon, label }) => (
              <Link
                className="inline-flex min-h-10 shrink-0 items-center gap-2 rounded-full border border-cyan-200/18 bg-white/6 px-3 font-bold text-cyan-50 transition hover:border-cyan-300/50 hover:bg-cyan-300/12 hover:text-white"
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

      <footer className="border-t border-cyan-300/16 bg-[#040917]">
        <div className="mx-auto grid w-full max-w-7xl gap-3 px-4 py-6 text-sm text-cyan-100/70 sm:px-6 lg:grid-cols-[1fr_auto] lg:px-8">
          <p>
            红头顽家赛博训练舱优先使用设备本地能力，备用模式也能整理任务、复盘档案和家长沟通材料。
          </p>
          <Link className="font-bold text-cyan-200" href="/records">
            查看学习记录与周总结
          </Link>
        </div>
      </footer>
    </>
  );
}
