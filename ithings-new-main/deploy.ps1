# 部署脚本
$SERVER = "ubuntu@82.157.104.186"
$REMOTE_PATH = "/home/ubuntu/ithings"
$LOCAL_DIST = "dist"

Write-Host "开始部署到服务器..." -ForegroundColor Green

# 使用 scp 上传 dist 目录
Write-Host "正在上传文件到服务器..." -ForegroundColor Yellow
scp -r $LOCAL_DIST/* ${SERVER}:${REMOTE_PATH}/

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ 文件上传成功！" -ForegroundColor Green
    Write-Host "✓ 项目已部署到: ${REMOTE_PATH}" -ForegroundColor Green
    Write-Host "✓ 访问地址: http://82.157.104.186:8080" -ForegroundColor Cyan
} else {
    Write-Host "✗ 部署失败，请检查网络连接和服务器配置" -ForegroundColor Red
}
