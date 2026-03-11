@echo off
chcp 65001 >nul
echo ========================================
echo 自动连接服务器并部署
echo ========================================
echo.

ssh ubuntu@82.157.104.186 "cd /opt/system-template && sudo apt update && sudo apt install -y dos2unix && sudo dos2unix server-deploy.sh && sudo chmod +x server-deploy.sh && sudo bash server-deploy.sh"

echo.
echo ========================================
echo 部署完成！
echo ========================================
echo 访问地址: http://82.157.104.186
echo 默认账号: admin / 123456
echo.
pause
