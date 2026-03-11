-- MySQL dump 10.13  Distrib 8.0.13, for Linux (x86_64)
--
-- Host: localhost    Database: system_template
-- ------------------------------------------------------
-- Server version	8.0.13

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8mb4 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `menu`
--

LOCK TABLES `menu` WRITE;
/*!40000 ALTER TABLE `menu` DISABLE KEYS */;
INSERT INTO `menu` VALUES (1,'/','/','/',NULL,'所有',NULL,NULL,NULL,1,'2022-08-06 23:40:44'),(2,'/','/profile','Profile','Profile','个人中心','user',1,1,1,'2022-08-06 23:40:44'),(3,'/','/dashboard','Dashboard','Dashboard','é¦–é¡µ','dashboard',1,1,1,'2022-08-06 23:40:44'),(4,'/','/security','Main','security','权限管理','security',1,1,1,'2022-08-06 23:40:44'),(5,'/','/user','Main','userManage','用户管理','personnel-manage',1,1,1,'2022-08-06 23:40:44'),(6,'/','/log','Main','logManage','日志管理','server',1,1,1,'2022-08-06 23:40:44'),(7,'/security/menus/**','/security/menus','Menus','menus','菜单列表','menu',1,4,1,'2022-08-06 23:40:44'),(8,'/security/interface/**','/security/interface','Interface','swagger','接口文档','swagger',1,4,1,'2022-08-06 23:40:44'),(9,'/security/roles/**','/security/roles','Roles','roles','角色管理','role',1,4,1,'2022-08-06 23:40:44'),(10,'/user/userList/**','/user/userList','UserList','userList','用户列表','peoples',1,5,1,'2022-08-06 23:40:44'),(11,'/log/operation/**','/log/operation','Operation','operation','操作日志','access',1,6,1,'2022-08-06 23:40:44'),(27,'/','/modules/ppio','Main','PPIO','ç®—ç½‘èžåˆä¸Žæ„ŸçŸ¥','coin',1,1,1,'2025-11-13 23:25:12'),(28,'/','/modules/federated-learning','Main','FederatedLearning','æ³›åœ¨ååŒè®¡ç®—','share',1,1,1,'2025-11-13 23:25:12'),(29,'/','/modules/computing-trade','Main','ComputingTrade','èµ„æºç¼–æŽ’ä¸Žè°ƒåº¦','monitor',1,1,1,'2025-11-13 23:25:12'),(30,'/','/modules/webase','Main','WeBase','å¯ä¿¡ç”Ÿæ€ä¸Žæº¯æº','box',1,1,1,'2025-11-13 23:25:12');
/*!40000 ALTER TABLE `menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'ROLE_admin','管理员','[2,3,4,5,6,7,8,9,10,11,27,28,29,30]','2022-08-07 01:06:37','2025-11-20 16:21:30'),(9,'ROLE_user','普通用户','[2,27,28,29]','2025-11-20 15:45:18','2025-11-20 17:00:07'),(10,'ROLE_senior','高级用户','[3,2,27,28,29,30]','2025-11-20 15:54:43','2025-11-20 17:00:26');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'小x','admin','$2a$10$zg56ds0T7dCVdHTCV7RJe.tjvzwmZ3TkGMSXQveomcm4Rb2t9lVsu','/images/h9BVg9XX.jpeg','127.0.0.1','本地登录','2025-11-20 17:29:17',1,'2022-08-06 23:40:44','2025-11-20 17:28:51'),(11,'小y','user','$2a$10$NBilHlToYRGVxza9YU5vXevB38SF/IJWI/Lfd.46hsBNJrZNqwMuC',NULL,'127.0.0.1','本地登录','2025-11-20 17:01:35',1,'2025-11-20 15:43:41','2025-11-20 17:10:05');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `user_info`
--

LOCK TABLES `user_info` WRITE;
/*!40000 ALTER TABLE `user_info` DISABLE KEYS */;
INSERT INTO `user_info` VALUES (1,'1072876xxx@qq.com','18230133150','10728765','https://github.com','https://gitee.com','https://blog.csdn.net','https://leetcode.cn','大家好，我是小x'),(11,'user@example.com','13800138000',NULL,NULL,NULL,NULL,NULL,'大家好，我是小y');
/*!40000 ALTER TABLE `user_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `user_role`
--

LOCK TABLES `user_role` WRITE;
/*!40000 ALTER TABLE `user_role` DISABLE KEYS */;
INSERT INTO `user_role` VALUES (1,1,1),(15,11,9);
/*!40000 ALTER TABLE `user_role` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-20 22:36:25
