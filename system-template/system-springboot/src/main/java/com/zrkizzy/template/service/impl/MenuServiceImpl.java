package com.zrkizzy.template.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.zrkizzy.template.vo.MenuVO;
import com.zrkizzy.template.dto.PermissionDTO;
import com.zrkizzy.template.entity.Menu;
import com.zrkizzy.template.entity.Role;
import com.zrkizzy.template.mapper.MenuMapper;
import com.zrkizzy.template.mapper.RoleMapper;
import com.zrkizzy.template.service.IMenuService;
import com.zrkizzy.template.utils.BeanCopyUtil;
import com.zrkizzy.template.utils.UserUtil;
import com.zrkizzy.template.dto.MenuDTO;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

/**
 * @author zhangrongkang
 * @date 2022/8/12
 */
@Service
public class MenuServiceImpl implements IMenuService {
    @Resource
    private MenuMapper menuMapper;
    @Resource
    private RoleMapper roleMapper;
    @Resource
    private RedisTemplate<String, Object> redisTemplate;

    /**
     * 根据角色获取菜单列表
     *
     * @return 菜单列表
     */
    @Override
    public List<Menu> getMenuWithRole() {
        ValueOperations<String, Object> valueOperations = redisTemplate.opsForValue();
        // Redis中拉取菜单数据
        List<Menu> roleMenus = BeanCopyUtil.castObjectToList(valueOperations.get("roleMenus"), Menu.class);
        // 查看从Redis中拉取到的菜单数据是否存在
        if (CollectionUtils.isEmpty(roleMenus)) {
            // 首先获取到管理员到权限(管理员具备所有权限)
            Role role = roleMapper.selectById(1);
            // 根据管理员具有到权限ID进行查询
            List<Integer> ids = UserUtil.getPermissionByString(role.getPermission());
            // 如果不存在则从数据库中拉取
            roleMenus = menuMapper.getMenuWithRole(ids);
            // 将从数据库中拉取到的数据添加到Redis中
            valueOperations.set("roleMenus", roleMenus);
        }
        return roleMenus;
    }

    /**
     * 根据菜单名称和菜单状态获取符合条件的所有菜单
     *
     * @param menuDTO 菜单参数对象
     * @return 菜单列表
     */
    @Override
    public List<MenuVO> getAllMenus(MenuDTO menuDTO) {
        QueryWrapper<Menu> queryWrapper = new QueryWrapper<>();
        // 定义查询条件
        queryWrapper.ne("component", "/");
        if (null != menuDTO.getName() && !"".equals(menuDTO.getName())) {
            queryWrapper.like("name", menuDTO.getName());
        }
        // 如果查询的是禁用的菜单
        if (!menuDTO.getEnabled()) {
            queryWrapper.eq("enabled", menuDTO.getEnabled());
        }
        // 查询出所有符合条件的菜单集合并转为 MenuDto 集合
        List<MenuVO> menuList = BeanCopyUtil.copyList(menuMapper.selectList(queryWrapper), MenuVO.class);
        // 将查询出的菜单设置子集
        menuList = setMenuChildren(1, menuList);
        // 返回菜单集合
        return menuList;
    }

    /**
     * 获取角色权限
     *
     * @return 所有角色权限
     */
    @Override
    public List<PermissionDTO> getAllPermission() {
        List<PermissionDTO> permissionList = roleMapper.getAllPermission();

        // 🔍 调试日志：查看从数据库获取的原始数据
        System.out.println("=== 从数据库获取的原始权限数据 ===");
        System.out.println("总数: " + (permissionList != null ? permissionList.size() : 0));
        if (permissionList != null) {
            for (PermissionDTO p : permissionList) {
                System.out.println(String.format("ID: %d, ParentID: %d, Name: %s, Path: %s, Icon: %s",
                    p.getId(), p.getParentId(), p.getName(), p.getPath(), p.getIcon()));
            }
        }

        // 如果数据为空，返回空列表
        if (permissionList == null || permissionList.isEmpty()) {
            return new ArrayList<>();
        }

        // 构建树形结构：找出所有根节点（parentId = 1）
        List<PermissionDTO> result = new ArrayList<>();
        for (PermissionDTO permission : permissionList) {
            // 只添加顶级菜单（parentId = 1 且 path != "/"）
            if (permission.getParentId() != null && permission.getParentId() == 1) {
                // 递归设置子节点
                permission.setChildren(buildChildren(permission.getId(), permissionList));
                result.add(permission);
            }
        }

        // 🔍 调试日志：查看构建后的树形结构
        System.out.println("=== 构建后的树形结构 ===");
        System.out.println("根节点数: " + result.size());
        for (PermissionDTO root : result) {
            System.out.println(String.format("根节点: ID=%d, Name=%s, 子节点数=%d",
                root.getId(), root.getName(),
                root.getChildren() != null ? root.getChildren().size() : 0));
            if (root.getChildren() != null) {
                for (PermissionDTO child : root.getChildren()) {
                    System.out.println(String.format("  子节点: ID=%d, Name=%s", child.getId(), child.getName()));
                }
            }
        }

        return result;
    }

    /**
     * 递归构建子节点
     *
     * @param parentId 父节点ID
     * @param allPermissions 所有权限列表
     * @return 子节点列表
     */
    private List<PermissionDTO> buildChildren(Integer parentId, List<PermissionDTO> allPermissions) {
        List<PermissionDTO> children = new ArrayList<>();
        for (PermissionDTO permission : allPermissions) {
            // 找到所有父ID等于当前ID的节点
            if (permission.getParentId() != null && permission.getParentId().equals(parentId)) {
                // 递归设置该节点的子节点
                permission.setChildren(buildChildren(permission.getId(), allPermissions));
                children.add(permission);
            }
        }
        return children;
    }

    /**
     * 根据查询出的菜单集合封装每个菜单的子菜单
     *
     * @param id       当前menu的父ID
     * @param menuList 所有菜单对象的集合
     * @return 封装好的菜单集合
     */
    private List<MenuVO> setMenuChildren(Integer id, List<MenuVO> menuList) {
        // 存储菜单的集合
        List<MenuVO> childrenList = new ArrayList<>();
        // 遍历所有的菜单集合
        for (MenuVO menu : menuList) {
            // 如果当前Menu的父ID与传来的ID相同则添加到菜单集合中
            if (menu.getParentId().equals(id)) {
                childrenList.add(menu);
            }
        }
        // 递归获取并设置所有子菜单
        for (MenuVO menu : childrenList) {
            menu.setChildren(setMenuChildren(menu.getId(), menuList));
        }
        // 如果当前菜单没有子菜单则返回一个空的集合
        if (childrenList.size() == 0) {
            return new ArrayList<>();
        }
        // 将封装好的菜单集合返回
        return childrenList;
    }
}
