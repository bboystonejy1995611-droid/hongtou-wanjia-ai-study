@echo off
setlocal
chcp 65001 >nul
title 红头顽家 AI 学习助手 - 创建桌面图标
pushd "%~dp0"

echo.
echo ============================================
echo   红头顽家 AI 学习助手 - 创建桌面图标
echo ============================================
echo.

if not exist "start.bat" goto missing_start

set "APP_TARGET=%~dp0start.bat"
set "APP_ICON=%~dp0public\icons\app-icon.ico"

powershell -NoProfile -ExecutionPolicy Bypass -Command "$desktop=[Environment]::GetFolderPath('Desktop'); $shortcut=Join-Path $desktop '红头顽家 AI 学习助手.lnk'; $shell=New-Object -ComObject WScript.Shell; $link=$shell.CreateShortcut($shortcut); $link.TargetPath=$env:APP_TARGET; $link.WorkingDirectory=(Split-Path -Parent $env:APP_TARGET); $link.Description='启动红头顽家 AI 学习助手'; if (Test-Path $env:APP_ICON) { $link.IconLocation=$env:APP_ICON } else { $link.IconLocation=$env:APP_TARGET }; $link.Save()"

if errorlevel 1 goto shortcut_failed

echo 桌面图标已经创建完成。
echo 以后可以双击桌面上的“红头顽家 AI 学习助手”启动。
echo.
pause
popd
exit /b 0

:missing_start
echo 没有找到 start.bat。
echo 请确认这个文件和 start.bat 放在同一个文件夹里。
echo.
pause
popd
exit /b 1

:shortcut_failed
echo 桌面图标创建失败。
echo 可以先直接双击 start.bat 启动学习助手。
echo.
pause
popd
exit /b 1
