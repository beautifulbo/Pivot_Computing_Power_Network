@echo off
echo 正在重启Nginx HTTPS服务...
echo.

REM 停止Nginx
taskkill /F /IM nginx.exe 2>nul
timeout /t 2 >nul

REM 启动Nginx
cd /d C:\nginx\nginx-1.29.3
start /B nginx.exe -c H:\project\system-template\nginx-https.conf

REM 等待启动
timeout /t 3 >nul

echo.
echo Nginx已重启！
echo.
echo 测试访问:
curl -I https://localhost/webase/ -k 2>&1 | findstr HTTP

echo.
pause
