@echo off
setlocal
chcp 65001 >nul
title 红头顽家 AI 学习助手 - 电脑端 AI 准备

echo.
echo ============================================
echo   红头顽家 AI 学习助手 - 电脑端 AI 准备
echo ============================================
echo.
echo 这一步会检查 Ollama，并准备普通家庭电脑优先使用的轻量模型。
echo.

where ollama >nul 2>nul
if errorlevel 1 goto missing_ollama

echo 已找到 Ollama，正在检查轻量模型 qwen3:1.7b...
echo.
ollama list | findstr /I /C:"qwen3:1.7b" >nul
if errorlevel 1 goto pull_model

echo 您的电脑已经有 qwen3:1.7b 轻量模型。
goto ready

:pull_model
echo 第一次使用需要下载 qwen3:1.7b，时间会随网络和电脑情况变化。
echo 现在开始下载，请保持这个窗口打开。
echo.
ollama pull qwen3:1.7b
if errorlevel 1 goto pull_failed
echo.
echo 轻量模型已经下载完成。
goto ready

:missing_ollama
echo 当前电脑还没有安装 Ollama。
echo 请到下面的官网下载并安装。
echo https://ollama.com/download/windows
echo.
echo 安装完成后，请重新双击 install.bat。
echo.
pause
exit /b 1

:pull_failed
echo.
echo 这次模型下载没有完成。
echo 请先确认网络正常，并让 Ollama 保持运行，然后重新双击 install.bat。
echo.
pause
exit /b 1

:ready
echo.
echo 电脑端 AI 已准备好。
echo 下一步请双击 start.bat，启动学习助手。
echo 使用电脑端 AI 答疑时，请保持 Ollama 运行。
echo.
pause
exit /b 0
