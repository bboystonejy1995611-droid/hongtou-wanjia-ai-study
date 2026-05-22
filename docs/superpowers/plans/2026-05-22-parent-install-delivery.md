# Parent Install Delivery Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a parent-friendly Windows delivery path with install and start scripts, an install guide page, a homepage entry, and README sharing guidance.

**Architecture:** Keep the product UI changes inside the existing Next.js app: a new static Chinese route at `/install-guide` and a new homepage CTA. Keep Windows delivery concerns in root batch scripts with narrow responsibilities: `install.bat` prepares Ollama and `qwen3:1.7b`, while `start.bat` checks Node.js/npm and starts the local app. Documentation separates parent steps from technical startup and distribution notes.

**Tech Stack:** Next.js App Router, React, Tailwind CSS, Vitest server-rendered page tests, Windows batch scripts, Markdown.

---

## File Map

- Create `src/app/install-guide/page.tsx`: parent-facing Chinese install guide route.
- Create `src/app/install-guide/page.test.tsx`: server-rendered assertions for the guide copy and step labels.
- Modify `src/app/page.tsx`: add the homepage CTA that links to the guide.
- Modify `src/app/page.test.tsx`: assert the homepage CTA and destination.
- Create `install.bat`: Ollama and `qwen3:1.7b` preparation flow for Windows parents.
- Create `start.bat`: Node.js/npm check, dependency/start flow, browser opening, and Ollama reminder.
- Modify `README.md`: parent install flow, technical startup flow, zip sharing guidance, and FAQ.

### Task 1: Homepage install guide entry

**Files:**
- Modify: `src/app/page.test.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Write the failing homepage CTA test**

```tsx
expect(markup).toContain('href="/install-guide"');
expect(markup).toContain("家长安装引导");
```

- [ ] **Step 2: Run the homepage test to verify it fails**

Run: `npm test -- src/app/page.test.tsx`

Expected: FAIL because the homepage does not yet contain the `/install-guide` link or its Chinese label.

- [ ] **Step 3: Add the minimal homepage CTA**

```tsx
<Link className="home-cta-secondary" href="/install-guide">
  家长安装引导
  <ArrowRight aria-hidden="true" className="h-4 w-4" />
</Link>
```

- [ ] **Step 4: Run the homepage test to verify it passes**

Run: `npm test -- src/app/page.test.tsx`

Expected: PASS.

### Task 2: Parent install guide page

**Files:**
- Create: `src/app/install-guide/page.test.tsx`
- Create: `src/app/install-guide/page.tsx`

- [ ] **Step 1: Write the failing install guide page test**

```tsx
const markup = renderToStaticMarkup(<InstallGuidePage />);

expect(markup).toContain("家长安装引导");
expect(markup).toContain("不接云端 AI API");
expect(markup).toContain("install.bat");
expect(markup).toContain("start.bat");
expect(markup).toContain("qwen3:1.7b");
expect(markup).toContain("手机和平板默认先使用学习工具箱模式");
```

- [ ] **Step 2: Run the route test to verify it fails**

Run: `npm test -- src/app/install-guide/page.test.tsx`

Expected: FAIL because `src/app/install-guide/page.tsx` does not exist yet.

- [ ] **Step 3: Implement the static route**

```tsx
export default function InstallGuidePage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="surface p-6 sm:p-8">
        <span className="chip">家长安装引导</span>
        <h1>第一次使用，按两步准备就好</h1>
        <p>本工具不接云端 AI API，不产生 AI API 调用费用。</p>
      </section>
    </div>
  );
}
```

Expand the page with parent-friendly sections for reassurance, Windows preparation, starting the assistant, and fallback device guidance while keeping CTA choices concise.

- [ ] **Step 4: Run the route test to verify it passes**

Run: `npm test -- src/app/install-guide/page.test.tsx`

Expected: PASS.

### Task 3: Windows batch scripts

**Files:**
- Create: `install.bat`
- Create: `start.bat`

- [ ] **Step 1: Add the Ollama preparation script**

```bat
@echo off
chcp 65001 >nul
where ollama >nul 2>nul
if errorlevel 1 (
  echo 当前电脑还没有准备好 Ollama。
  echo 请先到 Ollama 官网下载安装：https://ollama.com/download/windows
  pause
  exit /b 1
)

ollama list | findstr /I /C:"qwen3:1.7b" >nul
if errorlevel 1 (
  echo 正在下载普通家庭电脑优先使用的轻量模型 qwen3:1.7b...
  ollama pull qwen3:1.7b
  if errorlevel 1 exit /b 1
)
```

Finish the script with friendly Chinese success and retry messages.

- [ ] **Step 2: Add the local start script**

```bat
@echo off
chcp 65001 >nul
where node >nul 2>nul
if errorlevel 1 goto missing_node
where npm >nul 2>nul
if errorlevel 1 goto missing_node

echo 使用电脑端 AI 时，请保持 Ollama 运行。
start "" "http://localhost:3000"
npm run dev
exit /b %errorlevel%

:missing_node
echo 当前电脑缺少 Node.js 运行环境，需要先安装 Node.js。
echo 请到 Node.js 官网下载：https://nodejs.org/en/download
echo 安装完成后，请重新双击 start.bat。
pause
exit /b 1
```

Ensure the script runs from its own directory and avoids exposing raw setup errors where a parent-facing message is more helpful.

- [ ] **Step 3: Review scripts without executing model downloads**

Run: `Get-Content -Raw install.bat`

Expected: Chinese Ollama missing message, `ollama list`, and `ollama pull qwen3:1.7b` are present.

Run: `Get-Content -Raw start.bat`

Expected: Node.js/npm checks, Node.js official download hint, browser open command, and Ollama reminder are present.

### Task 4: README delivery guidance

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Add the parent and technical README sections**

Add:

```md
## 普通家长安装流程

1. 双击 `install.bat` 准备电脑端本地 AI。
2. 双击 `start.bat` 打开学习助手。

## 技术人员启动流程
```

Add notes for sharing a zip package with parents and a short FAQ covering Ollama, Node.js, first model download time, local resource usage, and fallback toolbox mode.

- [ ] **Step 2: Review README wording**

Run: `rg -n "普通家长安装流程|技术人员启动流程|压缩包|常见问题|install.bat|start.bat" README.md`

Expected: Each requested README section and script name is present.

### Task 5: Full verification

**Files:**
- Verify: `src/app/page.test.tsx`
- Verify: `src/app/install-guide/page.test.tsx`
- Verify: `README.md`
- Verify: `install.bat`
- Verify: `start.bat`

- [ ] **Step 1: Run unit tests**

Run: `npm test`

Expected: PASS with zero failed tests.

- [ ] **Step 2: Run TypeScript validation**

Run: `npm run typecheck`

Expected: PASS with exit code 0.

- [ ] **Step 3: Run production build**

Run: `npm run build`

Expected: PASS with exit code 0.

- [ ] **Step 4: Browser-check the new route and CTA**

Open the known local app homepage and `/install-guide` in the in-app browser after the route exists.

Expected: homepage CTA is visible and the guide remains readable at desktop and mobile widths.

