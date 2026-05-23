@echo off
setlocal
title Hongtou Wanjia AI Study Assistant - Start
pushd "%~dp0"

powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\start-helper.ps1"
set "EXIT_CODE=%ERRORLEVEL%"

popd
exit /b %EXIT_CODE%
