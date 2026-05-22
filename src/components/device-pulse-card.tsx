"use client";

import {
  Cpu,
  HardDriveDownload,
  LaptopMinimalCheck,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

import { useDeviceProfile } from "@/hooks/use-device-profile";
import { MODE_LABELS } from "@/lib/constants";

function yesNo(value: boolean) {
  return value ? "可用" : "暂不可用";
}

export function DevicePulseCard() {
  const { checking, profile, refresh } = useDeviceProfile();

  return (
    <aside className="surface home-device-panel p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <span className="chip">
            <LaptopMinimalCheck aria-hidden="true" className="h-4 w-4" />
            当前设备建议
          </span>
          <h2 className="mt-4 text-2xl font-black text-slate-950">
            {checking ? "正在检测本地能力" : MODE_LABELS[profile.mode]}
          </h2>
        </div>
        <button
          aria-label="重新检测设备"
          className="button-ghost min-w-11 px-3"
          onClick={() => void refresh()}
          type="button"
        >
          <RefreshCw aria-hidden="true" className="h-4 w-4" />
        </button>
      </div>

      <div className="metric-grid mt-5 text-sm">
        <div className="surface-quiet p-3">
          <Cpu aria-hidden="true" className="h-4 w-4 text-blue-700" />
          <p className="mt-2 font-bold text-slate-950">设备</p>
          <p className="mt-1 text-slate-600">
            {profile.deviceType === "desktop"
              ? "电脑"
              : profile.deviceType === "tablet"
                ? "平板"
                : "手机"}
          </p>
        </div>
        <div className="surface-quiet p-3">
          <ShieldCheck aria-hidden="true" className="h-4 w-4 text-emerald-700" />
          <p className="mt-2 font-bold text-slate-950">Ollama</p>
          <p className="mt-1 text-slate-600">{yesNo(profile.ollamaReachable)}</p>
        </div>
        <div className="surface-quiet p-3">
          <HardDriveDownload aria-hidden="true" className="h-4 w-4 text-violet-700" />
          <p className="mt-2 font-bold text-slate-950">浏览器模型</p>
          <p className="mt-1 text-slate-600">
            {profile.webGpuSupported ? "支持 WebGPU" : "缺少 WebGPU"}
          </p>
        </div>
      </div>

      <p className="mt-4 text-sm leading-7 text-slate-600">
        电脑端连接 Ollama 后会显示本地 AI 已连接；移动端支持 WebGPU 时可以下载轻量模型。
      </p>
      <Link className="button-secondary mt-4" href="/device-check">
        查看完整检测结果
      </Link>
    </aside>
  );
}
