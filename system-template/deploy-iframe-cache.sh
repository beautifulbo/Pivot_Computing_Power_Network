#!/bin/bash
# 部署iframe缓存优化的前端到服务器
# 使用方法：将此脚本和 system-vue/dist-iframe-cache.tar.gz 上传到服务器后执行

echo "========================================"
echo "部署 iframe 缓存优化版本前端"
echo "========================================"

# 服务器路径
DEPLOY_DIR="/opt/system-template"
FRONTEND_DIR="$DEPLOY_DIR/frontend"
BACKUP_DIR="$DEPLOY_DIR/backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

# 创建备份目录
echo "📁 创建备份目录..."
mkdir -p $BACKUP_DIR

# 备份当前前端文件
if [ -d "$FRONTEND_DIR" ]; then
    echo "💾 备份当前前端文件..."
    tar -czf "$BACKUP_DIR/frontend_backup_$TIMESTAMP.tar.gz" -C "$DEPLOY_DIR" frontend/
    echo "✅ 备份完成: $BACKUP_DIR/frontend_backup_$TIMESTAMP.tar.gz"
fi

# 解压新的前端文件
echo "📦 解压新的前端文件..."
cd /tmp
tar -xzf dist-iframe-cache.tar.gz

# 删除旧的前端文件
if [ -d "$FRONTEND_DIR" ]; then
    echo "🗑️  删除旧的前端文件..."
    rm -rf $FRONTEND_DIR
fi

# 移动新文件到部署目录
echo "📂 部署新的前端文件..."
mv dist $FRONTEND_DIR

# 设置权限
echo "🔐 设置文件权限..."
chown -R root:root $FRONTEND_DIR
chmod -R 755 $FRONTEND_DIR

# 清理临时文件
echo "🧹 清理临时文件..."
rm -f /tmp/dist-iframe-cache.tar.gz

echo ""
echo "========================================"
echo "✅ 部署完成！"
echo "========================================"
echo "前端目录: $FRONTEND_DIR"
echo "备份位置: $BACKUP_DIR/frontend_backup_$TIMESTAMP.tar.gz"
echo ""
echo "请访问: http://82.157.104.186:8090 测试功能"
echo ""
echo "重要提示："
echo "1. 所有 iframe 页面现在使用 v-show 而不是 v-if"
echo "2. 切换标签时 iframe 会在后台持续加载，不会重新刷新"
echo "3. 配合 keep-alive 组件缓存机制，实现完美的多标签体验"
echo ""
