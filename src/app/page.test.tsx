import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import HomePage from "./page";

describe("homepage flagship presentation", () => {
  it("presents the homepage as a local AI study machine console", () => {
    const markup = renderToStaticMarkup(<HomePage />);

    expect(markup).toContain('data-theme="cyber-arena"');
    expect(markup).toContain('data-home-hero="flagship"');
    expect(markup).toContain("赛博训练舱");
    expect(markup).toContain("红头顽家 AI 学习助手｜免费本地版");
    expect(markup).toContain("home-cta-primary");
    expect(markup).toContain("进入训练");
    expect(markup).toContain('href="/install-guide"');
    expect(markup).toContain("家长安装引导");
    expect(markup).toContain("手机/平板使用说明");
    expect(markup).toContain("home-feature-deck");
    expect(markup).toContain("战术答疑");
    expect(markup).toContain("复盘档案");
    expect(markup).toContain("成长战报");
    expect(markup).toContain("普通家庭电脑优先使用 qwen3:1.7b");
    expect(markup).toContain("会消耗本机 CPU、内存和硬盘空间");
  });
});
