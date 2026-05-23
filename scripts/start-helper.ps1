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
Write-Host "  红头顽家 AI 学习助手 - 启动"
Write-Host "============================================"
Write-Host ""

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
  Stop-WithMessage @(
    "当前电脑缺少 Node.js 运行环境，需要先安装 Node.js。",
    "请到下面的官网下载：",
    "https://nodejs.org/en/download",
    "安装完成后，请重新双击 start.bat。"
  )
}

if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
  Stop-WithMessage @(
    "当前电脑缺少 npm，通常安装 Node.js 后会一起安装。",
    "请到下面的官网下载 Node.js：",
    "https://nodejs.org/en/download",
    "安装完成后，请重新双击 start.bat。"
  )
}

Write-Host "已找到 Node.js 运行环境。"
Write-Host "使用电脑端 AI 答疑时，请保持 Ollama 运行。"
Write-Host ""

$nextCli = Join-Path $ProjectRoot "node_modules\next\dist\bin\next"
if (-not (Test-Path $nextCli)) {
  Write-Host "第一次启动需要先准备学习助手运行文件。"
  Write-Host "正在自动安装，请保持这个窗口打开。"
  Write-Host ""
  & npm install
  if ($LASTEXITCODE -ne 0) {
    Stop-WithMessage @(
      "这次启动前的运行文件准备没有完成。",
      "请检查网络后重新双击 start.bat。"
    )
  }
  Write-Host ""
  Write-Host "运行文件已经准备好。"
  Write-Host ""
}

Write-Host "正在启动学习助手，并打开浏览器页面..."
Write-Host "请保留稍后出现的启动窗口。"
Write-Host ""

$devCommand = "cd /d `"$ProjectRoot`" && npm run dev"
Start-Process -FilePath "cmd.exe" -ArgumentList @("/k", $devCommand)
Start-Sleep -Seconds 3
Start-Process "http://localhost:3000"

Write-Host ""
Write-Host "浏览器已打开：http://localhost:3000"
Write-Host "若页面还在加载，请稍等几秒后刷新一次。"
Write-Host ""
Read-Host "请按回车键关闭这个提示窗口"
exit 0
