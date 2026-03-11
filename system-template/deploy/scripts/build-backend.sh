#!/bin/bash

###############################################################################
# 系统模板 - 后端构建和打包脚本
# 用途: 在本地构建 SpringBoot JAR 包
###############################################################################

set -e

echo "========================================="
echo "开始构建后端 JAR 包..."
echo "========================================="

# 进入后端目录
cd "$(dirname "$0")/../../system-springboot"

echo "1. 清理之前的构建..."
mvn clean

echo "2. 开始 Maven 打包（跳过测试）..."
mvn package -DskipTests

echo "3. 复制 JAR 包到部署目录..."
mkdir -p ../deploy/build
cp target/*.jar ../deploy/build/system-springboot.jar

echo "========================================="
echo "后端构建完成！"
echo "JAR 包位置: deploy/build/system-springboot.jar"
echo "========================================="
