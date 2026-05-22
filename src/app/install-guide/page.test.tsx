import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import InstallGuidePage from "./page";

describe("parent install guide", () => {
  it("explains the two-step local delivery flow in parent-friendly language", () => {
    const markup = renderToStaticMarkup(<InstallGuidePage />);

    expect(markup).toContain("家长安装引导");
    expect(markup).toContain("不接云端 AI API");
    expect(markup).toContain("install.bat");
    expect(markup).toContain("start.bat");
    expect(markup).toContain("qwen3:1.7b");
    expect(markup).toContain("手机和平板默认先使用学习工具箱模式");
    expect(markup).toContain("电脑 AI 增强版");
    expect(markup).toContain("手机 / 平板学习工具箱版");
    expect(markup).toContain("http://192.168.1.8:3000");
    expect(markup).toContain("Windows 防火墙");
    expect(markup).toContain("正式分享给家长");
  });
});
