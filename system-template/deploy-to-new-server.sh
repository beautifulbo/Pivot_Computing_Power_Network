#!/bin/bash
# 部署到新服务器脚本
# 服务器: 144.7.14.212

set -e

echo "========================================="
echo "开始部署到新服务器: 144.7.14.212"
echo "========================================="

# 1. 安装Docker Compose
echo "步骤1: 安装Docker Compose..."
if ! command -v docker-compose &> /dev/null; then
    curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
    echo "Docker Compose安装成功"
else
    echo "Docker Compose已安装: $(docker-compose --version)"
fi

# 2. 创建部署目录
echo "步骤2: 创建部署目录..."
mkdir -p /opt/system-template/{mysql,redis,backend,frontend}
echo "部署目录创建成功: /opt/system-template"

# 3. 检查端口占用
echo "步骤3: 检查端口占用..."
netstat -tulpn | grep -E ":(8090|3307|6380)" || echo "端口未占用,可以使用"

echo "========================================="
echo "环境准备完成！"
echo "========================================="
