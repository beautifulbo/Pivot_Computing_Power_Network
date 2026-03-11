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
-- Table structure for table `menu`
--

DROP TABLE IF EXISTS `menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `url` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '后端访问路径',
  `path` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '前端访问路径',
  `component` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '组件',
  `permission` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '权限标识',
  `name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '菜单名称',
  `icon` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '图标',
  `require_auth` tinyint(4) DEFAULT NULL COMMENT '是否要求权限',
  `parent_id` int(11) DEFAULT NULL COMMENT '父组件Id',
  `enabled` tinyint(4) DEFAULT NULL COMMENT '是否启用',
  `create_Time` datetime DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu`
--

LOCK TABLES `menu` WRITE;
/*!40000 ALTER TABLE `menu` DISABLE KEYS */;
INSERT INTO `menu` VALUES (1,'/','/','/',NULL,'所有',NULL,NULL,NULL,1,'2022-08-06 23:40:44'),(2,'/','/profile','Profile','Profile','个人中心','user',1,1,1,'2022-08-06 23:40:44'),(3,'/','/dashboard','Dashboard','Dashboard','é¦–é¡µ','dashboard',1,1,1,'2022-08-06 23:40:44'),(4,'/','/security','Main','security','权限管理','security',1,1,1,'2022-08-06 23:40:44'),(5,'/','/user','Main','userManage','用户管理','personnel-manage',1,1,1,'2022-08-06 23:40:44'),(6,'/','/log','Main','logManage','日志管理','server',1,1,1,'2022-08-06 23:40:44'),(7,'/security/menus/**','/security/menus','Menus','menus','菜单列表','menu',1,4,1,'2022-08-06 23:40:44'),(8,'/security/interface/**','/security/interface','Interface','swagger','接口文档','swagger',1,4,1,'2022-08-06 23:40:44'),(9,'/security/roles/**','/security/roles','Roles','roles','角色管理','role',1,4,1,'2022-08-06 23:40:44'),(10,'/user/userList/**','/user/userList','UserList','userList','用户列表','peoples',1,5,1,'2022-08-06 23:40:44'),(11,'/log/operation/**','/log/operation','Operation','operation','操作日志','access',1,6,1,'2022-08-06 23:40:44'),(27,'/','/modules/ppio','Main','PPIO','ç®—ç½‘èžåˆä¸Žæ„ŸçŸ¥','coin',1,1,1,'2025-11-13 23:25:12'),(28,'/','/modules/federated-learning','Main','FederatedLearning','æ³›åœ¨ååŒè®¡ç®—','share',1,1,1,'2025-11-13 23:25:12'),(29,'/','/modules/computing-trade','Main','ComputingTrade','èµ„æºç¼–æŽ’ä¸Žè°ƒåº¦','monitor',1,1,1,'2025-11-13 23:25:12'),(30,'/','/modules/webase','Main','WeBase','å¯ä¿¡ç”Ÿæ€ä¸Žæº¯æº','box',1,1,1,'2025-11-13 23:25:12');
/*!40000 ALTER TABLE `menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `operate_log`
--

DROP TABLE IF EXISTS `operate_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `operate_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `module` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '系统模块',
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '操作描述',
  `request_method` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '请求方式',
  `operate_method` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '操作方法',
  `user` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '操作人员',
  `operate_ip` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '操作地址',
  `operate_source` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '操作地点',
  `status` tinyint(4) DEFAULT NULL COMMENT '操作状态',
  `status_description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '状态描述',
  `request_param` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT '请求参数',
  `duration` int(10) unsigned DEFAULT NULL COMMENT '执行时长',
  `operate_time` datetime DEFAULT NULL COMMENT '操作日期',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=106 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `operate_log`
--

LOCK TABLES `operate_log` WRITE;
/*!40000 ALTER TABLE `operate_log` DISABLE KEYS */;
INSERT INTO `operate_log` VALUES (59,'用户模块','用户更新密码','PUT','com.zrkizzy.template.service.impl.UserServiceImpl.updatePassword','小x','127.0.0.1','本地登录',1,'响应成功','[{\"newPassword\":\"123456\",\"oldPassword\":\"12345623\"}]',67,'2025-11-20 17:18:59'),(60,'用户模块','用户更新密码','PUT','com.zrkizzy.template.service.impl.UserServiceImpl.updatePassword','小x','127.0.0.1','本地登录',1,'响应成功','[{\"newPassword\":\"123456\",\"oldPassword\":\"12345645566\"}]',73,'2025-11-20 17:20:10'),(61,'用户模块','用户更新密码','PUT','com.zrkizzy.template.service.impl.UserServiceImpl.updatePassword','小x','127.0.0.1','本地登录',1,'响应成功','[{\"newPassword\":\"123456\",\"oldPassword\":\"123456\"}]',147,'2025-11-20 17:24:45'),(62,'用户模块','用户更新密码','PUT','com.zrkizzy.template.service.impl.UserServiceImpl.updatePassword','小x','127.0.0.1','本地登录',1,'响应成功','[{\"newPassword\":\"123456\",\"oldPassword\":\"12345612\"}]',68,'2025-11-20 17:25:01'),(63,'用户模块','用户更新密码','PUT','com.zrkizzy.template.service.impl.UserServiceImpl.updatePassword','小x','127.0.0.1','本地登录',1,'响应成功','[{\"newPassword\":\"12345678\",\"oldPassword\":\"123456\"}]',197,'2025-11-20 17:26:00'),(64,'用户模块','用户更新密码','PUT','com.zrkizzy.template.service.impl.UserServiceImpl.updatePassword','小x','127.0.0.1','本地登录',1,'响应成功','[{\"newPassword\":\"123456\",\"oldPassword\":\"12345678\"}]',201,'2025-11-20 17:28:51'),(65,'用户信息模块','更新用户个人信息','POST','com.zrkizzy.template.service.impl.UserInfoServiceImpl.updateUserInfo','小x','127.0.0.1','本地登录',1,'响应成功','[{\"csdn\":\"https://blog.csdn.net\",\"description\":\"大家好，我是小x\",\"email\":\"1072876xxx@qq.com\",\"gitee\":\"https://gitee.com\",\"github\":\"https://github.com\",\"id\":1,\"leetcode\":\"https://leetcode.cn\",\"nickName\":\"小x\",\"phone\":\"18230133150\",\"qq\":\"10728765\",\"username\":\"admin\"}]',73,'2025-11-20 23:28:07'),(66,'角色模块','更新角色','PUT','com.zrkizzy.template.service.impl.RoleServiceImpl.updateRole','小x','127.0.0.1','本地登录',1,'响应成功','[{\"id\":9,\"permission\":[3,2,27,28,29],\"roleName\":\"ROLE_user\",\"roleNameZh\":\"普通用户\"}]',15,'2025-11-20 23:29:05'),(67,'鐢ㄦ埛淇℃伅妯″潡','鏇存柊鐢ㄦ埛涓汉淇℃伅','POST','com.zrkizzy.template.service.impl.UserInfoServiceImpl.updateUserInfo','小x','127.0.0.1','鏈湴鐧诲綍',1,'鍝嶅簲鎴愬姛','[{\"csdn\":\"https://blog.csdn.net\",\"description\":\"大家好，我是小x\",\"email\":\"1072876xxx@qq.com\",\"gitee\":\"https://gitee.com\",\"github\":\"https://github.com\",\"id\":1,\"leetcode\":\"https://leetcode.cn\",\"nickName\":\"小x\",\"phone\":\"18230133151\",\"qq\":\"10728765\",\"username\":\"admin\"}]',80,'2025-11-21 01:03:30'),(68,'鐢ㄦ埛淇℃伅妯″潡','鏇存柊鐢ㄦ埛涓汉淇℃伅','POST','com.zrkizzy.template.service.impl.UserInfoServiceImpl.updateUserInfo','小x','127.0.0.1','鏈湴鐧诲綍',1,'鍝嶅簲鎴愬姛','[{\"csdn\":\"https://blog.csdn.net\",\"description\":\"大家好，我是小x\",\"email\":\"1072876xxx@qq.com\",\"gitee\":\"https://gitee.com\",\"github\":\"https://github.com\",\"id\":1,\"leetcode\":\"https://leetcode.cn\",\"nickName\":\"小x\",\"phone\":\"18230133150\",\"qq\":\"10728765\",\"username\":\"admin\"}]',88,'2025-11-21 01:05:29'),(69,'鐢ㄦ埛淇℃伅妯″潡','鏇存柊鐢ㄦ埛涓汉淇℃伅','POST','com.zrkizzy.template.service.impl.UserInfoServiceImpl.updateUserInfo','小x','127.0.0.1','鏈湴鐧诲綍',1,'鍝嶅簲鎴愬姛','[{\"csdn\":\"https://blog.csdn.net\",\"description\":\"大家好，我是小x\",\"email\":\"1072876xxx@qq.com\",\"gitee\":\"https://gitee.com\",\"github\":\"https://github.com\",\"id\":1,\"leetcode\":\"https://leetcode.cn\",\"nickName\":\"小x\",\"phone\":\"18230133150\",\"qq\":\"10728765\",\"username\":\"admin\"}]',20,'2025-11-21 01:05:33'),(70,'鐢ㄦ埛淇℃伅妯″潡','鏇存柊鐢ㄦ埛涓汉淇℃伅','POST','com.zrkizzy.template.service.impl.UserInfoServiceImpl.updateUserInfo','小x','127.0.0.1','鏈湴鐧诲綍',1,'鍝嶅簲鎴愬姛','[{\"csdn\":\"https://blog.csdn.net\",\"description\":\"大家好，我是小x\",\"email\":\"1072876xxx@qq.com\",\"gitee\":\"https://gitee.com\",\"github\":\"https://github.com\",\"id\":1,\"leetcode\":\"https://leetcode.cn\",\"nickName\":\"小x\",\"phone\":\"18230133150\",\"qq\":\"10728765\",\"username\":\"admin\"}]',15,'2025-11-21 01:06:00'),(71,'鐢ㄦ埛淇℃伅妯″潡','鏇存柊鐢ㄦ埛涓汉淇℃伅','POST','com.zrkizzy.template.service.impl.UserInfoServiceImpl.updateUserInfo','小x','127.0.0.1','鏈湴鐧诲綍',1,'鍝嶅簲鎴愬姛','[{\"csdn\":\"https://blog.csdn.net\",\"description\":\"大家好，我是小x\",\"email\":\"1072876xxx@qq.com\",\"gitee\":\"https://gitee.com\",\"github\":\"https://github.com\",\"id\":1,\"leetcode\":\"https://leetcode.cn\",\"nickName\":\"小x\",\"phone\":\"18230133150\",\"qq\":\"10728765\",\"username\":\"admin\"}]',47,'2025-11-21 01:07:38'),(72,'鐢ㄦ埛淇℃伅妯″潡','鏇存柊鐢ㄦ埛涓汉淇℃伅','POST','com.zrkizzy.template.service.impl.UserInfoServiceImpl.updateUserInfo','小x','127.0.0.1','鏈湴鐧诲綍',1,'鍝嶅簲鎴愬姛','[{\"csdn\":\"https://blog.csdn.net\",\"description\":\"大家好，我是小x\",\"email\":\"1072876xxx@qq.com\",\"gitee\":\"https://gitee.com\",\"github\":\"https://github.com\",\"id\":1,\"leetcode\":\"https://leetcode.cn\",\"nickName\":\"小x\",\"phone\":\"18230133150\",\"qq\":\"10728765\",\"username\":\"admin\"}]',16,'2025-11-21 01:07:45'),(73,'鐢ㄦ埛淇℃伅妯″潡','鏇存柊鐢ㄦ埛涓汉淇℃伅','POST','com.zrkizzy.template.service.impl.UserInfoServiceImpl.updateUserInfo','小x','127.0.0.1','鏈湴鐧诲綍',1,'鍝嶅簲鎴愬姛','[{\"csdn\":\"https://blog.csdn.net\",\"description\":\"大家好，我是小x\",\"email\":\"1072876xxx@qq.com\",\"gitee\":\"https://gitee.com\",\"github\":\"https://github.com\",\"id\":1,\"leetcode\":\"https://leetcode.cn\",\"nickName\":\"小x\",\"phone\":\"18230133150\",\"qq\":\"10728765\",\"username\":\"admin\"}]',16,'2025-11-21 01:08:39'),(74,'鐢ㄦ埛淇℃伅妯″潡','鏇存柊鐢ㄦ埛涓汉淇℃伅','POST','com.zrkizzy.template.service.impl.UserInfoServiceImpl.updateUserInfo','小x','127.0.0.1','鏈湴鐧诲綍',1,'鍝嶅簲鎴愬姛','[{\"csdn\":\"https://blog.csdn.net\",\"description\":\"大家好，我是小x\",\"email\":\"1072876xxx@qq.com\",\"gitee\":\"https://gitee.com\",\"github\":\"https://github.com\",\"id\":1,\"leetcode\":\"https://leetcode.cn\",\"nickName\":\"小x\",\"phone\":\"18230133150\",\"qq\":\"10728765\",\"username\":\"admin\"}]',18,'2025-11-21 01:10:17'),(75,'瑙掕壊妯″潡','鏇存柊瑙掕壊','PUT','com.zrkizzy.template.service.impl.RoleServiceImpl.updateRole','小x','127.0.0.1','鏈湴鐧诲綍',1,'鍝嶅簲鎴愬姛','[{\"id\":9,\"permission\":[],\"roleName\":\"ROLE_user\",\"roleNameZh\":\"普通用户\"}]',10,'2025-11-21 01:10:44'),(76,'鐢ㄦ埛淇℃伅妯″潡','鏇存柊鐢ㄦ埛涓汉淇℃伅','POST','com.zrkizzy.template.service.impl.UserInfoServiceImpl.updateUserInfo','小x','127.0.0.1','鏈湴鐧诲綍',1,'鍝嶅簲鎴愬姛','[{\"csdn\":\"https://blog.csdn.net\",\"description\":\"大家好，我是小x\",\"email\":\"1072876xxx@qq.com\",\"gitee\":\"https://gitee.com\",\"github\":\"https://github.com\",\"id\":1,\"leetcode\":\"https://leetcode.cn\",\"nickName\":\"小x\",\"phone\":\"18230133150\",\"qq\":\"10728765\",\"username\":\"admin\"}]',22,'2025-11-21 01:16:02'),(77,'鐢ㄦ埛淇℃伅妯″潡','鏇存柊鐢ㄦ埛涓汉淇℃伅','POST','com.zrkizzy.template.service.impl.UserInfoServiceImpl.updateUserInfo','小x','127.0.0.1','鏈湴鐧诲綍',1,'鍝嶅簲鎴愬姛','[{\"csdn\":\"https://blog.csdn.net\",\"description\":\"大家好，我是小x\",\"email\":\"1072876xxx@qq.com\",\"gitee\":\"https://gitee.com\",\"github\":\"https://github.com\",\"id\":1,\"leetcode\":\"https://leetcode.cn\",\"nickName\":\"小x\",\"phone\":\"18230133150\",\"qq\":\"10728765\",\"username\":\"admin\"}]',43,'2025-11-21 13:32:08'),(78,'鐢ㄦ埛淇℃伅妯″潡','鏇存柊鐢ㄦ埛涓汉淇℃伅','POST','com.zrkizzy.template.service.impl.UserInfoServiceImpl.updateUserInfo','小x','127.0.0.1','鏈湴鐧诲綍',1,'鍝嶅簲鎴愬姛','[{\"csdn\":\"https://blog.csdn.net\",\"description\":\"大家好，我是小x\",\"email\":\"1072876xxx@qq.com\",\"gitee\":\"https://gitee.com\",\"github\":\"https://github.com\",\"id\":1,\"leetcode\":\"https://leetcode.cn\",\"nickName\":\"小x\",\"phone\":\"18230133150\",\"qq\":\"10728765\",\"username\":\"admin\"}]',13,'2025-11-21 13:36:59'),(79,'鐢ㄦ埛淇℃伅妯″潡','鏇存柊鐢ㄦ埛涓汉淇℃伅','POST','com.zrkizzy.template.service.impl.UserInfoServiceImpl.updateUserInfo','小x','127.0.0.1','鏈湴鐧诲綍',1,'鍝嶅簲鎴愬姛','[{\"csdn\":\"https://blog.csdn.net\",\"description\":\"大家好，我是小x\",\"email\":\"1072876xxx@qq.com\",\"gitee\":\"https://gitee.com\",\"github\":\"https://github.com\",\"id\":1,\"leetcode\":\"https://leetcode.cn\",\"nickName\":\"小x\",\"phone\":\"18230133150\",\"qq\":\"10728765\",\"username\":\"admin\"}]',9,'2025-11-21 13:37:06'),(80,'鐢ㄦ埛淇℃伅妯″潡','鏇存柊鐢ㄦ埛涓汉淇℃伅','POST','com.zrkizzy.template.service.impl.UserInfoServiceImpl.updateUserInfo','小x','127.0.0.1','鏈湴鐧诲綍',1,'鍝嶅簲鎴愬姛','[{\"csdn\":\"https://blog.csdn.net\",\"description\":\"大家好，我是小x\",\"email\":\"1072876xxx@qq.com\",\"gitee\":\"https://gitee.com\",\"github\":\"https://github.com\",\"id\":1,\"leetcode\":\"https://leetcode.cn\",\"nickName\":\"小x\",\"phone\":\"18230133150\",\"qq\":\"10728765\",\"username\":\"admin\"}]',61,'2025-11-21 13:37:41'),(81,'鐢ㄦ埛淇℃伅妯″潡','鏇存柊鐢ㄦ埛涓汉淇℃伅','POST','com.zrkizzy.template.service.impl.UserInfoServiceImpl.updateUserInfo','小x','127.0.0.1','鏈湴鐧诲綍',1,'鍝嶅簲鎴愬姛','[{\"csdn\":\"https://blog.csdn.net\",\"description\":\"大家好，我是小x\",\"email\":\"1072876xxx@qq.com\",\"gitee\":\"https://gitee.com\",\"github\":\"https://github.com\",\"id\":1,\"leetcode\":\"https://leetcode.cn\",\"nickName\":\"小x\",\"phone\":\"18230133150\",\"qq\":\"10728765\",\"username\":\"admin\"}]',270,'2025-11-21 13:37:41'),(82,'用户模块','新增用户','POST','com.zrkizzy.template.service.impl.UserServiceImpl.addUser','小x','127.0.0.1','鏈湴鐧诲綍',1,'鍝嶅簲鎴愬姛','[{\"csdn\":\"\",\"description\":\"\",\"email\":\"\",\"gitee\":\"\",\"github\":\"\",\"leetcode\":\"\",\"phone\":\"\",\"qq\":\"\",\"username\":\"11\"}]',103,'2025-11-21 13:38:15'),(83,'用户模块','删除用户','DELETE','com.zrkizzy.template.service.impl.UserServiceImpl.deleteUserById','小x','127.0.0.1','鏈湴鐧诲綍',1,'鍝嶅簲鎴愬姛','[12]',12,'2025-11-21 13:38:19'),(84,'鐢ㄦ埛淇℃伅妯″潡','鏇存柊鐢ㄦ埛涓汉淇℃伅','POST','com.zrkizzy.template.service.impl.UserInfoServiceImpl.updateUserInfo','小x','127.0.0.1','鏈湴鐧诲綍',1,'鍝嶅簲鎴愬姛','[{\"csdn\":\"https://blog.csdn.net\",\"description\":\"大家好，我是小x\",\"email\":\"1072876xxx@qq.com\",\"gitee\":\"https://gitee.com\",\"github\":\"https://github.com\",\"id\":1,\"leetcode\":\"https://leetcode.cn\",\"nickName\":\"小x\",\"phone\":\"18230133150\",\"qq\":\"10728765\",\"username\":\"admin\"}]',10,'2025-11-21 13:40:26'),(85,'角色模块','新增角色','POST','com.zrkizzy.template.service.impl.RoleServiceImpl.insertRole','小x','127.0.0.1','鏈湴鐧诲綍',1,'鍝嶅簲鎴愬姛','[{\"roleName\":\"11\",\"roleNameZh\":\"11\"}]',7,'2025-11-21 13:40:40'),(86,'角色模块','删除角色','DELETE','com.zrkizzy.template.service.impl.RoleServiceImpl.deleteRoleById','小x','127.0.0.1','鏈湴鐧诲綍',1,'鍝嶅簲鎴愬姛','[11]',2,'2025-11-21 13:40:44'),(87,'鐢ㄦ埛淇℃伅妯″潡','鏇存柊鐢ㄦ埛涓汉淇℃伅','POST','com.zrkizzy.template.service.impl.UserInfoServiceImpl.updateUserInfo','小x','127.0.0.1','鏈湴鐧诲綍',1,'鍝嶅簲鎴愬姛','[{\"csdn\":\"https://blog.csdn.net\",\"description\":\"大家好，我是小x\",\"email\":\"1072876xxx@qq.com\",\"gitee\":\"https://gitee.com\",\"github\":\"https://github.com\",\"id\":1,\"leetcode\":\"https://leetcode.cn\",\"nickName\":\"小x\",\"phone\":\"18230133150\",\"qq\":\"10728765\",\"username\":\"admin\"}]',14,'2025-11-21 13:44:50'),(88,'角色模块','新增角色','POST','com.zrkizzy.template.service.impl.RoleServiceImpl.insertRole','小x','127.0.0.1','鏈湴鐧诲綍',1,'鍝嶅簲鎴愬姛','[{\"permission\":[],\"roleName\":\"11\",\"roleNameZh\":\"11\"}]',3,'2025-11-21 13:46:14'),(89,'角色模块','删除角色','DELETE','com.zrkizzy.template.service.impl.RoleServiceImpl.deleteRoleById','小x','127.0.0.1','鏈湴鐧诲綍',1,'鍝嶅簲鎴愬姛','[12]',3,'2025-11-21 13:46:17'),(90,'鐢ㄦ埛淇℃伅妯″潡','鏇存柊鐢ㄦ埛涓汉淇℃伅','POST','com.zrkizzy.template.service.impl.UserInfoServiceImpl.updateUserInfo','小x','127.0.0.1','鏈湴鐧诲綍',1,'鍝嶅簲鎴愬姛','[{\"csdn\":\"https://blog.csdn.net\",\"description\":\"大家好，我是小x\",\"email\":\"1072876xxx@qq.com\",\"gitee\":\"https://gitee.com\",\"github\":\"https://github.com\",\"id\":1,\"leetcode\":\"https://leetcode.cn\",\"nickName\":\"小x\",\"phone\":\"18230133150\",\"qq\":\"10728765\",\"username\":\"admin\"}]',32,'2025-11-21 13:55:43'),(91,'角色模块','新增角色','POST','com.zrkizzy.template.service.impl.RoleServiceImpl.insertRole','小x','127.0.0.1','鏈湴鐧诲綍',1,'鍝嶅簲鎴愬姛','[{\"permission\":[],\"roleName\":\"11\",\"roleNameZh\":\"11\"}]',8,'2025-11-21 13:55:54'),(92,'角色模块','删除角色','DELETE','com.zrkizzy.template.service.impl.RoleServiceImpl.deleteRoleById','小x','127.0.0.1','鏈湴鐧诲綍',1,'鍝嶅簲鎴愬姛','[13]',4,'2025-11-21 13:55:57'),(93,'鐢ㄦ埛淇℃伅妯″潡','鏇存柊鐢ㄦ埛涓汉淇℃伅','POST','com.zrkizzy.template.service.impl.UserInfoServiceImpl.updateUserInfo','小x','127.0.0.1','鏈湴鐧诲綍',1,'鍝嶅簲鎴愬姛','[{\"csdn\":\"https://blog.csdn.net\",\"description\":\"大家好，我是小x\",\"email\":\"1072876xxx@qq.com\",\"gitee\":\"https://gitee.com\",\"github\":\"https://github.com\",\"id\":1,\"leetcode\":\"https://leetcode.cn\",\"nickName\":\"小x\",\"phone\":\"18230133150\",\"qq\":\"10728765\",\"username\":\"admin\"}]',10,'2025-11-21 13:56:00'),(94,'用户信息模块','更新用户个人信息','POST','com.zrkizzy.template.service.impl.UserInfoServiceImpl.updateUserInfo','小x','127.0.0.1','鏈湴鐧诲綍',1,'鍝嶅簲鎴愬姛','[{\"csdn\":\"https://blog.csdn.net\",\"description\":\"大家好，我是小x\",\"email\":\"1072876xxx@qq.com\",\"gitee\":\"https://gitee.com\",\"github\":\"https://github.com\",\"id\":1,\"leetcode\":\"https://leetcode.cn\",\"nickName\":\"小x\",\"phone\":\"18230133150\",\"qq\":\"10728765\",\"username\":\"admin\"}]',34,'2025-11-21 14:02:32'),(95,'用户信息模块','更新用户个人信息','POST','com.zrkizzy.template.service.impl.UserInfoServiceImpl.updateUserInfo','小x','127.0.0.1','鏈湴鐧诲綍',1,'鍝嶅簲鎴愬姛','[{\"csdn\":\"https://blog.csdn.net\",\"description\":\"大家好，我是小x\",\"email\":\"1072876xxx@qq.com\",\"gitee\":\"https://gitee.com\",\"github\":\"https://github.com\",\"id\":1,\"leetcode\":\"https://leetcode.cn\",\"nickName\":\"小x\",\"phone\":\"18230133150\",\"qq\":\"10728765\",\"username\":\"admin\"}]',15,'2025-11-21 14:02:56'),(96,'用户信息模块','更新用户个人信息','POST','com.zrkizzy.template.service.impl.UserInfoServiceImpl.updateUserInfo','小x','127.0.0.1','鏈湴鐧诲綍',1,'鍝嶅簲鎴愬姛','[{\"csdn\":\"https://blog.csdn.net\",\"description\":\"大家好，我是小x\",\"email\":\"1072876xxx@qq.com\",\"gitee\":\"https://gitee.com\",\"github\":\"https://github.com\",\"id\":1,\"leetcode\":\"https://leetcode.cn\",\"nickName\":\"小x\",\"phone\":\"18230133150\",\"qq\":\"10728765\",\"username\":\"admin\"}]',14,'2025-11-21 14:05:44'),(97,'用户模块','新增用户','POST','com.zrkizzy.template.service.impl.UserServiceImpl.addUser','小x','127.0.0.1','鏈湴鐧诲綍',1,'鍝嶅簲鎴愬姛','[{\"csdn\":\"\",\"description\":\"\",\"email\":\"\",\"gitee\":\"\",\"github\":\"\",\"leetcode\":\"\",\"nickName\":\"11\",\"phone\":\"\",\"qq\":\"\",\"username\":\"11\"}]',107,'2025-11-21 14:05:56'),(98,'用户模块','删除用户','DELETE','com.zrkizzy.template.service.impl.UserServiceImpl.deleteUserById','小x','127.0.0.1','鏈湴鐧诲綍',1,'鍝嶅簲鎴愬姛','[13]',11,'2025-11-21 14:06:00'),(99,'用户信息模块','更新用户个人信息','POST','com.zrkizzy.template.service.impl.UserInfoServiceImpl.updateUserInfo','小x','127.0.0.1','鏈湴鐧诲綍',1,'鍝嶅簲鎴愬姛','[{\"csdn\":\"https://blog.csdn.net\",\"description\":\"大家好，我是小x\",\"email\":\"1072876xxx@qq.com\",\"gitee\":\"https://gitee.com\",\"github\":\"https://github.com\",\"id\":1,\"leetcode\":\"https://leetcode.cn\",\"nickName\":\"小x\",\"phone\":\"18230133150\",\"qq\":\"10728765\",\"username\":\"admin\"}]',10,'2025-11-21 14:09:59'),(100,'用户模块','新增用户','POST','com.zrkizzy.template.service.impl.UserServiceImpl.addUser','小x','127.0.0.1','鏈湴鐧诲綍',1,'鍝嶅簲鎴愬姛','[{\"csdn\":\"\",\"description\":\"\",\"email\":\"\",\"gitee\":\"\",\"github\":\"\",\"leetcode\":\"\",\"nickName\":\"11\",\"phone\":\"\",\"qq\":\"\",\"username\":\"11\"}]',74,'2025-11-21 14:10:21'),(101,'用户模块','删除用户','DELETE','com.zrkizzy.template.service.impl.UserServiceImpl.deleteUserById','小x','127.0.0.1','鏈湴鐧诲綍',1,'鍝嶅簲鎴愬姛','[14]',8,'2025-11-21 14:10:25'),(102,'角色模块','更新角色','PUT','com.zrkizzy.template.service.impl.RoleServiceImpl.updateRole','小x','127.0.0.1','鏈湴鐧诲綍',1,'鍝嶅簲鎴愬姛','[{\"id\":10,\"permission\":[3,2,27,28,29,30],\"roleName\":\"ROLE_senior\",\"roleNameZh\":\"高级用户\"}]',7,'2025-11-21 14:10:34'),(103,'用户模块','用户更新密码','PUT','com.zrkizzy.template.service.impl.UserServiceImpl.updatePassword','小x','127.0.0.1','鏈湴鐧诲綍',1,'鍝嶅簲鎴愬姛','[{\"newPassword\":\"123456\",\"oldPassword\":\"123456\"}]',78,'2025-11-21 14:10:56'),(104,'用户信息模块','更新用户个人信息','POST','com.zrkizzy.template.service.impl.UserInfoServiceImpl.updateUserInfo','小x','127.0.0.1','本地登录',1,'响应成功','[{\"csdn\":\"https://blog.csdn.net\",\"description\":\"大家好，我是小x\",\"email\":\"1072876xxx@qq.com\",\"gitee\":\"https://gitee.com\",\"github\":\"https://github.com\",\"id\":1,\"leetcode\":\"https://leetcode.cn\",\"nickName\":\"小x\",\"phone\":\"18230133150\",\"qq\":\"10728765\",\"username\":\"admin\"}]',49,'2025-11-21 14:22:35'),(105,'用户信息模块','更新用户个人信息','POST','com.zrkizzy.template.service.impl.UserInfoServiceImpl.updateUserInfo','小x','127.0.0.1','本地登录',1,'响应成功','[{\"csdn\":\"https://blog.csdn.net\",\"description\":\"大家好，我是小x\",\"email\":\"1072876xxx@qq.com\",\"gitee\":\"https://gitee.com\",\"github\":\"https://github.com\",\"id\":1,\"leetcode\":\"https://leetcode.cn\",\"nickName\":\"小x\",\"phone\":\"18230133150\",\"qq\":\"10728765\",\"username\":\"admin\"}]',16,'2025-11-21 14:22:35');
/*!40000 ALTER TABLE `operate_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `role_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '角色',
  `role_name_zh` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '角色名称',
  `permission` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '角色权限',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'ROLE_admin','管理员','[2,3,4,5,6,7,8,9,10,11,27,28,29,30]','2022-08-07 01:06:37','2025-11-20 16:21:30'),(9,'ROLE_user','普通用户','[3,2,27,28,29]','2025-11-20 15:45:18','2025-11-21 01:10:44'),(10,'ROLE_senior','高级用户','[3,2,27,28,29,30]','2025-11-20 15:54:43','2025-11-21 14:10:34');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `nick_name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '用户昵称',
  `username` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '用户名',
  `password` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '用户密码',
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '用户头像',
  `ip_address` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '登录IP',
  `ip_source` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'IP属地',
  `last_login_time` datetime DEFAULT NULL COMMENT '用户上次登录时间',
  `enabled` tinyint(1) DEFAULT NULL COMMENT '当前用户是否启用',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `update_time` datetime NOT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'小x','admin','$2a$10$ygx5nLVqoVSeYg.gRd6MNesDMcmWnxHyD3BNiBnCRq34daKQFBT/q','/images/h9BVg9XX.jpeg','127.0.0.1','本地登录','2025-11-21 14:13:31',1,'2022-08-06 23:40:44','2025-11-21 14:22:35'),(11,'小y','user','$2a$10$NBilHlToYRGVxza9YU5vXevB38SF/IJWI/Lfd.46hsBNJrZNqwMuC',NULL,'127.0.0.1','本地登录','2025-11-20 17:01:35',1,'2025-11-20 15:43:41','2025-11-20 17:10:05');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_info`
--

DROP TABLE IF EXISTS `user_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `email` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '用户邮箱',
  `phone` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '手机号码',
  `qq` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'QQ号码',
  `github` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'git hub地址',
  `gitee` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'git ee地址',
  `csdn` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'csdn账号',
  `leetcode` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'leetcode主页',
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '自我描述',
  PRIMARY KEY (`id`) USING BTREE,
  CONSTRAINT `fk_user_info_user` FOREIGN KEY (`id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_info`
--

LOCK TABLES `user_info` WRITE;
/*!40000 ALTER TABLE `user_info` DISABLE KEYS */;
INSERT INTO `user_info` VALUES (1,'1072876xxx@qq.com','18230133150','10728765','https://github.com','https://gitee.com','https://blog.csdn.net','https://leetcode.cn','大家好，我是小x'),(11,'user@example.com','13800138000',NULL,NULL,NULL,NULL,NULL,'大家好，我是小y');
/*!40000 ALTER TABLE `user_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_role`
--

DROP TABLE IF EXISTS `user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `user_id` int(11) DEFAULT NULL COMMENT '用户ID',
  `role_id` int(11) DEFAULT NULL COMMENT '角色ID',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `fk_user_role_user` (`user_id`),
  KEY `fk_user_role_role` (`role_id`),
  CONSTRAINT `fk_user_role_role` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_user_role_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

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

-- Dump completed on 2025-11-21 14:50:41
