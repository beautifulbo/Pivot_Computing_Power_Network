-- 修复所有菜单项的中文编码问题
UPDATE `menu` SET name = '首页' WHERE id = 3;
UPDATE `menu` SET name = '算力交易与感知' WHERE id = 27;
UPDATE `menu` SET name = '泛在协同计算' WHERE id = 28;
UPDATE `menu` SET name = '资源编排与调度' WHERE id = 29;
UPDATE `menu` SET name = '可信生态与溯源' WHERE id = 30;
