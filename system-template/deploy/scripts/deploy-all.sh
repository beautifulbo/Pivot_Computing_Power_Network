#!/bin/bash

###############################################################################
# 系统模板 - 本地一键部署脚本（Windows Git Bash / WSL）
# 用途: 在本地执行，自动构建并上传到服务器
###############################################################################

set -e

# 服务器配置
SERVER_IP="82.157.104.186"
SERVER_USER="ubuntu"
SERVER_PASS="1234asdF"
REMOTE_PATH="/opt/system-template"

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

print_info() { echo -e "${GREEN}[INFO]${NC} $1"; }
print_warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
print_error() { echo -e "${RED}[ERROR]${NC} $1"; }

echo "========================================="
echo "系统模板 - 自动构建和部署"
echo "目标服务器: $SERVER_IP"
echo "========================================="

# 检查 sshpass
if ! command -v sshpass &> /dev/null; then
    print_warn "sshpass 未安装，将使用交互式 SSH（需要手动输入密码）"
    SSH_CMD="ssh"
    SCP_CMD="scp"
else
    SSH_CMD="sshpass -p '$SERVER_PASS' ssh -o StrictHostKeyChecking=no"
    SCP_CMD="sshpass -p '$SERVER_PASS' scp -o StrictHostKeyChecking=no"
fi

# 步骤 1: 构建后端
print_info "步骤 1/5: 构建后端..."
cd "$(dirname "$0")/../.."
bash deploy/scripts/build-backend.sh

# 步骤 2: 构建前端
print_info "步骤 2/5: 构建前端..."
bash deploy/scripts/build-frontend.sh

# 步骤 3: 创建部署包
print_info "步骤 3/5: 创建部署包..."
cd deploy
mkdir -p build/deploy-package
cp build/system-springboot.jar build/deploy-package/
cp -r build/frontend build/deploy-package/
cp config/application-prod.yml build/deploy-package/
cp nginx/system-template.conf build/deploy-package/
cp systemd/system-backend.service build/deploy-package/
cp scripts/server-deploy.sh build/deploy-package/
cp ../docker-compose.yml build/deploy-package/
cp ../system-mysql8.sql build/deploy-package/

print_info "创建部署压缩包..."
cd build
tar -czf deploy-package.tar.gz deploy-package/
cd ../..

# 步骤 4: 上传到服务器
print_info "步骤 4/5: 上传到服务器..."
print_info "正在上传文件（约需 1-3 分钟）..."

if command -v sshpass &> /dev/null; then
    sshpass -p "$SERVER_PASS" scp -o StrictHostKeyChecking=no \
        deploy/build/deploy-package.tar.gz \
        ${SERVER_USER}@${SERVER_IP}:/tmp/
else
    print_warn "请输入服务器密码: $SERVER_PASS"
    scp deploy/build/deploy-package.tar.gz \
        ${SERVER_USER}@${SERVER_IP}:/tmp/
fi

# 步骤 5: 在服务器上执行部署
print_info "步骤 5/5: 在服务器上执行部署..."

REMOTE_COMMANDS="
    set -e
    cd /tmp
    tar -xzf deploy-package.tar.gz
    cd deploy-package
    sudo mv * /opt/system-template/ 2>/dev/null || sudo cp -r * /opt/system-template/
    cd /opt/system-template
    sudo chmod +x server-deploy.sh
    sudo bash server-deploy.sh
"

if command -v sshpass &> /dev/null; then
    sshpass -p "$SERVER_PASS" ssh -o StrictHostKeyChecking=no \
        ${SERVER_USER}@${SERVER_IP} "$REMOTE_COMMANDS"
else
    print_warn "请输入服务器密码: $SERVER_PASS"
    ssh ${SERVER_USER}@${SERVER_IP} "$REMOTE_COMMANDS"
fi

echo ""
echo "========================================="
echo -e "${GREEN}部署成功！${NC}"
echo "========================================="
echo ""
echo "访问地址: http://$SERVER_IP"
echo "Swagger 文档: http://$SERVER_IP/api/doc.html"
echo ""
echo "默认账号:"
echo "  管理员: admin / 123456"
echo "  测试用户: test / 1234567"
echo ""
echo "管理命令:"
echo "  SSH 登录: ssh ${SERVER_USER}@${SERVER_IP}"
echo "  查看后端日志: ssh ${SERVER_USER}@${SERVER_IP} 'sudo journalctl -u system-backend -f'"
echo "  重启后端: ssh ${SERVER_USER}@${SERVER_IP} 'sudo systemctl restart system-backend'"
echo ""
