"use client";

import { useCallback, useEffect, useState } from "react";

import {
  detectConstrainedHardware,
  detectDeviceType,
  recommendStudyMode,
} from "@/lib/device";
import { checkOllamaReachable } from "@/lib/ollama";
import { storageIsUsable } from "@/lib/storage";
import type { DeviceType, StudyMode } from "@/lib/types";

interface NavigatorWithMemory extends Navigator {
  deviceMemory?: number;
}

export interface DeviceProfile {
  deviceType: DeviceType;
  mode: StudyMode;
  ollamaReachable: boolean;
  webGpuSupported: boolean;
  localStorageSupported: boolean;
  browserCacheSupported: boolean;
  constrainedHardware: boolean;
  checkedAt?: string;
}

const defaultProfile: DeviceProfile = {
  deviceType: "desktop",
  mode: "fallback",
  ollamaReachable: false,
  webGpuSupported: false,
  localStorageSupported: false,
  browserCacheSupported: false,
  constrainedHardware: false,
};

export function useDeviceProfile() {
  const [profile, setProfile] = useState<DeviceProfile>(defaultProfile);
  const [checking, setChecking] = useState(true);

  const refresh = useCallback(async () => {
    setChecking(true);

    const navigatorSnapshot = navigator as NavigatorWithMemory;
    const deviceType = detectDeviceType({
      userAgent: navigator.userAgent,
      maxTouchPoints: navigator.maxTouchPoints ?? 0,
      viewportWidth: window.innerWidth,
    });
    const constrainedHardware =
      deviceType !== "desktop" &&
      detectConstrainedHardware({
        deviceMemory: navigatorSnapshot.deviceMemory,
        hardwareConcurrency: navigator.hardwareConcurrency,
      });
    const ollamaReachable = await checkOllamaReachable();
    const webGpuSupported = "gpu" in navigator;
    const localStorageSupported = storageIsUsable(window.localStorage);
    const browserCacheSupported = "caches" in window;

    setProfile({
      browserCacheSupported,
      checkedAt: new Date().toISOString(),
      constrainedHardware,
      deviceType,
      localStorageSupported,
      mode: recommendStudyMode({
        constrainedHardware,
        deviceType,
        ollamaReachable,
        webGpuSupported,
      }),
      ollamaReachable,
      webGpuSupported,
    });
    setChecking(false);
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return {
    checking,
    profile,
    refresh,
  };
}

