@echo off
chcp 65001 >nul
REM ===============================================
REM Nginx HTTPS 服务启动脚本
REM 用于启动支持HTTPS的Nginx服务器
REM ===============================================

echo.
echo ========================================
echo   Nginx HTTPS 服务管理
echo ========================================
echo.

REM Nginx 安装路径（请根据实际情况修改）
set NGINX_PATH=C:\nginx\nginx-1.29.3
set NGINX_EXE=%NGINX_PATH%\nginx.exe
set NGINX_CONF=H:\project\system-template\nginx-https.conf

REM 检查Nginx是否已安装
if not exist "%NGINX_EXE%" (
    echo [错误] 找不到 Nginx 执行文件: %NGINX_EXE%
    echo 请检查 NGINX_PATH 变量是否正确
    pause
    exit /b 1
)

REM 检查配置文件是否存在
if not exist "%NGINX_CONF%" (
    echo [错误] 找不到配置文件: %NGINX_CONF%
    pause
    exit /b 1
)

:menu
cls
echo.
echo ========================================
echo   Nginx HTTPS 服务管理
echo ========================================
echo.
echo 请选择操作:
echo.
echo 1. 启动 Nginx HTTPS 服务
echo 2. 重载 Nginx 配置
echo 3. 停止 Nginx 服务
echo 4. 测试配置文件
echo 5. 查看 Nginx 进程
echo 0. 退出
echo.

set /p choice=请输入选项 (0-5):

if "%choice%"=="1" goto start
if "%choice%"=="2" goto reload
if "%choice%"=="3" goto stop
if "%choice%"=="4" goto test
if "%choice%"=="5" goto status
if "%choice%"=="0" goto end

echo.
echo [错误] 无效的选项，请输入 0-5 之间的数字
echo.
pause
goto menu

:start
echo.
echo ========================================
echo [启动] 正在启动 Nginx HTTPS 服务...
echo ========================================
echo.
echo 配置文件: %NGINX_CONF%
echo.
"%NGINX_EXE%" -c "%NGINX_CONF%"
if %errorlevel%==0 (
    echo.
    echo [成功] Nginx 已启动
    echo.
    echo 访问地址:
    echo   - HTTP:  http://localhost  ^(自动重定向到HTTPS^)
    echo   - HTTPS: https://localhost
    echo.
    echo 注意: 首次访问时浏览器会警告证书不受信任，
    echo       请选择"高级" -^> "继续访问localhost"
) else (
    echo.
    echo [失败] Nginx 启动失败，请检查错误日志
    echo 错误日志位置: %NGINX_PATH%\logs\error.log
)
echo.
pause
goto menu

:reload
echo.
echo ========================================
echo [重载] 正在重载 Nginx 配置...
echo ========================================
echo.
echo 注意: 使用自定义配置文件需要重启Nginx
echo       重载命令不支持指定配置文件
echo.
echo 正在停止当前Nginx...
"%NGINX_EXE%" -s stop
timeout /t 2 >nul
echo.
echo 正在启动Nginx（使用新配置）...
"%NGINX_EXE%" -c "%NGINX_CONF%"
if %errorlevel%==0 (
    echo [成功] Nginx已使用新配置重启
) else (
    echo [失败] Nginx重启失败
)
echo.
pause
goto menu

:stop
echo.
echo ========================================
echo [停止] 正在停止 Nginx 服务...
echo ========================================
echo.
"%NGINX_EXE%" -s stop
timeout /t 2 >nul
tasklist /FI "IMAGENAME eq nginx.exe" 2>nul | find /I "nginx.exe" >nul
if %errorlevel%==0 (
    echo [提示] 正常停止失败，尝试强制结束...
    taskkill /F /IM nginx.exe >nul 2>&1
    echo [成功] Nginx 已强制停止
) else (
    echo [成功] Nginx 已停止
)
echo.
pause
goto menu

:test
echo.
echo ========================================
echo [测试] 正在测试配置文件...
echo ========================================
echo.
"%NGINX_EXE%" -t -c "%NGINX_CONF%"
echo.
pause
goto menu

:status
echo.
echo ========================================
echo [状态] Nginx 进程列表:
echo ========================================
echo.
tasklist /FI "IMAGENAME eq nginx.exe"
if %errorlevel%==1 (
    echo.
    echo [提示] Nginx 未运行
)
echo.
pause
goto menu

:end
echo.
echo 再见！
timeout /t 1 >nul
exit /b 0
