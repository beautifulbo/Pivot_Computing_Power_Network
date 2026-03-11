-- ============================================
-- 添加外键约束以实现级联删除
-- 作用：删除用户时自动删除关联的用户信息和用户角色数据
-- 创建时间：2025-11-20
-- ============================================

-- 1. 为 user_role 表添加外键约束
-- 当删除用户时，自动删除该用户的角色关联
ALTER TABLE user_role
ADD CONSTRAINT fk_user_role_user
FOREIGN KEY (user_id) REFERENCES user(id)
ON DELETE CASCADE
ON UPDATE CASCADE;

-- 当删除角色时,自动删除该角色的用户关联
ALTER TABLE user_role
ADD CONSTRAINT fk_user_role_role
FOREIGN KEY (role_id) REFERENCES role(id)
ON DELETE CASCADE
ON UPDATE CASCADE;

-- 2. 为 user_info 表添加外键约束
-- 当删除用户时，自动删除该用户的详细信息
ALTER TABLE user_info
ADD CONSTRAINT fk_user_info_user
FOREIGN KEY (id) REFERENCES user(id)
ON DELETE CASCADE
ON UPDATE CASCADE;

-- ============================================
-- 验证外键约束
-- ============================================
-- 查看 user_role 表结构
SHOW CREATE TABLE user_role;

-- 查看 user_info 表结构
SHOW CREATE TABLE user_info;
