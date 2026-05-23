import type { DeviceType, StudyMode } from "./types";

export interface DeviceDetectionInput {
  userAgent: string;
  maxTouchPoints: number;
  viewportWidth: number;
}

export interface StudyModeInput {
  deviceType: DeviceType;
  ollamaReachable: boolean;
  webGpuSupported: boolean;
  constrainedHardware?: boolean;
}

export interface HardwareSnapshot {
  deviceMemory?: number;
  hardwareConcurrency?: number;
}

export function detectDeviceType({
  userAgent,
  maxTouchPoints,
  viewportWidth,
}: DeviceDetectionInput): DeviceType {
  const normalizedAgent = userAgent.toLowerCase();
  const looksLikeIPad =
    normalizedAgent.includes("ipad") ||
    (normalizedAgent.includes("macintosh") && maxTouchPoints > 1);
  const looksLikeTablet =
    looksLikeIPad ||
    normalizedAgent.includes("tablet") ||
    (normalizedAgent.includes("android") &&
      !normalizedAgent.includes("mobile")) ||
    (maxTouchPoints > 0 && viewportWidth >= 768 && viewportWidth <= 1366);

  if (looksLikeTablet) {
    return "tablet";
  }

  const looksLikeMobile =
    normalizedAgent.includes("iphone") ||
    normalizedAgent.includes("ipod") ||
    normalizedAgent.includes("android") ||
    normalizedAgent.includes("mobile");

  return looksLikeMobile ? "mobile" : "desktop";
}

export function recommendStudyMode({
  deviceType,
  ollamaReachable,
  webGpuSupported,
  constrainedHardware = false,
}: StudyModeInput): StudyMode {
  if (deviceType === "desktop" && ollamaReachable) {
    return "desktop-ai";
  }

  return "fallback";
}

export function detectConstrainedHardware({
  deviceMemory,
  hardwareConcurrency,
}: HardwareSnapshot): boolean {
  const lowMemory = typeof deviceMemory === "number" && deviceMemory < 4;
  const fewCpuThreads =
    typeof hardwareConcurrency === "number" && hardwareConcurrency < 4;

  return lowMemory || fewCpuThreads;
}
