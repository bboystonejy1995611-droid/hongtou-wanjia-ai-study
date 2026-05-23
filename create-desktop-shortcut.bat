@echo off
setlocal
title Hongtou Wanjia AI Study Assistant - Desktop Shortcut
pushd "%~dp0"

powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\create-desktop-shortcut.ps1"
set "EXIT_CODE=%ERRORLEVEL%"

popd
exit /b %EXIT_CODE%
