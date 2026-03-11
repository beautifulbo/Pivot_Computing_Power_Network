@echo off
REM 部署到新服务器: 144.7.14.212
REM 用户: root / Bailingyun

echo =========================================
echo 部署项目到新服务器
echo 服务器: 144.7.14.212
echo =========================================

echo.
echo 步骤1: 上传部署脚本...
scp deploy-to-new-server.sh root@144.7.14.212:/root/
scp docker-compose-new-server.yml root@144.7.14.212:/root/docker-compose.yml

echo.
echo 步骤2: 在服务器上执行部署脚本...
echo 请手动SSH登录服务器执行以下命令:
echo.
echo ssh root@144.7.14.212
echo bash /root/deploy-to-new-server.sh
echo.

pause
