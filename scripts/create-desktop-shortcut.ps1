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

Write-Host ""
Write-Host "============================================"
Write-Host "  红头顽家 AI 学习助手 - 创建桌面图标"
Write-Host "============================================"
Write-Host ""

$target = Join-Path $ProjectRoot "start.bat"
$icon = Join-Path $ProjectRoot "public\icons\app-icon.ico"

if (-not (Test-Path $target)) {
  Stop-WithMessage @(
    "没有找到 start.bat。",
    "请确认这个文件和 start.bat 放在同一个文件夹里。"
  )
}

$desktop = [Environment]::GetFolderPath("Desktop")
$shortcutPath = Join-Path $desktop "红头顽家 AI 学习助手.lnk"
$shell = New-Object -ComObject WScript.Shell
$shortcut = $shell.CreateShortcut($shortcutPath)
$shortcut.TargetPath = $target
$shortcut.WorkingDirectory = $ProjectRoot
$shortcut.Description = "启动红头顽家 AI 学习助手"
if (Test-Path $icon) {
  $shortcut.IconLocation = $icon
} else {
  $shortcut.IconLocation = $target
}
$shortcut.Save()

Write-Host "桌面图标已经创建完成。"
Write-Host "以后可以双击桌面上的“红头顽家 AI 学习助手”启动。"
Write-Host ""
Read-Host "请按回车键关闭窗口"
exit 0
