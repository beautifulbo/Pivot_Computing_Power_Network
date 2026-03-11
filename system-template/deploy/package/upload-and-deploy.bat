@echo off
echo ========================================
echo 正在上传文件到服务器...
echo ========================================

cd deploy\package

echo.
echo [1/2] 上传部署包...
scp -o StrictHostKeyChecking=no system-deploy.tar.gz ubuntu@82.157.104.186:/tmp/

echo.
echo [2/2] 上传部署脚本...
scp -o StrictHostKeyChecking=no deploy-remote.sh ubuntu@82.157.104.186:/tmp/

echo.
echo ========================================
echo 文件上传完成！
echo ========================================
echo.
echo 现在连接服务器执行部署...
echo 密码: 1234asdF
echo.

ssh -o StrictHostKeyChecking=no ubuntu@82.157.104.186 "cd /tmp && mkdir -p system-deploy && tar -xzf system-deploy.tar.gz -C system-deploy && chmod +x deploy-remote.sh && sudo bash deploy-remote.sh"

pause
