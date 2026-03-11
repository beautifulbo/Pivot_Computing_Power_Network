@echo off
echo ========================================
echo    部署 WeBASE 嵌入方案
echo ========================================
echo.

cd system-vue
echo [1/4] 构建前端...
call npm run build
if errorlevel 1 (
    echo 构建失败！
    pause
    exit /b 1
)

echo.
echo [2/4] 打包文件...
tar -czf dist.tar.gz -C dist .

echo.
echo [3/4] 上传到服务器...
scp dist.tar.gz ubuntu@82.157.104.186:/tmp/frontend.tar.gz

echo.
echo [4/4] 部署到服务器...
ssh ubuntu@82.157.104.186 "sudo rm -rf /opt/system-template/frontend/* && sudo tar -xzf /tmp/frontend.tar.gz -C /opt/system-template/frontend"

echo.
echo ========================================
echo    部署完成！
echo    请访问: http://82.157.104.186
echo ========================================
pause
