# 红头顽家 AI 学习助手｜免费本地版

这是一个面向家长群分享的本地优先学习助手，前端使用 Next.js + React + Tailwind CSS。项目不接 OpenAI、Claude、通义千问等云端 AI API：

- 电脑端优先连接本机 Ollama。
- 手机和平板端在浏览器支持 WebGPU 时加载 WebLLM 轻量模型。
- 本地 AI 不可用或设备资源偏紧时，自动回到备用学习工具模式。
- 错题本、学习记录和家长报告快照优先保存在浏览器 `localStorage`。
- 不需要登录注册。

## 已实现功能

- 首页、设备检测、AI 答疑、作文批改、错题本、学习计划、家长报告、学习记录与周总结。
- 电脑端 Ollama 检测：访问本机 `http://localhost:11434/api/tags`。
- 电脑答疑和作文批改：调用本机 `http://localhost:11434/api/chat`。
- 移动端 WebGPU 检测、WebLLM 首次下载提示和轻量模型加载按钮。
- 低配置备用模式：
  - 错题本
  - 学习计划生成器
  - 作文结构模板
  - 数学步骤模板
  - 英语作文模板
  - 家长周报模板
  - 每日学习打卡
- PWA 基础能力：`manifest.json`、service worker、图标占位、离线提示页。

## 环境要求

- Node.js `20.9` 或更高版本。
- npm。
- 电脑增强模式需要安装并启动 Ollama。
- 手机和平板轻量模式需要浏览器支持 WebGPU，并给浏览器留出模型下载与缓存空间。

## 两种分享版本

### 电脑 AI 增强版

适合这些家长：

- 有 Windows 电脑。
- 愿意安装 Node.js 和 Ollama。
- 网络可以下载 `qwen3:1.7b`。
- 想体验真正本地 AI 答疑。

交付方式：

1. 机构把项目打包成 zip 压缩包发给家长。
2. 家长把压缩包解压到桌面。
3. 第一次双击 `install.bat`。
4. 按提示安装或检查 Ollama，并下载 `qwen3:1.7b`。
5. 以后双击 `start.bat` 启动学习助手。
6. 浏览器打开 `http://localhost:3000` 后使用。

### 手机 / 平板学习工具箱版

适合这些家长：

- 没有电脑。
- 只想用手机或平板。
- 不想安装 Ollama。
- 不想下载模型。
- 不想折腾技术配置。

手机和平板默认使用“学习工具箱模式”，包括：

- 错题本
- 学习计划
- 作文结构模板
- 数学解题步骤模板
- 英语作文模板
- 家长周报模板
- 每日打卡

手机和平板不强制使用本地 AI。电脑本地 AI 增强版只是可选功能，不是必须步骤。

## 普通家长安装流程

如果把项目文件夹分享给 Windows 家长，优先让家长按下面两步走：

1. 双击 `install.bat`。
   - 这个脚本只负责准备电脑端本地 AI。
   - 如果电脑还没有 Ollama，会用中文提醒先去 Ollama 官网下载安装。
   - 如果 Ollama 已准备好，但还没有轻量模型，会自动下载 `qwen3:1.7b`。
2. 双击 `start.bat`。
   - 这个脚本只负责检查 Node.js 和 npm，并启动学习助手。
   - 如果电脑缺少 Node.js 运行环境，会提示先到 Node.js 官网下载，安装完成后重新双击。
   - 启动后会自动打开 `http://localhost:3000`。

普通家庭电脑优先尝试 `qwen3:1.7b`。使用电脑端 AI 答疑时，请保持 Ollama 运行；如果电脑跑起来比较吃力，也可以直接使用页面里的学习工具箱模式。

打开页面后，家长还可以进入“家长安装引导”页面查看更短的两步说明。

## 技术人员启动流程

在项目根目录执行：

```bash
npm install
npm run dev
```

浏览器打开：

```text
http://localhost:3000
```

常用验证命令：

```bash
npm test
npm run typecheck
npm run build
```

PWA 的 service worker 只在生产模式注册。要检查接近正式使用的安装体验，可执行：

```bash
npm run build
npm run start
```

然后继续打开 `http://localhost:3000`。

## 如何打包成压缩包发给家长

建议在确认项目能正常启动后，再把项目根目录压缩分享给家长。

打包 zip 时保留：

- `install.bat`
- `start.bat`
- `README.md`
- `package.json`
- `package-lock.json`
- `src`
- `public`
- `next.config`
- `tsconfig`
- 其他项目必要配置文件

不要打包：

- `node_modules`
- `.next`
- `.git`
- `dev-server`
- `dev-server-error`
- `tsconfig.tsbuildinfo`

不必把本机已经下载的 Ollama 模型打进压缩包，家长电脑会通过 `install.bat` 准备 `qwen3:1.7b`。通常也不要把 `node_modules` 打进压缩包，压缩包会更小；家长第一次运行 `start.bat` 时会自动准备项目运行文件。

发给家长时附一句说明：先双击 `install.bat`，再双击 `start.bat`。

如果分享对象完全不熟悉电脑安装流程，建议同时告诉家长：电脑端第一次准备本地 AI 可能需要等待模型下载完成，手机和平板可以先使用学习工具箱模式。

## 常见问题

### 为什么还要安装 Ollama

电脑端 AI 需要在家长自己的电脑上运行。Ollama 用来承载本地模型，项目不会把题目发到付费云端 AI API。

### 为什么还要安装 Node.js

当前交付的是可本地启动的项目版本。Node.js 用来把学习助手页面在家长电脑上运行起来；`start.bat` 会先检查它是否可用。

### 第一次为什么要等一会儿

第一次使用电脑端 AI 时，需要下载 `qwen3:1.7b` 轻量模型；第一次启动项目时，也可能需要准备项目运行文件。等待时间会随网络和电脑情况变化。

### 没有独立显卡还能不能用

可以先尝试 `qwen3:1.7b` 轻量模型。回答速度会随电脑配置变化，本地 AI 也会消耗本机 CPU、内存和硬盘空间。

### 电脑带不动怎么办

直接使用学习工具箱模式。错题整理、学习计划、作文结构模板、数学步骤模板和家长周报模板仍然可以使用。

## 电脑端安装 Ollama

1. 安装 Ollama。
2. 启动 Ollama。
3. 下载默认轻量模型：

```bash
ollama pull qwen3:1.7b
```

4. 打开本项目的“设备检测”页。
5. 看到“电脑本地 AI 已连接”后即可进入答疑或作文批改。

普通家庭电脑优先使用 `qwen3:1.7b`。项目把电脑模型分成三档：

- 轻量模式：`qwen3:1.7b`，默认推荐，普通家庭电脑先从这一档开始。
- 推荐模式：`qwen3:4b`，适合约 16GB 内存的电脑。
- 增强模式：`qwen3:8b`，适合高配置电脑。

如果你想再准备更强或备用模型，可分别执行：

```bash
ollama pull qwen3:4b
ollama pull qwen3:8b
ollama pull gemma3:4b
```

没有独立显卡也可以先尝试轻量模型，回答速度会随电脑配置变化。如果电脑跑起来比较吃力，页面里的学习工具箱模式仍能继续整理计划、错题和周报模板。

开发环境从 `localhost` 页面访问本机 Ollama 通常最省事。如果未来把前端部署到其他域名，再让浏览器访问家长电脑上的 Ollama，可能还需要按 Ollama 配置额外的允许来源。

## 手机和平板如何使用

1. 用手机或平板浏览器打开页面。
2. 先进入“设备检测”页。
3. 浏览器支持 WebGPU 时，会推荐“移动 AI 轻量模式”。
4. 在答疑页或作文批改页点击“下载并加载轻量模型”。
5. 首次加载会下载 WebLLM 轻量模型，之后浏览器会尽量复用已缓存资源。

当前移动端使用的轻量模型标识在 [src/lib/webllm.ts](./src/lib/webllm.ts) 中：

```ts
export const MOBILE_WEBLLM_MODEL = "Qwen3-0.6B-q4f16_1-MLC";
```

移动端更适合：

- 基础全科答疑
- 知识点讲解
- 简单作文修改
- 每日学习计划
- 错题整理
- 家长报告模板

特别复杂的题目、长论文和很长作文在手机端可能慢，或直接回到备用模式。

## 手机 / 平板测试说明

### 方式一：同一个 WiFi 下测试

1. 电脑先运行 `start.bat`，启动项目。
2. 手机和平板连接同一个 WiFi。
3. 在电脑上查看本机 IPv4 地址。
4. 手机浏览器访问 `http://电脑IP地址:3000`。

例如：

```text
http://192.168.1.8:3000
```

注意：

- 如果手机打不开，可能是 Windows 防火墙拦截。
- 需要允许 Node.js 或浏览器开发服务通过防火墙。
- 手机和平板访问的是电脑正在运行的学习助手。
- 电脑关机或关闭 `start.bat` 后，手机就访问不了。

### 方式二：正式分享给家长

如果要让外地家长、不同 WiFi 的家长也能用手机版，需要把“学习工具箱版”部署成网页链接。

手机版网页链接默认不启用电脑本地 AI，只提供学习工具箱、错题本、学习计划、作文模板和家长报告模板。

## 如何添加到手机桌面

Android 常见浏览器：

1. 打开页面。
2. 打开浏览器菜单。
3. 选择“安装应用”或“添加到主屏幕”。

iPhone / iPad Safari：

1. 打开页面。
2. 点击分享按钮。
3. 选择“添加到主屏幕”。

添加后会以接近 App 的方式启动。图标当前是项目内的占位图标，可后续替换。

## 为什么不产生 AI API 调用费用

本项目没有配置任何云端 AI API key，也没有把问题发送到 OpenAI、Claude、通义千问等付费接口：

- 电脑端推理发生在家长自己的 Ollama 本机服务中。
- 手机和平板端推理发生在浏览器本地模型中。
- 备用模式完全不调用 AI。

需要注意：

- 首次下载 Ollama 模型或 WebLLM 模型会占用网络流量和硬盘空间。
- 本地 AI 不产生 API 调用费用，但会消耗本机 CPU、内存和硬盘空间。
- 没有独立显卡也可以先尝试轻量模型，速度取决于电脑配置。
- 如果设备跑不动，可以直接使用学习工具箱模式。

## 为什么不同设备速度不同

本地推理速度会受这些因素影响：

- 模型大小。
- CPU、GPU、内存和显存。
- 浏览器是否支持 WebGPU。
- 手机是否有足够内存缓存模型。
- 当前设备是否同时在运行其他重任务。

因此电脑端建议先用 `qwen3:1.7b` 跑通轻量模式，再根据电脑配置尝试 `qwen3:4b` 或 `qwen3:8b`。学习工具箱模式会保证低配置设备也有可用学习流程。

## 本地数据说明

默认本地存储键名在 [src/lib/constants.ts](./src/lib/constants.ts)：

- `dance-growth-local-mistakes`
- `dance-growth-local-study-records`
- `dance-growth-local-parent-reports`

浏览器清除站点数据后，这些本地记录也会被清除。

## 如何修改机构名称

主要改这里：

1. [src/lib/constants.ts](./src/lib/constants.ts)
2. [public/manifest.json](./public/manifest.json)
3. [README.md](./README.md)

`src/lib/constants.ts` 中的 `APP_NAME` 和 `ORGANIZATION_NAME` 是前端最先要改的位置。

## 如何后期升级模型

电脑 Ollama：

1. 先用 Ollama 下载新模型。
2. 修改 [src/lib/constants.ts](./src/lib/constants.ts) 中的 `OLLAMA_MODELS`。
3. 在设备性能不足时保留一个小模型选项。

移动 WebLLM：

1. 确认目标模型在当前 `@mlc-ai/web-llm` 版本中可用。
2. 修改 [src/lib/webllm.ts](./src/lib/webllm.ts) 中的 `MOBILE_WEBLLM_MODEL`。
3. 在真机浏览器测试首次下载、缓存复用、长文本输入和回退体验。

## 关键代码位置

- 设备检测与模式推荐：[src/hooks/use-device-profile.ts](./src/hooks/use-device-profile.ts)
- Ollama 适配层：[src/lib/ollama.ts](./src/lib/ollama.ts)
- WebLLM 适配层：[src/lib/webllm.ts](./src/lib/webllm.ts)
- 本地存储数据 hook：[src/hooks/use-study-data.ts](./src/hooks/use-study-data.ts)
- 家长报告汇总：[src/lib/report.ts](./src/lib/report.ts)
- PWA manifest：[public/manifest.json](./public/manifest.json)
- service worker：[public/sw.js](./public/sw.js)
