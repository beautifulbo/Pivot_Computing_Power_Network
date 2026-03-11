#!/bin/bash
# 数据库部署脚本

echo "==== 开始部署数据库 ===="

# 检测MySQL命令路径
if command -v mysql &> /dev/null; then
    MYSQL_CMD="mysql"
elif [ -f /usr/local/mysql/bin/mysql ]; then
    MYSQL_CMD="/usr/local/mysql/bin/mysql"
else
    echo "错误: 找不到MySQL命令"
    exit 1
fi

echo "使用MySQL命令: $MYSQL_CMD"

# 数据库连接参数
DB_HOST="127.0.0.1"
DB_PORT="3306"
DB_USER="root"
DB_PASS="111111"
DB_NAME="system_template"

# 1. 创建数据库
echo "1. 创建数据库 $DB_NAME ..."
$MYSQL_CMD -h$DB_HOST -P$DB_PORT -u$DB_USER -p$DB_PASS -e "CREATE DATABASE IF NOT EXISTS $DB_NAME CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;" 2>&1
if [ $? -eq 0 ]; then
    echo "✓ 数据库创建成功"
else
    echo "✗ 数据库创建失败"
    exit 1
fi

# 2. 验证数据库
echo "2. 验证数据库 ..."
$MYSQL_CMD -h$DB_HOST -P$DB_PORT -u$DB_USER -p$DB_PASS -e "SHOW DATABASES LIKE '$DB_NAME';" 2>&1

# 3. 导入SQL文件
echo "3. 导入数据库结构 ..."
if [ -f /opt/system-template/mysql/init/system-mysql8.sql ]; then
    $MYSQL_CMD -h$DB_HOST -P$DB_PORT -u$DB_USER -p$DB_PASS $DB_NAME < /opt/system-template/mysql/init/system-mysql8.sql 2>&1
    if [ $? -eq 0 ]; then
        echo "✓ 数据库导入成功"
    else
        echo "✗ 数据库导入失败"
        exit 1
    fi
else
    echo "✗ SQL文件不存在: /opt/system-template/mysql/init/system-mysql8.sql"
    exit 1
fi

# 4. 验证表
echo "4. 验证数据表 ..."
$MYSQL_CMD -h$DB_HOST -P$DB_PORT -u$DB_USER -p$DB_PASS $DB_NAME -e "SHOW TABLES;" 2>&1

echo "==== 数据库部署完成 ===="
