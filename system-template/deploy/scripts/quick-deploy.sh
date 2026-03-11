#!/bin/bash
# 简化部署脚本 - Ubuntu 22 + Docker 已安装

echo "========================================="
echo "开始部署..."
echo "========================================="

cd /opt/system-template

echo "[1/8] 启动 Docker 服务..."
sudo systemctl start docker
sudo systemctl enable docker

echo "[2/8] 启动数据库容器..."
sudo docker-compose down 2>/dev/null || true
sudo docker-compose up -d

echo "[3/8] 等待 MySQL 启动..."
sleep 20

echo "[4/8] 导入数据库..."
sudo docker exec -i system-template-mysql mysql -uroot -proot123456 system_template < system-mysql8.sql

echo "[5/8] 配置 Nginx..."
sudo cp system-template.conf /etc/nginx/sites-available/
sudo ln -sf /etc/nginx/sites-available/system-template /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx

echo "[6/8] 部署前端..."
sudo mkdir -p /opt/system-template/frontend
sudo cp -r frontend/* /opt/system-template/frontend/

echo "[7/8] 配置后端服务..."
sudo cp system-backend.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable system-backend
sudo systemctl start system-backend

echo "[8/8] 检查服务状态..."
sleep 5
echo ""
echo "Docker 容器:"
sudo docker ps
echo ""
echo "后端服务:"
sudo systemctl status system-backend --no-pager -l

echo ""
echo "========================================="
echo "部署完成！"
echo "========================================="
echo "访问地址: http://82.157.104.186"
echo "默认账号: admin / 123456"
echo ""
