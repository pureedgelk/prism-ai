@echo off
chcp 65001 >nul
title Prism AI 日更工具
cd /d "%~dp0"

:menu
cls
echo ============================================
echo       Prism AI 棱镜 · 日更工具
echo ============================================
echo.
echo   [1] 新建提示词
echo   [2] 新建教程
echo   [3] 发布到线上（自动构建 + 提交 + 推送）
echo   [4] 退出
echo.
set /p choice=请输入数字后回车：

if "%choice%"=="1" goto newprompt
if "%choice%"=="2" goto newtutorial
if "%choice%"=="3" goto publish
if "%choice%"=="4" exit
goto menu

:newprompt
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0tools\daily.ps1" -Action new-prompt
pause
goto menu

:newtutorial
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0tools\daily.ps1" -Action new-tutorial
pause
goto menu

:publish
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0tools\daily.ps1" -Action publish
pause
goto menu