package com.zrkizzy.template.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.zrkizzy.template.entity.UserRole;
import com.zrkizzy.template.mapper.UserRoleMapper;
import com.zrkizzy.template.service.IUserRoleService;
import com.zrkizzy.template.vo.Result;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;

/**
 * @author zhangrongkang
 * @date 2022/8/7
 */
@Service
public class UserRoleServiceImpl implements IUserRoleService {

    @Resource
    private UserRoleMapper userRoleMapper;

    /**
     * 根据用户ID获取角色ID
     *
     * @param userId 用户ID
     * @return 角色ID
     */
    @Override
    public Integer getRoleByUserId(Integer userId) {
        UserRole userRole = userRoleMapper.selectOne(new QueryWrapper<UserRole>().eq("user_id", userId));
        return userRole != null ? userRole.getRoleId() : null;
    }

    /**
     * 更新用户的角色
     *
     * @param userId 用户ID
     * @param roleId 角色ID
     * @return 前端响应对象
     */
    @Transactional(rollbackFor = RuntimeException.class)
    @Override
    public Result updateUserRole(Integer userId, Integer roleId) {
        // 根据user_id查询用户角色关联
        UserRole userRole = userRoleMapper.selectOne(new QueryWrapper<UserRole>().eq("user_id", userId));

        // 如果用户还没有分配角色，则新增记录
        if (userRole == null) {
            userRole = new UserRole();
            userRole.setUserId(userId);
            userRole.setRoleId(roleId);
            int count = userRoleMapper.insert(userRole);
            if (count > 0) {
                return Result.success("分配角色成功");
            }
        } else {
            // 如果用户已有角色，则更新角色
            userRole.setRoleId(roleId);
            int count = userRoleMapper.updateById(userRole);
            if (count > 0) {
                return Result.success("更新角色成功");
            }
        }
        return Result.error("操作失败");
    }
}
