# PowerShell 一键上传和部署脚本
# 使用说明: 右键点击此文件，选择"使用 PowerShell 运行"

$SERVER_IP = "82.157.104.186"
$SERVER_USER = "ubuntu"
$SERVER_PASS = "1234asdF."

Write-Host "=========================================" -ForegroundColor Green
Write-Host "云边端协同AI平台 - 自动部署工具" -ForegroundColor Green
Write-Host "目标服务器: $SERVER_IP" -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Green
Write-Host ""

# 检查部署包
$packagePath = "deploy\build\package"
if (-not (Test-Path $packagePath)) {
    Write-Host "[错误] 部署包不存在！请先运行构建脚本。" -ForegroundColor Red
    Read-Host "按回车键退出"
    exit 1
}

Write-Host "[1/4] 压缩部署包..." -ForegroundColor Yellow
$zipFile = "deploy\build\deploy-package.zip"
if (Test-Path $zipFile) {
    Remove-Item $zipFile -Force
}

# 压缩文件
Compress-Archive -Path "$packagePath\*" -DestinationPath $zipFile -Force
Write-Host "    ✓ 压缩完成" -ForegroundColor Green

Write-Host "[2/4] 上传文件到服务器..." -ForegroundColor Yellow
Write-Host "    提示: 请在弹出的窗口中输入密码: $SERVER_PASS" -ForegroundColor Cyan

# 使用 SCP 上传（需要输入密码）
$scpResult = scp $zipFile "${SERVER_USER}@${SERVER_IP}:/tmp/" 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "    ✗ 上传失败！" -ForegroundColor Red
    Write-Host "    错误信息: $scpResult" -ForegroundColor Red
    Write-Host ""
    Write-Host "解决方案:" -ForegroundColor Yellow
    Write-Host "1. 请使用 WinSCP 手动上传文件（见 QUICK-START.md）" -ForegroundColor Yellow
    Write-Host "2. 或安装 plink.exe 以支持自动输入密码" -ForegroundColor Yellow
    Read-Host "按回车键退出"
    exit 1
}

Write-Host "    ✓ 上传完成" -ForegroundColor Green

Write-Host "[3/4] 连接服务器..." -ForegroundColor Yellow
Write-Host "    提示: 请再次输入密码: $SERVER_PASS" -ForegroundColor Cyan

# SSH 执行部署命令
$deployCommands = @"
set -e
cd /tmp
echo '解压部署包...'
unzip -o deploy-package.zip -d /tmp/package_temp
echo '创建部署目录...'
sudo mkdir -p /opt/system-template
echo '移动文件到部署目录...'
sudo cp -r /tmp/package_temp/* /opt/system-template/
cd /opt/system-template
echo '设置执行权限...'
sudo chmod +x server-deploy.sh
echo '开始部署...'
sudo bash server-deploy.sh
"@

ssh "${SERVER_USER}@${SERVER_IP}" $deployCommands

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "=========================================" -ForegroundColor Green
    Write-Host "部署成功！" -ForegroundColor Green
    Write-Host "=========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "访问地址: http://$SERVER_IP" -ForegroundColor Cyan
    Write-Host "API文档: http://$SERVER_IP/api/doc.html" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "默认账号:" -ForegroundColor Yellow
    Write-Host "  管理员: admin / 123456"
    Write-Host "  测试用户: test / 1234567"
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "部署过程中出现错误！" -ForegroundColor Red
    Write-Host "请查看上方日志获取详细信息。" -ForegroundColor Yellow
}

Write-Host ""
Read-Host "按回车键退出"
