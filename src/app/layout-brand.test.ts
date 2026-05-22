import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import { metadata } from "./layout";

describe("redhead family brand metadata", () => {
  it("uses the redhead family brand for app metadata", () => {
    expect(metadata.applicationName).toBe("红头顽家 AI 学习助手｜免费本地版");
    expect(metadata.title).toMatchObject({
      default: "红头顽家 AI 学习助手｜免费本地版",
    });
    expect(metadata.appleWebApp).toMatchObject({
      title: "红头顽家 AI 学习助手",
    });
  });

  it("uses the redhead family brand in the PWA manifest", () => {
    const manifest = JSON.parse(
      readFileSync(join(process.cwd(), "public", "manifest.json"), "utf8"),
    ) as { name: string; short_name: string };

    expect(manifest.name).toBe("红头顽家 AI 学习助手｜免费本地版");
    expect(manifest.short_name).toBe("红头顽家学习助手");
  });
});
