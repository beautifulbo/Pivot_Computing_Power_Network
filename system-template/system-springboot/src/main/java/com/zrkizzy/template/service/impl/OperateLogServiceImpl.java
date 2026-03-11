package com.zrkizzy.template.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.zrkizzy.template.entity.OperateLog;
import com.zrkizzy.template.mapper.OperateLogMapper;
import com.zrkizzy.template.service.IOperateLogService;
import com.zrkizzy.template.vo.PageVO;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author zhangrongkang
 * @since 2022-09-03
 */
@Service
public class OperateLogServiceImpl extends ServiceImpl<OperateLogMapper, OperateLog> implements IOperateLogService {
    @Resource
    private OperateLogMapper operateLogMapper;

    /**
     * 获取操作日志列表
     *
     * @param curPage 当前页数
     * @param size 页面大小
     * @param nickName 用户名
     * @param module 系统模块
     * @return 分页对象
     */
    @Override
    public PageVO getOperateLogList(Integer curPage, Integer size, String nickName, String module) {
        // 开启分页
        Page<OperateLog> page = new Page<>(curPage, size);
        // 定义查询条件
        QueryWrapper<OperateLog> queryWrapper = new QueryWrapper<>();
        // 只在参数不为空时添加查询条件
        if (nickName != null && !nickName.trim().isEmpty()) {
            queryWrapper.like("user", nickName);
        }
        if (module != null && !module.trim().isEmpty()) {
            queryWrapper.like("module", module);
        }
        // 按操作时间倒序排列，最新的在前面
        queryWrapper.orderByDesc("operate_time");
        // 查询数据库
        Page<OperateLog> logPage = operateLogMapper.selectPage(page, queryWrapper);
        // 返回分页对象
        return new PageVO(logPage.getTotal(), logPage.getRecords());
    }
}
