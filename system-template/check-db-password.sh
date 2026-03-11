#!/bin/bash
# 服务器数据库密码检查脚本
# 使用方法：将此脚本上传到服务器并执行 bash check-db-password.sh

echo "========================================="
echo "检查 MySQL 和 Redis 配置"
echo "========================================="
echo ""

# 检查Docker是否运行
echo "1. 检查 Docker 服务状态..."
sudo systemctl status docker | grep Active
echo ""

# 查看运行中的容器
echo "2. 查看运行中的数据库容器..."
docker ps | grep -E "mysql|redis"
echo ""

# 检查MySQL容器配置
echo "3. 检查 MySQL 容器环境变量..."
if docker ps | grep -q "mysql"; then
    MYSQL_CONTAINER=$(docker ps | grep mysql | awk '{print $NF}')
    echo "MySQL容器名称: $MYSQL_CONTAINER"
    docker inspect $MYSQL_CONTAINER | grep -E "MYSQL_ROOT_PASSWORD|MYSQL_DATABASE"
else
    echo "未找到运行中的MySQL容器"
fi
echo ""

# 检查Redis容器配置
echo "4. 检查 Redis 容器配置..."
if docker ps | grep -q "redis"; then
    REDIS_CONTAINER=$(docker ps | grep redis | awk '{print $NF}')
    echo "Redis容器名称: $REDIS_CONTAINER"
    docker inspect $REDIS_CONTAINER | grep -A 5 "Cmd"
else
    echo "未找到运行中的Redis容器"
fi
echo ""

# 查找配置文件
echo "5. 查找项目配置文件..."
echo "查找 docker-compose.yml:"
find /opt /home -name "docker-compose.yml" 2>/dev/null | head -5
echo ""
echo "查找 application.yml:"
find /opt /home -name "application.yml" 2>/dev/null | head -5
echo ""

# 测试MySQL连接（使用默认密码）
echo "6. 尝试连接 MySQL (使用密码: root123456)..."
if docker ps | grep -q "mysql"; then
    docker exec -i $MYSQL_CONTAINER mysql -uroot -proot123456 -e "SELECT 'MySQL连接成功！' as status, VERSION() as version;" 2>/dev/null
    if [ $? -eq 0 ]; then
        echo "✓ MySQL密码正确: root123456"
    else
        echo "✗ MySQL密码不正确或连接失败"
    fi
else
    echo "MySQL容器未运行"
fi
echo ""

# 测试Redis连接
echo "7. 尝试连接 Redis..."
if docker ps | grep -q "redis"; then
    REDIS_RESPONSE=$(docker exec -i $REDIS_CONTAINER redis-cli ping 2>/dev/null)
    if [ "$REDIS_RESPONSE" = "PONG" ]; then
        echo "✓ Redis连接成功（无密码）"
    else
        echo "✗ Redis连接失败或需要密码"
    fi
else
    echo "Redis容器未运行"
fi
echo ""

echo "========================================="
echo "检查完成！"
echo "========================================="
