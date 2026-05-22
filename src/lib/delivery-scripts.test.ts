import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

function readRootScript(name: string) {
  return readFileSync(join(process.cwd(), name), "utf8");
}

function usesOnlyWindowsLineEndings(text: string) {
  return text.includes("\r\n") && !text.replaceAll("\r\n", "").includes("\n");
}

describe("Windows parent delivery scripts", () => {
  it("keeps install.bat focused on Ollama and the light qwen3 model", () => {
    const script = readRootScript("install.bat");

    expect(script).toContain("where ollama");
    expect(script).toContain("ollama list");
    expect(script).toContain("ollama pull qwen3:1.7b");
    expect(script).toContain("请到下面的官网下载并安装");
    expect(script).toContain("https://ollama.com/download/windows");
    expect(script).not.toContain("where node");
  });

  it("keeps start.bat focused on Node checks and launching the local app", () => {
    const script = readRootScript("start.bat");

    expect(script).toContain("where node");
    expect(script).toContain("where npm");
    expect(script).toContain("http://localhost:3000");
    expect(script).toContain("请到下面的官网下载");
    expect(script).toContain("https://nodejs.org/en/download");
    expect(script).toContain("保持 Ollama 运行");
    expect(script).not.toContain("ollama pull");
  });

  it("uses Windows line endings so cmd keeps Chinese batch lines intact", () => {
    expect(usesOnlyWindowsLineEndings(readRootScript("install.bat"))).toBe(true);
    expect(usesOnlyWindowsLineEndings(readRootScript("start.bat"))).toBe(true);
  });
});
