-- 添加应用中心的四个模块菜单
INSERT INTO `menu` (id, url, path, component, permission, name, icon, require_auth, parent_id, enabled, create_Time) VALUES
(27, '/', '/modules/ppio', 'Main', 'PPIO', '算力交易与感知', 'coin', 1, 1, 1, '2025-11-13 23:25:12'),
(28, '/', '/modules/federated-learning', 'Main', 'FederatedLearning', '泛在协同计算', 'share', 1, 1, 1, '2025-11-13 23:25:12'),
(29, '/', '/modules/computing-trade', 'Main', 'ComputingTrade', '资源编排与调度', 'monitor', 1, 1, 1, '2025-11-13 23:25:12'),
(30, '/', '/modules/webase', 'Main', 'WeBase', '可信生态与溯源', 'box', 1, 1, 1, '2025-11-13 23:25:12');

-- 修改个人中心菜单,使其显示在菜单栏中(parent_id改为1,require_auth改为1)
UPDATE `menu` SET require_auth = 1 WHERE id = 2;

-- 修复首页菜单的名称编码问题
UPDATE `menu` SET name = '首页' WHERE id = 3;
