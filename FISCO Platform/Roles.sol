pragma solidity ^0.4.24;

// 角色管理工具库，用于跟踪地址是否拥有某个角色
library Roles {
    
    // 定义一个角色结构体，内部使用 mapping 记录哪些地址拥有该角色
    struct Role {
        mapping (address => bool) bearer; // 记录是否拥有该角色
    }

    // 为某地址添加角色
    function add(Role storage role, address account) internal {
        // 要求该地址之前没有该角色
        require(!has(role, account), "Roles: account already has role");

        // 将该地址标记为已拥有该角色
        role.bearer[account] = true;
    }

    // 移除某地址的角色
    function remove(Role storage role, address account) internal {
        // 要求该地址当前拥有该角色
        require(has(role, account), "Roles: account does not have role");

        // 设置为 false，表示移除角色
        role.bearer[account] = false;
    }

    // 查询某地址是否拥有角色
    function has(Role storage role, address account) internal view returns (bool) {
        // 要求地址不是零地址，避免无效访问
        require(account != address(0), "Roles: account is the zero address");

        // 返回是否拥有角色
        return role.bearer[account];
    }
}