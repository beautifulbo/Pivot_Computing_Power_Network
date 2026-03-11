@echo off
cd /d C:\nginx\nginx-1.29.3
start nginx.exe -c H:\project\system-template\nginx-https.conf
echo Nginx启动命令已执行
timeout /t 2
tasklist | findstr nginx
