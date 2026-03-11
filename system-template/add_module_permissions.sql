-- 为新增的四个区块链模块添加菜单记录
-- 执行此SQL前请先备份数据库

USE system_template;

-- 添加PPIO模块菜单
INSERT INTO `menu` (`url`, `path`, `component`, `permission`, `name`, `icon`, `require_auth`, `parent_id`, `enabled`, `create_Time`)
VALUES ('/', '/ppio', 'Main', 'PPIO', 'PPIO', 'coin', 1, 1, 1, NOW());

-- 添加联邦学习模块菜单
INSERT INTO `menu` (`url`, `path`, `component`, `permission`, `name`, `icon`, `require_auth`, `parent_id`, `enabled`, `create_Time`)
VALUES ('/', '/federated-learning', 'Main', 'FederatedLearning', '联邦学习', 'share', 1, 1, 1, NOW());

-- 添加算力交易模块菜单
INSERT INTO `menu` (`url`, `path`, `component`, `permission`, `name`, `icon`, `require_auth`, `parent_id`, `enabled`, `create_Time`)
VALUES ('/', '/computing-trade', 'Main', 'ComputingTrade', '算力交易', 'monitor', 1, 1, 1, NOW());

-- 添加WeBase模块菜单
INSERT INTO `menu` (`url`, `path`, `component`, `permission`, `name`, `icon`, `require_auth`, `parent_id`, `enabled`, `create_Time`)
VALUES ('/', '/webase', 'Main', 'WeBase', 'WeBase', 'box', 1, 1, 1, NOW());

-- 查看新增的菜单ID（假设从12开始，实际以查询结果为准）
SELECT id, name, path FROM `menu` WHERE `name` IN ('PPIO', '联邦学习', '算力交易', 'WeBase');

-- 更新admin角色权限，包含所有菜单（包括新增的4个模块）
-- 原来的权限：[4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26]
-- 新增的菜单ID假设为 12, 13, 14, 15（请根据上面查询结果确认实际ID）
-- 更新后的权限应该包含所有菜单ID

-- 方案1：如果新菜单ID是12,13,14,15（请根据实际情况修改）
UPDATE `role`
SET `permission` = '[2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26]',
    `update_time` = NOW()
WHERE `role_name` = 'ROLE_admin';

-- 验证更新结果
SELECT id, role_name, role_name_zh, permission FROM `role` WHERE `role_name` = 'ROLE_admin';

-- 说明：
-- 1. menu表中的id=2是个人中心，id=3是仪表盘（现在改名为首页）
-- 2. 新增的4个模块菜单会自动分配新的ID
-- 3. admin角色的permission字段是JSON数组，包含所有可访问的菜单ID
-- 4. 执行完成后，admin用户登录系统就能看到并访问所有模块了
