@echo off
chcp 65001 >nul

echo ========================================
echo 测试 Nginx HTTPS 启动
echo ========================================
echo.

echo [1] 停止现有Nginx进程...
taskkill /F /IM nginx.exe 2>nul
timeout /t 2 >nul

echo [2] 测试配置文件...
C:\nginx\nginx-1.29.3\nginx.exe -t -c H:\project\system-template\nginx-https.conf
if %errorlevel% neq 0 (
    echo 配置文件测试失败！
    pause
    exit /b 1
)

echo.
echo [3] 启动 Nginx...
cd /d C:\nginx\nginx-1.29.3
start /B nginx.exe -c H:\project\system-template\nginx-https.conf

echo.
echo [4] 等待3秒...
timeout /t 3 >nul

echo.
echo [5] 检查Nginx进程...
tasklist | findstr nginx
if %errorlevel%==0 (
    echo.
    echo [成功] Nginx已启动！
    echo.
    echo 访问地址: https://localhost
) else (
    echo.
    echo [失败] Nginx未运行，请查看错误日志
    echo 日志位置: C:\nginx\nginx-1.29.3\logs\error.log
)

echo.
pause
