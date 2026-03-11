@echo off
chcp 65001 >nul
echo ========================================
echo 重启Nginx HTTPS服务
echo ========================================
echo.

echo [1/4] 停止所有Nginx进程...
taskkill /F /IM nginx.exe 2>nul
if %errorlevel%==0 (
    echo 已停止Nginx
) else (
    echo Nginx未运行
)

timeout /t 2 >nul
echo.

echo [2/4] 测试配置文件...
C:\nginx\nginx-1.29.3\nginx.exe -t -c H:\project\system-template\nginx-https.conf
if %errorlevel% neq 0 (
    echo 配置文件有错误！
    pause
    exit /b 1
)
echo 配置文件正确
echo.

echo [3/4] 启动Nginx...
cd /d C:\nginx\nginx-1.29.3
start nginx.exe -c H:\project\system-template\nginx-https.conf

timeout /t 3 >nul
echo.

echo [4/4] 验证Nginx进程...
tasklist | findstr nginx
if %errorlevel%==0 (
    echo.
    echo ========================================
    echo 成功！Nginx已启动
    echo ========================================
    echo.
    echo 访问地址:
    echo   - 主应用: https://localhost
    echo   - WeBase: https://localhost/webase/
    echo.
) else (
    echo.
    echo 启动失败！
)

pause
