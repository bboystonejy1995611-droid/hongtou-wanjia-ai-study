@echo off
setlocal
chcp 65001 >nul
title 红头顽家 AI 学习助手 - 启动
pushd "%~dp0"

echo.
echo ============================================
echo   红头顽家 AI 学习助手 - 启动
echo ============================================
echo.

where node >nul 2>nul
if errorlevel 1 goto missing_node

where npm >nul 2>nul
if errorlevel 1 goto missing_node

echo 已找到 Node.js 运行环境。
echo 使用电脑端 AI 答疑时，请保持 Ollama 运行。
echo.

if not exist "node_modules\next\dist\bin\next" goto install_packages
goto launch_app

:install_packages
echo 第一次启动需要先准备学习助手运行文件。
echo 正在自动安装，请保持这个窗口打开。
echo.
call npm install
if errorlevel 1 goto install_failed
echo.
echo 运行文件已经准备好。
echo.

:launch_app
echo 正在启动学习助手，并打开浏览器页面...
echo 请保留稍后出现的启动窗口。
echo.
start "红头顽家 AI 学习助手" cmd /k "cd /d ""%~dp0"" && npm run dev"
timeout /t 3 >nul
start "" "http://localhost:3000"
echo.
echo 浏览器已打开：http://localhost:3000
echo 若页面还在加载，请稍等几秒后刷新一次。
echo.
pause
popd
exit /b 0

:missing_node
echo 当前电脑缺少 Node.js 运行环境，需要先安装 Node.js。
echo 请到下面的官网下载。
echo https://nodejs.org/en/download
echo.
echo 安装完成后，请重新双击 start.bat。
echo.
pause
popd
exit /b 1

:install_failed
echo.
echo 这次启动前的运行文件准备没有完成。
echo 请检查网络后重新双击 start.bat。
echo.
pause
popd
exit /b 1
