# Redhead Family Delivery Copy Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rename the app to 红头顽家 and clarify desktop versus mobile parent delivery paths without changing core study functionality.

**Architecture:** Centralize brand changes through existing app constants and update remaining hard-coded metadata, script titles, footer copy, README, and manifest strings. Extend the existing homepage CTA cluster and parent install guide page with mobile-toolbox delivery content and same-WiFi testing instructions, keeping all behavior changes limited to navigation copy and static content.

**Tech Stack:** Next.js App Router, React, Tailwind CSS, Vitest render tests, JSON manifest, Markdown, Windows batch files.

---

### Task 1: Brand and homepage test expectations

**Files:**
- Modify: `src/app/page.test.tsx`
- Create: `src/app/layout-brand.test.ts`

- [ ] Add failing expectations for `红头顽家 AI 学习助手｜免费本地版`, homepage CTA labels, metadata app title, and manifest naming.
- [ ] Run targeted Vitest files and confirm old brand strings keep the tests red.

### Task 2: Install guide delivery copy tests

**Files:**
- Modify: `src/app/install-guide/page.test.tsx`

- [ ] Add failing expectations for desktop AI enhanced delivery wording, mobile toolbox wording, same-WiFi IP example, firewall note, and formal web-link sharing note.
- [ ] Run the install guide test and confirm the new copy is missing before implementation.

### Task 3: Implement static brand updates

**Files:**
- Modify: `src/lib/constants.ts`
- Modify: `src/app/layout.tsx`
- Modify: `src/components/app-shell.tsx`
- Modify: `public/manifest.json`
- Modify: `install.bat`
- Modify: `start.bat`

- [ ] Replace brand constants and hard-coded old brand text.
- [ ] Keep batch files as Windows CRLF after editing.
- [ ] Run brand-focused tests.

### Task 4: Implement homepage and install guide copy

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/install-guide/page.tsx`

- [ ] Update homepage hero actions to 开始学习, 家长安装引导, 手机/平板使用说明.
- [ ] Add a mobile instructions anchor section and desktop/mobile delivery explanation to the install guide.
- [ ] Run page tests and keep the guide responsive copy concise.

### Task 5: README delivery documentation

**Files:**
- Modify: `README.md`

- [ ] Rename the README project heading and old brand mentions.
- [ ] Write explicit 电脑 AI 增强版 and 手机 / 平板学习工具箱版 sections.
- [ ] Add zip keep/exclude lists and two mobile testing/share modes.
- [ ] Search README for required headings and old brand leftovers.

### Task 6: Verification

- [ ] Run `npm test`, `npm run typecheck`, and `npm run build` when available.
- [ ] If `npm` is unavailable in Codex shell, run Vitest, TypeScript, and Next build through local Node entrypoints and report the difference.
- [ ] Browser-check the homepage CTA set and install guide mobile section at desktop and narrow widths.

