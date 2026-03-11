USE mysql;
UPDATE user SET authentication_string=PASSWORD('root123456') WHERE User='root';
FLUSH PRIVILEGES;
SELECT 'MySQL密码已重置为: root123456' AS Message;
