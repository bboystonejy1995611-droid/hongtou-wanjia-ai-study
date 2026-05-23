import { describe, expect, it } from "vitest";

import {
  detectConstrainedHardware,
  detectDeviceType,
  recommendStudyMode,
} from "./device";

describe("device helpers", () => {
  it("classifies desktop, tablet, and mobile browsers", () => {
    expect(
      detectDeviceType({
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        maxTouchPoints: 0,
        viewportWidth: 1440,
      }),
    ).toBe("desktop");

    expect(
      detectDeviceType({
        userAgent:
          "Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X) AppleWebKit/605.1.15",
        maxTouchPoints: 5,
        viewportWidth: 1024,
      }),
    ).toBe("tablet");

    expect(
      detectDeviceType({
        userAgent:
          "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 Mobile",
        maxTouchPoints: 5,
        viewportWidth: 412,
      }),
    ).toBe("mobile");
  });

  it("recommends the local AI mode only when its engine is available", () => {
    expect(
      recommendStudyMode({
        deviceType: "desktop",
        ollamaReachable: true,
        webGpuSupported: true,
      }),
    ).toBe("desktop-ai");

    expect(
      recommendStudyMode({
        deviceType: "tablet",
        ollamaReachable: false,
        webGpuSupported: true,
      }),
    ).toBe("fallback");

    expect(
      recommendStudyMode({
        deviceType: "mobile",
        ollamaReachable: false,
        webGpuSupported: false,
      }),
    ).toBe("fallback");
  });

  it("routes clearly constrained devices to the backup tools", () => {
    expect(
      detectConstrainedHardware({
        deviceMemory: 2,
        hardwareConcurrency: 2,
      }),
    ).toBe(true);

    expect(
      recommendStudyMode({
        deviceType: "tablet",
        ollamaReachable: false,
        webGpuSupported: true,
        constrainedHardware: true,
      }),
    ).toBe("fallback");
  });
});
