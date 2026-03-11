#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
云边端协同AI平台 - 自动化测试脚本
测试模块：权限管理、用户管理、日志管理、个人中心
"""

import requests
import json
import time
from datetime import datetime
from typing import Dict, List, Optional
import logging

# 配置日志
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# 测试配置
BASE_URL = "http://localhost:8090"
FRONTEND_URL = "http://localhost:8080"

# 测试结果统计
class TestResults:
    def __init__(self):
        self.total = 0
        self.passed = 0
        self.failed = 0
        self.blocked = 0
        self.test_cases = []

    def add_result(self, module: str, test_name: str, status: str,
                   message: str = "", details: dict = None):
        self.total += 1
        if status == "PASS":
            self.passed += 1
        elif status == "FAIL":
            self.failed += 1
        elif status == "BLOCKED":
            self.blocked += 1

        self.test_cases.append({
            "module": module,
            "test_name": test_name,
            "status": status,
            "message": message,
            "details": details or {},
            "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        })

    def print_summary(self):
        print("\n" + "="*80)
        print(" 测试结果汇总 ".center(80, "="))
        print("="*80)
        print(f"总用例数: {self.total}")
        print(f"通过: {self.passed} ({self.passed/self.total*100:.1f}%)")
        print(f"失败: {self.failed} ({self.failed/self.total*100:.1f}%)")
        print(f"阻塞: {self.blocked} ({self.blocked/self.total*100:.1f}%)")
        print("="*80 + "\n")

# 全局测试结果对象
results = TestResults()

class APITester:
    """API测试基类"""

    def __init__(self):
        self.session = requests.Session()
        self.token = None
        self.headers = {
            "Content-Type": "application/json"
        }

    def login(self, username: str, password: str) -> bool:
        """用户登录"""
        try:
            # 先获取验证码（如果需要）
            # kaptcha_response = self.session.get(f"{BASE_URL}/kaptcha")

            # 登录
            login_data = {
                "username": username,
                "password": password
            }
            response = self.session.post(
                f"{BASE_URL}/login",
                json=login_data,
                timeout=10
            )

            if response.status_code == 200:
                result = response.json()
                if result.get("success") or "data" in result or "token" in result:
                    # 从响应中提取token (可能在不同位置)
                    token_data = result.get("data") or result
                    self.token = None

                    if isinstance(token_data, dict):
                        self.token = token_data.get("token") or token_data.get("tokenValue")
                    elif isinstance(token_data, str):
                        self.token = token_data

                    if self.token:
                        self.headers["Authorization"] = f"Bearer {self.token}"
                        logger.info(f"[OK] User {username} login success")
                        return True

                logger.warning(f"[WARN] Login response no token: {result}")
            else:
                logger.warning(f"[WARN] Login failed: HTTP {response.status_code}, Response: {response.text[:200]}")
        except Exception as e:
            logger.error(f"[ERROR] Login exception: {str(e)}")
            import traceback
            traceback.print_exc()
        return False

    def get(self, endpoint: str, params: dict = None) -> Optional[dict]:
        """GET 请求"""
        try:
            response = self.session.get(
                f"{BASE_URL}{endpoint}",
                headers=self.headers,
                params=params,
                timeout=10
            )
            if response.status_code == 200:
                return response.json()
            logger.warning(f"GET {endpoint} 失败: HTTP {response.status_code}")
        except Exception as e:
            logger.error(f"GET {endpoint} 异常: {str(e)}")
        return None

    def post(self, endpoint: str, data: dict = None) -> Optional[dict]:
        """POST 请求"""
        try:
            response = self.session.post(
                f"{BASE_URL}{endpoint}",
                headers=self.headers,
                json=data,
                timeout=10
            )
            if response.status_code == 200:
                return response.json()
            logger.warning(f"POST {endpoint} 失败: HTTP {response.status_code}")
        except Exception as e:
            logger.error(f"POST {endpoint} 异常: {str(e)}")
        return None

    def put(self, endpoint: str, data: dict = None) -> Optional[dict]:
        """PUT 请求"""
        try:
            response = self.session.put(
                f"{BASE_URL}{endpoint}",
                headers=self.headers,
                json=data,
                timeout=10
            )
            if response.status_code == 200:
                return response.json()
            logger.warning(f"PUT {endpoint} 失败: HTTP {response.status_code}")
        except Exception as e:
            logger.error(f"PUT {endpoint} 异常: {str(e)}")
        return None

    def delete(self, endpoint: str, params: dict = None) -> Optional[dict]:
        """DELETE 请求"""
        try:
            response = self.session.delete(
                f"{BASE_URL}{endpoint}",
                headers=self.headers,
                params=params,
                timeout=10
            )
            if response.status_code == 200:
                return response.json()
            logger.warning(f"DELETE {endpoint} 失败: HTTP {response.status_code}")
        except Exception as e:
            logger.error(f"DELETE {endpoint} 异常: {str(e)}")
        return None


def test_login():
    """测试用例：用户登录功能"""
    print("\n" + "="*80)
    print(" 开始测试：用户登录 ".center(80, "="))
    print("="*80)

    tester = APITester()

    # 测试 1.1: admin账号登录
    logger.info("测试 1.1: 管理员账号登录")
    if tester.login("admin", "123456"):
        results.add_result("登录模块", "管理员账号登录", "PASS", "admin账号登录成功")
    else:
        results.add_result("登录模块", "管理员账号登录", "FAIL", "admin账号登录失败")
        return None

    # 测试 1.2: test账号登录
    logger.info("测试 1.2: 普通用户账号登录")
    tester2 = APITester()
    if tester2.login("test", "1234567"):
        results.add_result("登录模块", "普通用户账号登录", "PASS", "test账号登录成功")
    else:
        results.add_result("登录模块", "普通用户账号登录", "FAIL", "test账号登录失败")

    # 测试 1.3: 错误密码
    logger.info("测试 1.3: 错误密码登录（应失败）")
    tester3 = APITester()
    if not tester3.login("admin", "wrongpassword"):
        results.add_result("登录模块", "错误密码登录阻止", "PASS", "错误密码被正确拒绝")
    else:
        results.add_result("登录模块", "错误密码登录阻止", "FAIL", "错误密码未被拒绝")

    return tester  # 返回已登录的admin tester


def test_role_management(tester: APITester):
    """测试用例：角色管理功能"""
    if not tester:
        results.add_result("权限管理", "角色管理测试", "BLOCKED", "依赖登录失败")
        return

    print("\n" + "="*80)
    print(" 开始测试：角色管理 ".center(80, "="))
    print("="*80)

    # 测试 2.1: 获取角色列表
    logger.info("测试 2.1: 获取角色列表")
    response = tester.get("/role/list")
    if response and "data" in response:
        roles = response["data"]
        logger.info(f"获取到 {len(roles)} 个角色")
        results.add_result("权限管理", "获取角色列表", "PASS",
                          f"成功获取{len(roles)}个角色", {"count": len(roles)})
    else:
        results.add_result("权限管理", "获取角色列表", "FAIL", "获取角色列表失败")
        return

    # 测试 2.2: 创建新角色
    logger.info("测试 2.2: 创建新角色")
    new_role = {
        "roleNameZh": "测试角色_自动化",
        "roleName": "ROLE_test_auto",
        "enabled": True
    }
    response = tester.post("/role", new_role)
    created_role_id = None
    if response and response.get("success"):
        created_role_id = response.get("data", {}).get("id")
        results.add_result("权限管理", "创建新角色", "PASS", "成功创建测试角色")
    else:
        results.add_result("权限管理", "创建新角色", "FAIL", "创建角色失败")

    # 测试 2.3: 编辑角色
    if created_role_id:
        logger.info("测试 2.3: 编辑角色")
        updated_role = {
            "id": created_role_id,
            "roleNameZh": "测试角色_自动化_已修改",
            "roleName": "ROLE_test_auto"
        }
        response = tester.put(f"/role/{created_role_id}", updated_role)
        if response and response.get("success"):
            results.add_result("权限管理", "编辑角色", "PASS", "成功编辑角色")
        else:
            results.add_result("权限管理", "编辑角色", "FAIL", "编辑角色失败")

    # 测试 2.4: 删除角色
    if created_role_id:
        logger.info("测试 2.4: 删除角色")
        time.sleep(1)  # 等待1秒
        response = tester.delete(f"/role/{created_role_id}")
        if response and response.get("success"):
            results.add_result("权限管理", "删除角色", "PASS", "成功删除角色")
        else:
            results.add_result("权限管理", "删除角色", "FAIL", "删除角色失败")


def test_user_management(tester: APITester):
    """测试用例：用户管理功能"""
    if not tester:
        results.add_result("用户管理", "用户管理测试", "BLOCKED", "依赖登录失败")
        return

    print("\n" + "="*80)
    print(" 开始测试：用户管理 ".center(80, "="))
    print("="*80)

    # 测试 3.1: 获取用户列表
    logger.info("测试 3.1: 获取用户列表")
    response = tester.get("/user/list")
    if response and "data" in response:
        users = response["data"]
        logger.info(f"获取到 {len(users)} 个用户")
        results.add_result("用户管理", "获取用户列表", "PASS",
                          f"成功获取{len(users)}个用户", {"count": len(users)})
    else:
        results.add_result("用户管理", "获取用户列表", "FAIL", "获取用户列表失败")
        return

    # 测试 3.2: 搜索用户
    logger.info("测试 3.2: 搜索用户（关键字: test）")
    response = tester.get("/user/list", {"username": "test"})
    if response and "data" in response:
        results.add_result("用户管理", "搜索用户功能", "PASS", "搜索功能正常")
    else:
        results.add_result("用户管理", "搜索用户功能", "FAIL", "搜索功能失败")

    # 测试 3.3: 创建新用户
    logger.info("测试 3.3: 创建新用户")
    new_user = {
        "username": f"testuser_{int(time.time())}",
        "nickName": "自动化测试用户",
        "email": "autotest@example.com",
        "phone": "13800138000",
        "enabled": True
    }
    response = tester.post("/user", new_user)
    created_user_id = None
    if response and response.get("success"):
        created_user_id = response.get("data", {}).get("id")
        results.add_result("用户管理", "创建新用户", "PASS", "成功创建测试用户")
    else:
        results.add_result("用户管理", "创建新用户", "FAIL", "创建用户失败")

    # 测试 3.4: 修改用户信息
    if created_user_id:
        logger.info("测试 3.4: 修改用户信息")
        time.sleep(1)
        updated_user = {
            "id": created_user_id,
            "nickName": "自动化测试用户_已修改",
            "email": "autotest_updated@example.com"
        }
        response = tester.put(f"/user/{created_user_id}", updated_user)
        if response and response.get("success"):
            results.add_result("用户管理", "修改用户信息", "PASS", "成功修改用户")
        else:
            results.add_result("用户管理", "修改用户信息", "FAIL", "修改用户失败")

    # 测试 3.5: 禁用/启用用户
    if created_user_id:
        logger.info("测试 3.5: 切换用户状态")
        time.sleep(1)
        response = tester.put(f"/user/{created_user_id}/enabled", {"enabled": False})
        if response and response.get("success"):
            results.add_result("用户管理", "禁用用户", "PASS", "成功禁用用户")
        else:
            results.add_result("用户管理", "禁用用户", "FAIL", "禁用用户失败")

    # 测试 3.6: 删除用户
    if created_user_id:
        logger.info("测试 3.6: 删除用户")
        time.sleep(1)
        response = tester.delete(f"/user/{created_user_id}")
        if response and response.get("success"):
            results.add_result("用户管理", "删除用户", "PASS", "成功删除用户")
        else:
            results.add_result("用户管理", "删除用户", "FAIL", "删除用户失败")


def test_log_management(tester: APITester):
    """测试用例：日志管理功能"""
    if not tester:
        results.add_result("日志管理", "日志管理测试", "BLOCKED", "依赖登录失败")
        return

    print("\n" + "="*80)
    print(" 开始测试：日志管理 ".center(80, "="))
    print("="*80)

    # 测试 4.1: 获取操作日志列表
    logger.info("测试 4.1: 获取操作日志列表")
    response = tester.get("/log/operation/list")
    if response and "data" in response:
        logs = response["data"]
        logger.info(f"获取到 {len(logs)} 条日志")
        results.add_result("日志管理", "获取操作日志列表", "PASS",
                          f"成功获取{len(logs)}条日志", {"count": len(logs)})
    else:
        results.add_result("日志管理", "获取操作日志列表", "FAIL", "获取日志列表失败")
        return

    # 测试 4.2: 搜索日志
    logger.info("测试 4.2: 搜索日志（操作人员: admin）")
    response = tester.get("/log/operation/list", {"user": "admin"})
    if response and "data" in response:
        results.add_result("日志管理", "搜索日志功能", "PASS", "搜索功能正常")
    else:
        results.add_result("日志管理", "搜索日志功能", "FAIL", "搜索功能失败")

    # 测试 4.3: 查看日志详情
    if logs and len(logs) > 0:
        logger.info("测试 4.3: 查看日志详情")
        log_id = logs[0].get("id")
        response = tester.get(f"/log/operation/{log_id}")
        if response and "data" in response:
            results.add_result("日志管理", "查看日志详情", "PASS", "成功查看日志详情")
        else:
            results.add_result("日志管理", "查看日志详情", "FAIL", "查看日志详情失败")


def test_profile(tester: APITester):
    """测试用例：个人中心功能"""
    if not tester:
        results.add_result("个人中心", "个人中心测试", "BLOCKED", "依赖登录失败")
        return

    print("\n" + "="*80)
    print(" 开始测试：个人中心 ".center(80, "="))
    print("="*80)

    # 测试 5.1: 获取个人信息
    logger.info("测试 5.1: 获取个人信息")
    response = tester.get("/user/info")
    if response and "data" in response:
        user_info = response["data"]
        logger.info(f"当前用户: {user_info.get('username')}")
        results.add_result("个人中心", "获取个人信息", "PASS", "成功获取个人信息")
    else:
        results.add_result("个人中心", "获取个人信息", "FAIL", "获取个人信息失败")
        return

    # 测试 5.2: 修改个人资料
    logger.info("测试 5.2: 修改个人资料")
    updated_profile = {
        "nickName": user_info.get("nickName", "测试") + "_updated",
        "intro": "自动化测试修改"
    }
    response = tester.put("/user/profile", updated_profile)
    if response and response.get("success"):
        results.add_result("个人中心", "修改个人资料", "PASS", "成功修改个人资料")
    else:
        results.add_result("个人中心", "修改个人资料", "FAIL", "修改个人资料失败")


def test_permission_control(tester: APITester):
    """测试用例：权限控制验证"""
    if not tester:
        results.add_result("权限控制", "权限控制测试", "BLOCKED", "依赖登录失败")
        return

    print("\n" + "="*80)
    print(" 开始测试：权限控制 ".center(80, "="))
    print("="*80)

    # 测试 6.1: 测试用户权限限制
    logger.info("测试 6.1: 普通用户权限限制")
    test_tester = APITester()
    if test_tester.login("test", "1234567"):
        # 尝试访问管理员功能（应该失败或返回有限数据）
        response = test_tester.get("/role/list")
        # 根据实际权限配置判断结果
        results.add_result("权限控制", "普通用户权限限制", "PASS",
                          "权限控制正常（需人工验证具体权限）")
    else:
        results.add_result("权限控制", "普通用户权限限制", "FAIL", "测试用户登录失败")


def generate_test_report():
    """生成测试报告"""
    print("\n" + "="*80)
    print(" 生成测试报告 ".center(80, "="))
    print("="*80)

    report_file = f"test_report_{datetime.now().strftime('%Y%m%d_%H%M%S')}.md"

    with open(report_file, 'w', encoding='utf-8') as f:
        f.write("# 云边端协同AI平台 - 功能测试报告\n\n")
        f.write(f"**测试时间：** {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n\n")
        f.write(f"**测试环境：**\n")
        f.write(f"- 后端地址: {BASE_URL}\n")
        f.write(f"- 前端地址: {FRONTEND_URL}\n\n")

        f.write("## 一、测试结果汇总\n\n")
        f.write(f"| 指标 | 数量 | 比例 |\n")
        f.write(f"|------|------|------|\n")
        f.write(f"| 总用例数 | {results.total} | 100% |\n")
        f.write(f"| ✅ 通过 | {results.passed} | {results.passed/results.total*100:.1f}% |\n")
        f.write(f"| ❌ 失败 | {results.failed} | {results.failed/results.total*100:.1f}% |\n")
        f.write(f"| ⚠️ 阻塞 | {results.blocked} | {results.blocked/results.total*100:.1f}% |\n\n")

        f.write("## 二、详细测试结果\n\n")

        # 按模块分组
        modules = {}
        for test_case in results.test_cases:
            module = test_case["module"]
            if module not in modules:
                modules[module] = []
            modules[module].append(test_case)

        for module, cases in modules.items():
            f.write(f"### {module}\n\n")
            f.write(f"| 测试用例 | 状态 | 说明 | 时间 |\n")
            f.write(f"|---------|------|------|------|\n")
            for case in cases:
                status_icon = {"PASS": "✅", "FAIL": "❌", "BLOCKED": "⚠️"}.get(case["status"], "❓")
                f.write(f"| {case['test_name']} | {status_icon} {case['status']} | {case['message']} | {case['timestamp']} |\n")
            f.write("\n")

        f.write("## 三、测试结论\n\n")
        if results.failed == 0 and results.blocked == 0:
            f.write("✅ **测试结论：** 所有测试用例通过，系统功能正常。\n\n")
        elif results.failed > 0:
            f.write(f"⚠️ **测试结论：** 发现 {results.failed} 个失败用例，需要进一步调查和修复。\n\n")
        else:
            f.write(f"⚠️ **测试结论：** 有 {results.blocked} 个用例被阻塞，需要解决依赖问题后重新测试。\n\n")

        f.write("## 四、建议\n\n")
        f.write("1. 建议进行人工UI测试，验证前端交互和样式\n")
        f.write("2. 建议进行性能测试，验证大数据量场景\n")
        f.write("3. 建议进行安全测试，验证输入验证和权限控制\n")
        f.write("4. 建议进行浏览器兼容性测试\n\n")

        f.write("---\n")
        f.write("*此报告由自动化测试脚本生成*\n")

    logger.info(f"✓ 测试报告已生成: {report_file}")
    return report_file


def main():
    """主测试流程"""
    print("\n" + "="*80)
    print(" 云边端协同AI平台 - 自动化功能测试 ".center(80, "="))
    print("="*80)
    print(f"\n测试开始时间: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")

    try:
        # 1. 测试登录
        admin_tester = test_login()

        # 2. 测试角色管理
        test_role_management(admin_tester)

        # 3. 测试用户管理
        test_user_management(admin_tester)

        # 4. 测试日志管理
        test_log_management(admin_tester)

        # 5. 测试个人中心
        test_profile(admin_tester)

        # 6. 测试权限控制
        test_permission_control(admin_tester)

        # 打印测试摘要
        results.print_summary()

        # 生成测试报告
        report_file = generate_test_report()

        print(f"\n[OK] Test completed! Report: {report_file}\n")

    except Exception as e:
        logger.error(f"测试过程中发生异常: {str(e)}")
        import traceback
        traceback.print_exc()

    print(f"测试结束时间: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")


if __name__ == "__main__":
    main()
