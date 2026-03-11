#!/bin/bash

###############################################################################
# 系统模板 - 服务器一键部署脚本
# 用途: 在 Ubuntu 服务器上自动部署整个系统
# 服务器: 82.157.104.186
###############################################################################

set -e

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

print_info() { echo -e "${GREEN}[INFO]${NC} $1"; }
print_warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
print_error() { echo -e "${RED}[ERROR]${NC} $1"; }

echo "========================================="
echo "系统模板 - 服务器自动部署"
echo "========================================="

# 创建部署目录
print_info "1. 创建部署目录..."
sudo mkdir -p /opt/system-template/{uploads,logs,frontend}
sudo chmod -R 755 /opt/system-template

# 更新系统
print_info "2. 更新系统软件包..."
sudo apt update

# 安装 Docker（如果未安装）
if ! command -v docker &> /dev/null; then
    print_info "3. 安装 Docker..."
    sudo apt install -y apt-transport-https ca-certificates curl software-properties-common
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    sudo systemctl enable docker
    sudo systemctl start docker
    rm get-docker.sh
else
    print_info "3. Docker 已安装，跳过..."
fi

# 安装 Docker Compose（如果未安装）
if ! command -v docker-compose &> /dev/null; then
    print_info "4. 安装 Docker Compose..."
    sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
else
    print_info "4. Docker Compose 已安装，跳过..."
fi

# 安装 Java 8
if ! command -v java &> /dev/null; then
    print_info "5. 安装 Java 8..."
    sudo apt install -y openjdk-8-jdk
else
    print_info "5. Java 已安装，跳过..."
fi

# 安装 Nginx
if ! command -v nginx &> /dev/null; then
    print_info "6. 安装 Nginx..."
    sudo apt install -y nginx
    sudo systemctl enable nginx
else
    print_info "6. Nginx 已安装，跳过..."
fi

# 启动 Docker 服务（MySQL + Redis）
print_info "7. 启动数据库服务..."
cd /opt/system-template
if [ -f "docker-compose.yml" ]; then
    sudo docker-compose up -d
    sleep 10  # 等待数据库启动
else
    print_error "docker-compose.yml 未找到！请先上传文件。"
    exit 1
fi

# 等待 MySQL 完全启动
print_info "8. 等待 MySQL 启动..."
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

# 导入数据库（如果数据库为空）
print_info "9. 检查并导入数据库..."
DB_EXISTS=$(sudo docker exec system-template-mysql mysql -uroot -proot123456 -e "SHOW TABLES FROM system_template;" 2>/dev/null | wc -l)
if [ "$DB_EXISTS" -lt 2 ]; then
    if [ -f "system-mysql8.sql" ]; then
        print_info "导入数据库..."
        sudo docker exec -i system-template-mysql mysql -uroot -proot123456 system_template < system-mysql8.sql
        print_info "数据库导入完成！"
    else
        print_warn "数据库 SQL 文件未找到，跳过导入。"
    fi
else
    print_info "数据库已有数据，跳过导入。"
fi

# 配置 Nginx
print_info "10. 配置 Nginx..."
if [ -f "system-template.conf" ]; then
    sudo cp system-template.conf /etc/nginx/sites-available/system-template
    sudo ln -sf /etc/nginx/sites-available/system-template /etc/nginx/sites-enabled/
    sudo rm -f /etc/nginx/sites-enabled/default
    sudo nginx -t && sudo systemctl reload nginx
    print_info "Nginx 配置完成！"
else
    print_warn "Nginx 配置文件未找到！"
fi

# 配置后端服务
print_info "11. 配置后端服务..."
if [ -f "system-backend.service" ]; then
    sudo cp system-backend.service /etc/systemd/system/
    sudo systemctl daemon-reload

    if [ -f "system-springboot.jar" ]; then
        sudo systemctl enable system-backend
        sudo systemctl restart system-backend
        print_info "后端服务已启动！"
    else
        print_warn "后端 JAR 包未找到，服务未启动。"
    fi
else
    print_warn "systemd 服务文件未找到！"
fi

# 部署前端
print_info "12. 部署前端..."
if [ -d "frontend/dist" ]; then
    sudo cp -r frontend/dist/* /opt/system-template/frontend/
    print_info "前端部署完成！"
elif [ -d "frontend" ] && [ -f "frontend/index.html" ]; then
    sudo cp -r frontend/* /opt/system-template/frontend/
    print_info "前端部署完成！"
else
    print_warn "前端文件未找到！"
fi

# 设置防火墙
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
echo "  查看 Nginx:   sudo systemctl status nginx"
echo ""
