@echo off
echo ====================================
echo 部署 Vuex 状态管理修复版本
echo ====================================

cd system-vue

echo.
echo [1/4] 上传文件到服务器...
scp dist-vuex-state.tar.gz root@82.157.104.186:/opt/system-template/

echo.
echo [2/4] SSH 连接服务器并部署...
ssh root@82.157.104.186 "cd /opt/system-template && mv frontend frontend-backup-$(date +%%Y%%m%%d-%%H%%M%%S) 2>/dev/null; tar -xzf dist-vuex-state.tar.gz && mv dist frontend && echo '部署完成!'"

echo.
echo ====================================
echo 部署完成! 请清除浏览器缓存后测试
echo ====================================
echo.
echo 测试步骤:
echo 1. 打开浏览器开发者工具 (F12)
echo 2. 清除 Local Storage 和 Session Storage
echo 3. 硬刷新页面 (Ctrl+Shift+R)
echo 4. 登录后测试标签切换
echo.
pause
