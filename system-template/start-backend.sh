#!/bin/bash
# 后端服务启动脚本

echo "==== 开始启动后端服务 ===="

# 1. 创建上传目录
echo "1. 创建上传目录 ..."
mkdir -p /opt/system-template/upload
chmod 755 /opt/system-template/upload
echo "✓ 上传目录创建完成"

# 2. 检查配置文件
echo "2. 检查配置文件 ..."
if [ ! -f /opt/system-template/backend/application.yml ]; then
    echo "✗ 配置文件不存在: /opt/system-template/backend/application.yml"
    exit 1
fi
echo "✓ 配置文件存在"

# 3. 检查JAR包
echo "3. 检查JAR包 ..."
if [ ! -f /opt/system-template/backend/system-springboot-1.0-SNAPSHOT.jar ]; then
    echo "✗ JAR包不存在"
    exit 1
fi
echo "✓ JAR包存在"

# 4. 检查是否已有进程在运行
echo "4. 检查现有进程 ..."
OLD_PID=$(ps aux | grep "system-springboot-1.0-SNAPSHOT.jar" | grep -v grep | awk '{print $2}')
if [ ! -z "$OLD_PID" ]; then
    echo "发现旧进程 PID: $OLD_PID, 正在停止..."
    kill -9 $OLD_PID
    sleep 2
    echo "✓ 旧进程已停止"
fi

# 5. 启动后端服务
echo "5. 启动后端服务 ..."
cd /opt/system-template/backend
nohup java -jar system-springboot-1.0-SNAPSHOT.jar --spring.config.location=./application.yml > app.log 2>&1 &
NEW_PID=$!
echo "✓ 后端服务已启动, PID: $NEW_PID"

# 6. 等待启动
echo "6. 等待服务启动 (10秒) ..."
sleep 10

# 7. 检查进程状态
if ps -p $NEW_PID > /dev/null; then
    echo "✓ 后端服务运行正常"
    echo ""
    echo "==== 启动完成 ===="
    echo "查看日志: tail -f /opt/system-template/backend/app.log"
    echo "访问地址: http://144.7.14.212:8090/doc.html"
else
    echo "✗ 后端服务启动失败,请查看日志:"
    echo "tail -100 /opt/system-template/backend/app.log"
    exit 1
fi
