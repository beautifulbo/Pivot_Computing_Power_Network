# Windows 部署快速指南

由于您使用的是 Windows 系统，这里提供 Windows 友好的部署方式。

---

## 方式一：使用 Git Bash（推荐）

### 1. 安装必要工具

- Git Bash（已安装）
- Maven（构建后端）
- Node.js（构建前端）

### 2. 一键部署脚本（Git Bash）

```bash
cd /h/project/system-template/deploy/scripts
bash deploy-all.sh
```

**注意**：如果提示 `sshpass` 未安装，脚本会使用交互式 SSH，需要手动输入密码 `1234asdF.`

---

## 方式二：使用 PowerShell 手动部署

### 步骤 1：构建后端

```powershell
cd h:\project\system-template\system-springboot
mvn clean package -DskipTests
```

构建产物：`target\system-springboot-0.0.1-SNAPSHOT.jar`

### 步骤 2：构建前端

```powershell
cd h:\project\system-template\system-vue
npm install
$env:NODE_OPTIONS="--openssl-legacy-provider"
npm run build
```

构建产物：`dist\` 文件夹

### 步骤 3：使用 WinSCP 或 FileZilla 上传

**服务器信息：**
- 主机：82.157.104.186
- 端口：22
- 用户：ubuntu
- 密码：1234asdF.

**上传文件映射：**
```
本地 → 服务器
system-springboot\target\system-springboot-0.0.1-SNAPSHOT.jar → /opt/system-template/system-springboot.jar
system-vue\dist\* → /opt/system-template/frontend/
docker-compose.yml → /opt/system-template/docker-compose.yml
system-mysql8.sql → /opt/system-template/system-mysql8.sql
deploy\nginx\system-template.conf → /opt/system-template/system-template.conf
deploy\systemd\system-backend.service → /opt/system-template/system-backend.service
deploy\scripts\server-deploy.sh → /opt/system-template/server-deploy.sh
```

### 步骤 4：使用 PuTTY 或 Windows Terminal SSH 登录

```bash
ssh ubuntu@82.157.104.186
# 输入密码: 1234asdF.
```

### 步骤 5：服务器上执行部署脚本

```bash
cd /opt/system-template
sudo chmod +x server-deploy.sh
sudo bash server-deploy.sh
```

---

## 方式三：使用 PowerShell + SCP（需要 OpenSSH）

### 1. 启用 Windows OpenSSH 客户端

打开 PowerShell（管理员）：
```powershell
Add-WindowsCapability -Online -Name OpenSSH.Client~~~~0.0.1.0
```

### 2. 执行部署

```powershell
# 进入项目目录
cd h:\project\system-template

# 构建后端
cd system-springboot
mvn clean package -DskipTests
cd ..

# 构建前端
cd system-vue
$env:NODE_OPTIONS="--openssl-legacy-provider"
npm install
npm run build
cd ..

# 创建部署包
mkdir deploy\build\package -Force
Copy-Item system-springboot\target\*.jar deploy\build\package\system-springboot.jar
Copy-Item system-vue\dist -Recurse -Destination deploy\build\package\frontend
Copy-Item docker-compose.yml deploy\build\package\
Copy-Item system-mysql8.sql deploy\build\package\
Copy-Item deploy\nginx\system-template.conf deploy\build\package\
Copy-Item deploy\systemd\system-backend.service deploy\build\package\
Copy-Item deploy\scripts\server-deploy.sh deploy\build\package\

# 压缩（需要 7-Zip 或使用 Compress-Archive）
Compress-Archive -Path deploy\build\package\* -DestinationPath deploy\build\package.zip -Force

# 上传到服务器
scp deploy\build\package.zip ubuntu@82.157.104.186:/tmp/

# SSH 登录并部署
ssh ubuntu@82.157.104.186
```

服务器上执行：
```bash
cd /tmp
unzip package.zip -d /opt/system-template/
cd /opt/system-template
sudo chmod +x server-deploy.sh
sudo bash server-deploy.sh
```

---

## 推荐工具

### SSH 客户端
- **PuTTY**: https://www.putty.org/
- **Windows Terminal**: 微软商店下载
- **MobaXterm**: https://mobaxterm.mobatek.net/ (推荐，集成 SCP)

### 文件传输工具
- **WinSCP**: https://winscp.net/ (推荐)
- **FileZilla**: https://filezilla-project.org/
- **MobaXterm**: 自带文件管理

---

## 快速命令备忘

### SSH 登录
```bash
ssh ubuntu@82.157.104.186
# 密码: 1234asdF.
```

### SCP 上传文件
```bash
# 上传单个文件
scp local_file ubuntu@82.157.104.186:/opt/system-template/

# 上传目录
scp -r local_dir ubuntu@82.157.104.186:/opt/system-template/
```

### 常用服务器命令
```bash
# 查看后端日志
sudo journalctl -u system-backend -f

# 重启后端
sudo systemctl restart system-backend

# 查看 Docker 容器
sudo docker ps

# 查看 Nginx 状态
sudo systemctl status nginx
```

---

## 部署完成后

访问地址：**http://82.157.104.186**

默认账号：
- 管理员：`admin` / `123456`
- 测试用户：`test` / `1234567`

Swagger 文档：**http://82.157.104.186/api/doc.html**
