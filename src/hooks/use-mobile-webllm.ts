"use client";

import { useCallback, useRef, useState } from "react";
import type { MLCEngine } from "@mlc-ai/web-llm";

import {
  chatWithMobileWebLlm,
  loadMobileWebLlmEngine,
  MOBILE_WEBLLM_MODEL,
} from "@/lib/webllm";

type MobileEngineStatus = "idle" | "loading" | "ready" | "error";

export function useMobileWebLlm() {
  const engineRef = useRef<MLCEngine | null>(null);
  const [status, setStatus] = useState<MobileEngineStatus>("idle");
  const [progressText, setProgressText] = useState(
    "首次使用需要下载轻量模型，下载后浏览器会尽量复用本地缓存。",
  );
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    if (engineRef.current) {
      return engineRef.current;
    }

    setError("");
    setStatus("loading");

    try {
      const engine = await loadMobileWebLlmEngine((report) => {
        setProgressText(report.text || "正在加载浏览器本地模型...");
      });

      engineRef.current = engine;
      setStatus("ready");
      setProgressText(`轻量模型 ${MOBILE_WEBLLM_MODEL} 已在浏览器中就绪。`);

      return engine;
    } catch (loadError) {
      const message =
        loadError instanceof Error
          ? loadError.message
          : "移动端模型加载失败，请使用备用模式。";

      setError(message);
      setStatus("error");
      throw loadError;
    }
  }, []);

  const ask = useCallback(
    async (prompt: string) => {
      const engine = await load();

      return chatWithMobileWebLlm(engine, prompt);
    },
    [load],
  );

  return {
    ask,
    error,
    load,
    modelId: MOBILE_WEBLLM_MODEL,
    progressText,
    status,
  };
}

