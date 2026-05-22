import type { Metadata, Viewport } from "next";

import { AppShell } from "@/components/app-shell";
import { PwaRegister } from "@/components/pwa-register";
import { APP_NAME } from "@/lib/constants";

import "./globals.css";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "红头顽家 AI 学习助手",
  },
  description:
    "不接云端 AI API 的本地全科学习助手，支持电脑 Ollama、移动端浏览器本地模型和低配置备用工具。",
  icons: {
    apple: "/icons/app-icon.svg",
    icon: "/icons/app-icon.svg",
  },
  manifest: "/manifest.json",
  title: {
    default: APP_NAME,
    template: `%s | ${APP_NAME}`,
  },
};

export const viewport: Viewport = {
  themeColor: "#0b63f6",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>
        <PwaRegister />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
