#!/bin/bash

# iThings 项目部署脚本
# 服务器信息
SERVER_IP="82.157.104.186"
SERVER_USER="ubuntu"
SERVER_PASSWORD="1234asdf"
REMOTE_PATH="/var/www/ithings"
PORT="8080"

echo "=== iThings 项目部署到服务器 ==="
echo "服务器: $SERVER_IP"
echo "端口: $PORT"
echo ""

# 1. 在服务器上安装必要的软件
echo "步骤 1: 连接服务器并安装必要软件..."
sshpass -p "$SERVER_PASSWORD" ssh -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_IP << 'ENDSSH'
# 更新包管理器
sudo apt update

# 安装 nginx
if ! command -v nginx &> /dev/null; then
    echo "安装 nginx..."
    sudo apt install -y nginx
else
    echo "nginx 已安装"
fi

# 安装 Node.js 18 (LTS)
if ! command -v node &> /dev/null; then
    echo "安装 Node.js 18..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt install -y nodejs
else
    echo "Node.js 已安装: $(node --version)"
fi

# 创建项目目录
sudo mkdir -p /var/www/ithings
sudo chown -R ubuntu:ubuntu /var/www/ithings

echo "软件安装完成"
ENDSSH

# 2. 上传项目文件到服务器
echo ""
echo "步骤 2: 上传项目文件到服务器..."
sshpass -p "$SERVER_PASSWORD" rsync -avz --exclude 'node_modules' --exclude '.git' --exclude 'dist' --exclude '.umi' --exclude '.umi-production' -e "ssh -o StrictHostKeyChecking=no" ./ $SERVER_USER@$SERVER_IP:$REMOTE_PATH/

# 3. 在服务器上构建项目
echo ""
echo "步骤 3: 在服务器上构建项目..."
sshpass -p "$SERVER_PASSWORD" ssh -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_IP << 'ENDSSH'
cd /var/www/ithings

# 安装依赖
echo "安装项目依赖..."
npm install --legacy-peer-deps

# 构建项目
echo "构建生产版本..."
npm run build

echo "构建完成"
ENDSSH

# 4. 配置 nginx
echo ""
echo "步骤 4: 配置 nginx..."
sshpass -p "$SERVER_PASSWORD" ssh -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_IP << ENDSSH
# 创建 nginx 配置文件
sudo tee /etc/nginx/sites-available/ithings > /dev/null << 'EOF'
server {
    listen $PORT;
    server_name _;

    root /var/www/ithings/dist;
    index index.html;

    # 支持前端路由 (hash mode)
    location / {
        try_files \\\$uri \\\$uri/ /index.html;
    }

    # 静态资源缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Gzip 压缩
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
EOF

# 启用站点
sudo ln -sf /etc/nginx/sites-available/ithings /etc/nginx/sites-enabled/ithings

# 测试 nginx 配置
sudo nginx -t

# 重启 nginx
sudo systemctl restart nginx
sudo systemctl enable nginx

echo "nginx 配置完成"
ENDSSH

# 5. 检查防火墙
echo ""
echo "步骤 5: 配置防火墙..."
sshpass -p "$SERVER_PASSWORD" ssh -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_IP << ENDSSH
# 开放端口
sudo ufw allow $PORT/tcp
sudo ufw --force enable

echo "防火墙配置完成"
ENDSSH

echo ""
echo "=== 部署完成! ==="
echo ""
echo "访问地址: http://$SERVER_IP:$PORT"
echo ""
echo "常用命令:"
echo "  查看 nginx 状态: sudo systemctl status nginx"
echo "  重启 nginx: sudo systemctl restart nginx"
echo "  查看 nginx 日志: sudo tail -f /var/log/nginx/error.log"
