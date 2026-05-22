"use client";

import {
  Cpu,
  Database,
  HardDriveDownload,
  LaptopMinimalCheck,
  RefreshCw,
  Smartphone,
  TriangleAlert,
} from "lucide-react";
import Link from "next/link";

import { FallbackToolkit } from "@/components/fallback-toolkit";
import { useDeviceProfile } from "@/hooks/use-device-profile";
import { MODE_LABELS } from "@/lib/constants";

function status(value: boolean) {
  return value ? "支持" : "暂不支持";
}

export default function DeviceCheckPage() {
  const { checking, profile, refresh } = useDeviceProfile();
  const deviceLabel =
    profile.deviceType === "desktop"
      ? "电脑"
      : profile.deviceType === "tablet"
        ? "平板"
        : "手机";

  return (
    <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <section className="surface p-5 sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-3xl">
            <span className="chip">
              <LaptopMinimalCheck aria-hidden="true" className="h-4 w-4" />
              设备检测
            </span>
            <h1 className="mt-4 text-3xl font-black text-slate-950">
              先看本机能走哪条学习路线
            </h1>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              系统会检测当前设备、Ollama、WebGPU 和本地缓存能力。检测结果只在浏览器里使用，不需要登录。
            </p>
          </div>
          <button
            className="button-secondary"
            onClick={() => void refresh()}
            type="button"
          >
            <RefreshCw aria-hidden="true" className="h-4 w-4" />
            重新检测
          </button>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <article className="surface-quiet p-4">
            <Cpu aria-hidden="true" className="h-5 w-5 text-blue-700" />
            <h2 className="mt-3 text-sm font-black text-slate-950">
              当前设备类型
            </h2>
            <p className="mt-2 text-lg font-black text-slate-900">
              {checking ? "检测中" : deviceLabel}
            </p>
          </article>
          <article className="surface-quiet p-4">
            <LaptopMinimalCheck
              aria-hidden="true"
              className="h-5 w-5 text-emerald-700"
            />
            <h2 className="mt-3 text-sm font-black text-slate-950">
              Ollama 状态
            </h2>
            <p className="mt-2 text-lg font-black text-slate-900">
              {profile.ollamaReachable
                ? "电脑本地 AI 已连接"
                : "Ollama 未安装或未启动"}
            </p>
          </article>
          <article className="surface-quiet p-4">
            <Smartphone aria-hidden="true" className="h-5 w-5 text-violet-700" />
            <h2 className="mt-3 text-sm font-black text-slate-950">
              WebGPU
            </h2>
            <p className="mt-2 text-lg font-black text-slate-900">
              {status(profile.webGpuSupported)}
            </p>
          </article>
          <article className="surface-quiet p-4">
            <Database aria-hidden="true" className="h-5 w-5 text-cyan-700" />
            <h2 className="mt-3 text-sm font-black text-slate-950">
              本地缓存
            </h2>
            <p className="mt-2 text-lg font-black text-slate-900">
              {profile.localStorageSupported && profile.browserCacheSupported
                ? "可保存"
                : "受限"}
            </p>
          </article>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <article className="surface p-5 sm:p-6">
          <span className="chip">
            <HardDriveDownload aria-hidden="true" className="h-4 w-4" />
            当前推荐模式
          </span>
          <h2 className="mt-4 text-3xl font-black text-slate-950">
            {MODE_LABELS[profile.mode]}
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            {profile.mode === "desktop-ai"
              ? "本机 Ollama 已可访问，适合完整答疑、作文批改、错题整理和周总结。"
              : profile.mode === "mobile-ai"
                ? "浏览器支持 WebGPU，可进入移动 AI 轻量模式。首次使用需要下载轻量模型。"
                : "当前设备先进入备用模式，计划、模板、错题和家长报告仍然可用。"}
          </p>

          {profile.constrainedHardware ? (
            <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-7 text-amber-950">
              <p className="flex items-start gap-2 font-bold">
                <TriangleAlert aria-hidden="true" className="mt-1 h-4 w-4" />
                检测到移动设备资源偏紧，已优先推荐备用工具模式。
              </p>
            </div>
          ) : null}

          <div className="mt-5 flex flex-wrap gap-3">
            <Link className="button-primary" href="/ask">
              去答疑页
            </Link>
            <Link className="button-ghost" href="/plan">
              先生成学习计划
            </Link>
          </div>
        </article>

        <article className="surface p-5 sm:p-6">
          <h2 className="text-2xl font-black text-slate-950">不可用时怎么处理</h2>
          <div className="mt-4 grid gap-3">
            <div className="surface-quiet p-4">
              <h3 className="font-black text-slate-950">电脑端 Ollama</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                普通家庭电脑优先从轻量模式开始。安装并启动 Ollama 后，先运行下面的模型下载命令，再重新检测。
              </p>
              <code className="mt-3 block overflow-x-auto rounded-lg bg-slate-950 p-3 text-sm text-cyan-100">
                ollama pull qwen3:1.7b
              </code>
              <div className="mt-3 grid gap-2 text-sm leading-6 text-slate-600 sm:grid-cols-3">
                <p>
                  <strong className="block text-slate-950">轻量模式</strong>
                  qwen3:1.7b
                </p>
                <p>
                  <strong className="block text-slate-950">推荐模式</strong>
                  qwen3:4b，适合约 16GB 内存
                </p>
                <p>
                  <strong className="block text-slate-950">增强模式</strong>
                  qwen3:8b，适合高配置电脑
                </p>
              </div>
            </div>
            <div className="surface-quiet p-4">
              <h3 className="font-black text-slate-950">手机和平板</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                WebGPU 可用时进入移动轻量模式。回答速度和效果会随手机芯片、内存和浏览器缓存变化。
              </p>
            </div>
            <div className="surface-quiet p-4">
              <h3 className="font-black text-slate-950">仍然受限</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                本地 AI 不产生 API 调用费用，但会使用本机 CPU、内存和硬盘空间。没有独立显卡也可以先试轻量模型；如果设备跑不动，直接使用学习工具箱模式，照样可以整理错题、做计划、打卡和生成家长周报模板。
              </p>
            </div>
          </div>
        </article>
      </section>

      <FallbackToolkit />
    </div>
  );
}
