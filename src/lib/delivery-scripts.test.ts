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
    const wrapper = readRootScript("install.bat");
    const script = readRootScript("scripts/install-helper.ps1");

    expect(wrapper).toContain("scripts\\install-helper.ps1");
    expect(script).toContain("Get-Command ollama");
    expect(script).toContain("ollama list");
    expect(script).toContain("ollama pull qwen3:1.7b");
    expect(script).toContain("请到下面的官网下载并安装");
    expect(script).toContain("https://ollama.com/download/windows");
    expect(script).not.toContain("where node");
  });

  it("keeps start.bat focused on Node checks and launching the local app", () => {
    const wrapper = readRootScript("start.bat");
    const script = readRootScript("scripts/start-helper.ps1");

    expect(wrapper).toContain("scripts\\start-helper.ps1");
    expect(script).toContain("Get-Command node");
    expect(script).toContain("Get-Command npm");
    expect(script).toContain("npm install");
    expect(script).toContain("npm run dev");
    expect(script).toContain("http://localhost:3000");
    expect(script).toContain("请到下面的官网下载");
    expect(script).toContain("https://nodejs.org/en/download");
    expect(script).toContain("保持 Ollama 运行");
    expect(script).not.toContain("ollama pull");
  });

  it("creates a desktop shortcut that points to start.bat and the app icon", () => {
    const wrapper = readRootScript("create-desktop-shortcut.bat");
    const script = readRootScript("scripts/create-desktop-shortcut.ps1");

    expect(wrapper).toContain("scripts\\create-desktop-shortcut.ps1");
    expect(script).toContain("start.bat");
    expect(script).toContain("public\\icons\\app-icon.ico");
    expect(script).toContain("CreateShortcut");
    expect(script).toContain("IconLocation");
  });

  it("uses Windows line endings so cmd keeps Chinese batch lines intact", () => {
    expect(usesOnlyWindowsLineEndings(readRootScript("install.bat"))).toBe(true);
    expect(usesOnlyWindowsLineEndings(readRootScript("start.bat"))).toBe(true);
    expect(usesOnlyWindowsLineEndings(readRootScript("create-desktop-shortcut.bat"))).toBe(
      true,
    );
  });
});
