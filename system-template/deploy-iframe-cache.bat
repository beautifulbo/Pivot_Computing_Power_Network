@echo off
REM Windows 部署脚本 - 生成部署说明文档

echo ========================================
echo iframe 缓存优化版本 - 部署说明
echo ========================================
echo.

echo 📦 已生成文件:
echo   - system-vue/dist-iframe-cache.tar.gz (前端构建产物)
echo   - deploy-iframe-cache.sh (Linux部署脚本)
echo.

echo 🚀 部署步骤:
echo.
echo 1. 将以下文件上传到服务器:
echo    scp system-vue/dist-iframe-cache.tar.gz root@82.157.104.186:/tmp/
echo    scp deploy-iframe-cache.sh root@82.157.104.186:/tmp/
echo.
echo 2. SSH 登录到服务器:
echo    ssh root@82.157.104.186
echo.
echo 3. 执行部署脚本:
echo    cd /tmp
echo    chmod +x deploy-iframe-cache.sh
echo    ./deploy-iframe-cache.sh
echo.
echo 4. 重启 Nginx (如果使用):
echo    nginx -s reload
echo.
echo ========================================
echo 💡 功能说明
echo ========================================
echo.
echo ✅ 已实现的优化:
echo   1. 所有模块页面使用 v-show 替代 v-if/v-else
echo   2. iframe 在后台持续加载，不会重新刷新
echo   3. 配合 keep-alive 实现组件缓存
echo   4. 添加 activated/deactivated 生命周期钩子
echo   5. 切换标签时保持 iframe 运行状态
echo.
echo 📋 涉及的文件:
echo   - system-vue/src/views/modules/WeBase.vue
echo   - system-vue/src/views/modules/ComputingTrade.vue
echo   - system-vue/src/views/modules/FederatedLearning.vue
echo   - system-vue/src/views/modules/PPIO.vue
echo   - system-vue/src/layout/AppMain.vue (已有keep-alive)
echo.
echo ========================================
echo.

pause
