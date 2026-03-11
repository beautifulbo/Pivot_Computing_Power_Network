# PowerShell 脚本 - SSH 服务器诊断
# 使用方法: 右键 -> 使用 PowerShell 运行

$serverIP = "82.157.104.186"
$username = "ubuntu"
$password = "1234asdF."

Write-Host "=========================================="
Write-Host "连接到服务器进行诊断..."
Write-Host "=========================================="
Write-Host ""

# 诊断命令列表
$commands = @(
    "echo '=== 1. Nginx 错误日志 ==='",
    "sudo tail -30 /var/log/nginx/system-template-error.log",
    "echo ''",
    "echo '=== 2. 前端文件检查 ==='",
    "ls -la /opt/system-template/frontend/ 2>/dev/null || echo '前端目录不存在'",
    "echo ''",
    "echo '=== 3. 后端服务状态 ==='",
    "sudo systemctl status system-backend --no-pager",
    "echo ''",
    "echo '=== 4. 后端连接测试 ==='",
    "curl -s -o /dev/null -w 'HTTP Code: %{http_code}\n' http://localhost:8090/",
    "echo ''",
    "echo '=== 5. Docker 容器状态 ==='",
    "sudo docker ps",
    "echo ''",
    "echo '=== 6. 端口监听 ==='",
    "sudo netstat -tlnp | grep -E ':80|:8090|:3306|:6379'"
)

Write-Host "提示: 需要手动输入密码进行 SSH 登录"
Write-Host "密码: $password"
Write-Host ""

# 生成单行命令
$commandString = $commands -join "; "

# 执行 SSH
ssh "$username@$serverIP" "$commandString"

Write-Host ""
Write-Host "=========================================="
Write-Host "诊断完成"
Write-Host "=========================================="
Write-Host ""
Read-Host "按回车键退出"
