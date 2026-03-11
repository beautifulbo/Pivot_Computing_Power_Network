# 快速部署指南 - 已完成构建

## 当前状态

✅ 后端 JAR 包构建完成
✅ 前端构建完成
✅ 所有配置文件已准备好
✅ 部署包已整理在 `deploy/build/package/` 目录

---

## 📦 部署包内容

在 `h:\project\system-template\deploy\build\package\` 目录下有以下文件：

```
package/
├── system-springboot.jar           # 后端 JAR 包
├── frontend/                       # 前端静态文件目录
│   ├── index.html
│   ├── js/
│   ├── css/
│   └── ...
├── docker-compose.yml              # Docker 容器配置
├── system-mysql8.sql               # 数据库初始化脚本
├── system-template.conf            # Nginx 配置
├── system-backend.service          # systemd 服务配置
└── server-deploy.sh                # 服务器部署脚本
```

---

## 🚀 方式一：使用 WinSCP 上传（推荐 - 最简单）

### 步骤 1：下载并安装 WinSCP

下载地址：https://winscp.net/eng/download.php

### 步骤 2：连接服务器

- **主机名**: 82.157.104.186
- **端口**: 22
- **用户名**: ubuntu
- **密码**: 1234asdF.

### 步骤 3：上传文件

1. 在 WinSCP 左侧（本地）导航到：`h:\project\system-template\deploy\build\package\`
2. 在 WinSCP 右侧（服务器）导航到：`/tmp/`
3. 选中左侧 package 文件夹中的所有文件
4. 拖拽到右侧 /tmp/ 目录

### 步骤 4：SSH 执行部署

使用 PuTTY 或 Windows Terminal 连接服务器：

```bash
ssh ubuntu@82.157.104.186
# 输入密码: 1234asdF.
```

执行以下命令：

```bash
# 创建部署目录
sudo mkdir -p /opt/system-template
sudo chmod 777 /opt/system-template

# 移动文件
sudo mv /tmp/system-springboot.jar /opt/system-template/
sudo mv /tmp/frontend /opt/system-template/
sudo mv /tmp/docker-compose.yml /opt/system-template/
sudo mv /tmp/system-mysql8.sql /opt/system-template/
sudo mv /tmp/system-template.conf /opt/system-template/
sudo mv /tmp/system-backend.service /opt/system-template/
sudo mv /tmp/server-deploy.sh /opt/system-template/

# 执行部署脚本
cd /opt/system-template
sudo chmod +x server-deploy.sh
sudo bash server-deploy.sh
```

---

## 🚀 方式二：使用 Git Bash + SCP

如果您想用命令行，在 Git Bash 中执行：

```bash
cd /h/project/system-template

# 压缩部署包
cd deploy/build
tar -czf package.tar.gz package/

# 上传到服务器（会提示输入密码）
scp package.tar.gz ubuntu@82.157.104.186:/tmp/

# SSH 登录
ssh ubuntu@82.157.104.186
# 输入密码: 1234asdF.
```

在服务器上执行：

```bash
cd /tmp
tar -xzf package.tar.gz
sudo mkdir -p /opt/system-template
sudo cp -r package/* /opt/system-template/
cd /opt/system-template
sudo chmod +x server-deploy.sh
sudo bash server-deploy.sh
```

---

## ✅ 部署完成后

### 访问地址

**主站**: http://82.157.104.186

**API文档**: http://82.157.104.186/api/doc.html

### 默认登录账号

- **管理员**: admin / 123456
- **测试用户**: test / 1234567

---

## 🔍 验证部署状态

SSH 连接服务器后，执行：

```bash
# 查看后端服务状态
sudo systemctl status system-backend

# 查看后端日志
sudo journalctl -u system-backend -f

# 查看 Docker 容器
sudo docker ps

# 查看 Nginx 状态
sudo systemctl status nginx

# 测试后端 API
curl http://localhost:8090/

# 测试前端
curl http://localhost/
```

---

## 🛠️ 常用管理命令

```bash
# 重启后端
sudo systemctl restart system-backend

# 查看后端日志（实时）
sudo journalctl -u system-backend -f

# 重启 Nginx
sudo systemctl restart nginx

# 重启数据库
cd /opt/system-template
sudo docker-compose restart

# 查看数据库日志
sudo docker logs system-template-mysql

# 进入 MySQL 容器
sudo docker exec -it system-template-mysql mysql -uroot -proot123456 system_template
```

---

## ❓ 常见问题

### 1. 后端无法启动

```bash
# 查看详细错误
sudo journalctl -u system-backend -n 100 --no-pager

# 检查 Java
java -version

# 检查端口
sudo netstat -tlnp | grep 8090
```

### 2. 数据库连接失败

```bash
# 检查 MySQL 容器
sudo docker ps | grep mysql

# 测试数据库连接
sudo docker exec system-template-mysql mysql -uroot -proot123456 -e "SELECT 1"
```

### 3. 前端 404

```bash
# 检查文件
ls -la /opt/system-template/frontend/

# 重启 Nginx
sudo nginx -t
sudo systemctl restart nginx
```

---

## 📞 需要帮助？

如果部署过程中遇到任何问题，请：

1. 复制错误日志
2. 截图错误信息
3. 告诉我在哪一步出现的问题

我会立即帮您解决！
