$ErrorActionPreference = "Stop"
$ProjectRoot = Split-Path -Parent $PSScriptRoot

function Stop-WithMessage {
  param(
    [string[]] $Lines,
    [int] $Code = 1
  )

  Write-Host ""
  foreach ($line in $Lines) {
    Write-Host $line
  }
  Write-Host ""
  Read-Host "请按回车键关闭窗口"
  exit $Code
}

Set-Location $ProjectRoot

Write-Host ""
Write-Host "============================================"
Write-Host "  红头顽家 AI 学习助手 - 电脑端 AI 准备"
Write-Host "============================================"
Write-Host ""
Write-Host "这一步会检查 Ollama，并准备普通家庭电脑优先使用的轻量模型。"
Write-Host ""

if (-not (Get-Command ollama -ErrorAction SilentlyContinue)) {
  Stop-WithMessage @(
    "当前电脑还没有安装 Ollama。",
    "请到下面的官网下载并安装：",
    "https://ollama.com/download/windows",
    "安装完成后，请重新双击 install.bat。"
  )
}

Write-Host "已找到 Ollama，正在检查轻量模型 qwen3:1.7b..."
Write-Host ""

$modelList = & ollama list 2>$null
if ($LASTEXITCODE -ne 0) {
  Stop-WithMessage @(
    "Ollama 暂时没有响应。",
    "请先打开 Ollama，然后重新双击 install.bat。"
  )
}

if ($modelList -match "qwen3:1\.7b") {
  Write-Host "您的电脑已经有 qwen3:1.7b 轻量模型。"
} else {
  Write-Host "第一次使用需要下载 qwen3:1.7b，时间会随网络和电脑情况变化。"
  Write-Host "现在开始下载，请保持这个窗口打开。"
  Write-Host ""
  & ollama pull qwen3:1.7b
  if ($LASTEXITCODE -ne 0) {
    Stop-WithMessage @(
      "这次模型下载没有完成。",
      "请先确认网络正常，并让 Ollama 保持运行，然后重新双击 install.bat。"
    )
  }
  Write-Host ""
  Write-Host "轻量模型已经下载完成。"
}

Write-Host ""
Write-Host "电脑端 AI 已准备好。"
Write-Host "下一步请双击 start.bat，启动学习助手。"
Write-Host "使用电脑端 AI 答疑时，请保持 Ollama 运行。"
Write-Host ""
Read-Host "请按回车键关闭窗口"
exit 0
