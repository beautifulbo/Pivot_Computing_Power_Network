#!/bin/bash

###############################################################################
# 远程部署脚本
###############################################################################

set -e

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

print_info() { echo -e "${GREEN}[INFO]${NC} $1"; }
print_warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
print_error() { echo -e "${RED}[ERROR]${NC} $1"; }

echo "========================================="
echo "系统模板 - 远程部署脚本"
echo "========================================="

# 创建部署目录
print_info "1. 创建部署目录..."
sudo mkdir -p /opt/system-template/{uploads,logs,frontend}
sudo chmod -R 755 /opt/system-template

# 复制文件
print_info "2. 复制部署文件..."
cd /tmp/system-deploy
sudo cp system-springboot.jar /opt/system-template/
sudo cp docker-compose.yml /opt/system-template/
sudo cp system-mysql8-new.sql /opt/system-template/system-mysql8.sql
sudo cp -r frontend/* /opt/system-template/frontend/

# 更新系统
print_info "3. 更新系统..."
sudo apt update

# 安装 Docker
if ! command -v docker &> /dev/null; then
    print_info "4. 安装 Docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    sudo systemctl enable docker
    sudo systemctl start docker
    rm get-docker.sh
else
    print_info "4. Docker 已安装，跳过..."
fi

# 安装 Docker Compose
if ! command -v docker-compose &> /dev/null; then
    print_info "5. 安装 Docker Compose..."
    sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
else
    print_info "5. Docker Compose 已安装，跳过..."
fi

# 安装 Java 8
if ! command -v java &> /dev/null; then
    print_info "6. 安装 Java 8..."
    sudo apt install -y openjdk-8-jdk
else
    print_info "6. Java 已安装，跳过..."
fi

# 安装 Nginx
if ! command -v nginx &> /dev/null; then
    print_info "7. 安装 Nginx..."
    sudo apt install -y nginx
    sudo systemctl enable nginx
else
    print_info "7. Nginx 已安装，跳过..."
fi

# 启动 Docker 服务
print_info "8. 启动数据库服务..."
cd /opt/system-template
sudo docker-compose down 2>/dev/null || true
sudo docker-compose up -d

# 等待 MySQL 启动
print_info "9. 等待 MySQL 启动..."
for i in {1..30}; do
    if sudo docker exec system-template-mysql mysql -uroot -proot123456 -e "SELECT 1" &> /dev/null; then
        print_info "MySQL 启动成功！"
        break
    fi
    if [ $i -eq 30 ]; then
        print_error "MySQL 启动超时！"
        exit 1
    fi
    sleep 2
done

# 导入数据库
print_info "10. 检查并导入数据库..."
DB_EXISTS=$(sudo docker exec system-template-mysql mysql -uroot -proot123456 -e "SHOW TABLES FROM system_template;" 2>/dev/null | wc -l)
if [ "$DB_EXISTS" -lt 2 ]; then
    print_info "导入数据库..."
    sudo docker exec -i system-template-mysql mysql -uroot -proot123456 system_template < /opt/system-template/system-mysql8.sql
    print_info "数据库导入完成！"
else
    print_info "数据库已有数据，跳过导入。"
fi

# 配置 Nginx
print_info "11. 配置 Nginx..."
sudo tee /etc/nginx/sites-available/system-template > /dev/null <<'EOF'
server {
    listen 80;
    server_name _;

    # 前端静态文件
    location / {
        root /opt/system-template/frontend;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    # 后端API代理
    location /api {
        proxy_pass http://localhost:8090;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # 文件上传路径
    location /upload {
        alias /opt/system-template/uploads;
    }
}
EOF

sudo ln -sf /etc/nginx/sites-available/system-template /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx
print_info "Nginx 配置完成！"

# 配置后端服务
print_info "12. 配置后端服务..."
sudo tee /etc/systemd/system/system-backend.service > /dev/null <<'EOF'
[Unit]
Description=System Template Backend Service
After=network.target docker.service

[Service]
Type=simple
User=root
WorkingDirectory=/opt/system-template
ExecStart=/usr/bin/java -jar /opt/system-template/system-springboot.jar --spring.profiles.active=prod
Restart=on-failure
RestartSec=10
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable system-backend
sudo systemctl restart system-backend
print_info "后端服务已启动！"

# 配置防火墙
print_info "13. 配置防火墙..."
sudo ufw allow 80/tcp 2>/dev/null || true
sudo ufw allow 443/tcp 2>/dev/null || true
sudo ufw allow 22/tcp 2>/dev/null || true

echo ""
echo "========================================="
echo -e "${GREEN}部署完成！${NC}"
echo "========================================="
echo ""
echo "访问地址: http://82.157.104.186"
echo "默认账号: admin / 123456"
echo ""
echo "常用命令:"
echo "  查看后端状态: sudo systemctl status system-backend"
echo "  查看后端日志: sudo journalctl -u system-backend -f"
echo "  重启后端:     sudo systemctl restart system-backend"
echo "  查看 Docker:  sudo docker ps"
echo ""
