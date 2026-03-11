#!/bin/bash
# 服务器诊断和修复脚本

echo "=========================================="
echo "开始诊断系统..."
echo "=========================================="

# 1. 检查 Nginx 错误日志
echo -e "\n[1] Nginx 错误日志:"
tail -20 /var/log/nginx/system-template-error.log 2>/dev/null || echo "日志文件不存在"

# 2. 检查前端文件
echo -e "\n[2] 前端文件检查:"
if [ -f "/opt/system-template/frontend/dist/index.html" ]; then
    echo "✓ 前端文件存在"
    ls -lh /opt/system-template/frontend/dist/index.html
else
    echo "✗ 前端文件不存在"
fi

# 3. 检查后端服务
echo -e "\n[3] 后端服务状态:"
systemctl is-active system-backend 2>/dev/null || echo "后端服务未运行"

# 4. 测试后端连接
echo -e "\n[4] 后端连接测试:"
curl -s -o /dev/null -w "HTTP Code: %{http_code}\n" http://localhost:8090/ 2>/dev/null || echo "后端无法连接"

# 5. 检查 Docker
echo -e "\n[5] Docker 容器:"
docker ps 2>/dev/null | grep -E "mysql|redis" || echo "Docker 容器未运行"

# 6. 检查端口
echo -e "\n[6] 端口监听:"
netstat -tlnp 2>/dev/null | grep -E ":80|:8090|:3306|:6379" || ss -tlnp | grep -E ":80|:8090|:3306|:6379"

echo -e "\n=========================================="
echo "诊断完成"
echo "=========================================="
