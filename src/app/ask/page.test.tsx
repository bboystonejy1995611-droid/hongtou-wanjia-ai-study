import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import AskPage from "./page";

describe("ask page image recognition entry", () => {
  it("lets parents upload or photograph a question image before asking", () => {
    const markup = renderToStaticMarkup(<AskPage />);

    expect(markup).toContain("上传题目图片");
    expect(markup).toContain("拍照识题");
    expect(markup).toContain("清晰印刷题效果更好");
  });
});
