#!/bin/bash

# 部署脚本 - 自动上传并部署到服务器
# 服务器: ubuntu@82.157.104.186
# 密码: 1234asdF

set -e

SERVER="82.157.104.186"
USER="ubuntu"
PASSWORD="1234asdF"

echo "========================================"
echo "准备部署到服务器 $SERVER"
echo "========================================"
echo ""

# 上传压缩包
echo "[1/3] 上传部署文件..."
scp -o StrictHostKeyChecking=no deploy/package/system-deploy.tar.gz $USER@$SERVER:/tmp/

# 上传部署脚本
echo "[2/3] 上传部署脚本..."
scp -o StrictHostKeyChecking=no deploy/package/deploy-remote.sh $USER@$SERVER:/tmp/

# 执行远程部署
echo "[3/3] 执行远程部署..."
ssh -o StrictHostKeyChecking=no $USER@$SERVER << 'ENDSSH'
cd /tmp
mkdir -p system-deploy
tar -xzf system-deploy.tar.gz -C system-deploy
chmod +x deploy-remote.sh
echo "1234asdF" | sudo -S bash deploy-remote.sh
ENDSSH

echo ""
echo "========================================"
echo "部署完成！"
echo "========================================"
echo "访问地址: http://$SERVER"
echo "默认账号: admin / 123456"
