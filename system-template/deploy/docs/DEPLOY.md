# 部署指南

## 服务器信息

- **IP**: 82.157.104.186
- **用户**: ubuntu
- **操作系统**: Ubuntu

---

## 快速部署（推荐）

### 方式一：手动分步部署

由于您使用的是 Windows 系统，建议按以下步骤手动操作：

#### 步骤 1：本地构建

**构建后端 JAR 包：**
```bash
cd system-springboot
mvn clean package -DskipTests
```

**构建前端：**
```bash
cd system-vue
npm install
set NODE_OPTIONS=--openssl-legacy-provider
npm run build
```

#### 步骤 2：上传文件到服务器

使用 WinSCP、FileZilla 或命令行上传以下文件到服务器 `/opt/system-template/`：

1. `system-springboot/target/system-springboot-0.0.1-SNAPSHOT.jar` → 重命名为 `system-springboot.jar`
2. `system-vue/dist/` 文件夹 → 上传为 `frontend/`
3. `docker-compose.yml`
4. `system-mysql8.sql`
5. `deploy/nginx/system-template.conf`
6. `deploy/systemd/system-backend.service`
7. `deploy/scripts/server-deploy.sh`

#### 步骤 3：SSH 登录服务器执行部署

```bash
ssh ubuntu@82.157.104.186
# 密码: 1234asdF.

cd /opt/system-template
sudo chmod +x server-deploy.sh
sudo bash server-deploy.sh
```

---

## 部署后验证

访问地址：**http://82.157.104.186**

默认账号：
- 管理员：`admin` / `123456`
- 测试用户：`test` / `1234567`

---

## 常用管理命令

### 后端服务
```bash
# 查看状态
sudo systemctl status system-backend

# 查看日志
sudo journalctl -u system-backend -f

# 重启服务
sudo systemctl restart system-backend

# 停止服务
sudo systemctl stop system-backend
```

### Docker 服务（MySQL + Redis）
```bash
# 查看容器状态
sudo docker ps

# 查看日志
sudo docker logs system-template-mysql
sudo docker logs system-template-redis

# 重启数据库
cd /opt/system-template
sudo docker-compose restart
```

### Nginx
```bash
# 查看状态
sudo systemctl status nginx

# 重新加载配置
sudo nginx -t && sudo systemctl reload nginx

# 查看访问日志
sudo tail -f /var/log/nginx/system-template-access.log
```

---

## 更新部署

### 更新后端
```bash
# 1. 本地重新构建 JAR 包
# 2. 上传新的 JAR 包到服务器
# 3. SSH 执行：
sudo systemctl restart system-backend
```

### 更新前端
```bash
# 1. 本地重新构建 (npm run build)
# 2. 上传 dist 目录内容到 /opt/system-template/frontend/
# 3. 刷新浏览器即可
```

---

## 故障排查

### 后端无法启动
```bash
# 查看详细日志
sudo journalctl -u system-backend -n 100

# 检查 Java 版本
java -version

# 检查端口占用
sudo netstat -tlnp | grep 8090
```

### 数据库连接失败
```bash
# 检查 MySQL 容器
sudo docker ps | grep mysql

# 测试连接
sudo docker exec system-template-mysql mysql -uroot -proot123456 -e "SELECT 1"

# 查看 MySQL 日志
sudo docker logs system-template-mysql
```

### 前端 404 错误
```bash
# 检查前端文件
ls -la /opt/system-template/frontend/

# 检查 Nginx 配置
sudo nginx -t

# 重启 Nginx
sudo systemctl restart nginx
```

### API 请求失败
```bash
# 检查后端是否运行
curl http://localhost:8090/

# 检查 Nginx 代理
sudo tail -f /var/log/nginx/system-template-error.log
```

---

## 备份与恢复

### 数据库备份
```bash
# 备份
sudo docker exec system-template-mysql mysqldump -uroot -proot123456 system_template > backup_$(date +%Y%m%d).sql

# 恢复
sudo docker exec -i system-template-mysql mysql -uroot -proot123456 system_template < backup_20241120.sql
```

### 上传文件备份
```bash
# 备份上传目录
tar -czf uploads_backup.tar.gz /opt/system-template/uploads/
```

---

## 安全建议

1. **修改数据库密码**：编辑 `docker-compose.yml` 和 `application-prod.yml`
2. **配置防火墙**：只开放必要端口 (80, 443, 22)
3. **禁用 Swagger**：生产环境已在配置中禁用
4. **定期备份**：设置 crontab 定时备份数据库
5. **监控日志**：定期检查 Nginx 和后端日志
