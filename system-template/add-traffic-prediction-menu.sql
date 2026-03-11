-- 添加智能流量预测模块菜单权限
-- 插入新菜单记录
INSERT INTO `menu` (`name`, `path`, `component`, `icon`, `parent_id`, `require_auth`, `enabled`, `create_Time`)
VALUES ('智能流量预测', '/modules/traffic-prediction', 'Main', 'chart', 1, 1, 1, NOW());

-- 查询验证插入结果
SELECT id, name, path, component, icon, parent_id FROM menu WHERE name = '智能流量预测';
