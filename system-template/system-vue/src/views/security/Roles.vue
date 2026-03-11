<template>
  <div class="role-container">
    <el-card shadow="never">
      <div class="role-header">
        <div class="button-container">
          <el-button
            type="primary"
            plain
            icon="el-icon-plus"
            size="mini"
            @click="handleAdd"
          >
            新增
          </el-button>
        </div>
      </div>

      <div class="role-body">
        <el-table
          :data="roleList"
          :header-cell-style="{ background: '#f8f8f9', color: '#606266' }"
          ref="table"
          row-key="id"
          style="width: 100%"
          size="medium"
        >
          <el-table-column label="序号" width="60" align="center">
            <template slot-scope="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column prop="roleNameZh" label="角色名称" align="center">
          </el-table-column>
          <el-table-column prop="roleName" label="权限字符" align="center">
          </el-table-column>
          <el-table-column label="创建时间" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.createTime | dateFilter }}</span>
            </template>
          </el-table-column>
          <el-table-column label="上一次更新时间" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.updateTime | dateFilter }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                @click="handleUpdate(scope.row)"
                type="text"
                size="small"
                >编辑角色
              </el-button>
              <el-button
                v-if="scope.row.roleName != 'ROLE_admin'"
                @click="handlePermission(scope.row)"
                type="text"
                size="small"
                >分配权限
              </el-button>
              <el-button
                type="text"
                size="small"
                v-if="scope.row.roleName != 'ROLE_admin'"
                @click="handleDelete(scope.row)"
                >删除角色
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>

    <el-dialog
      :title="dialogTitle"
      width="500px"
      :visible="dialogShow"
      :before-close="handleClose"
    >
      <el-form>
        <el-form-item label="角色名称" label-width="80px">
          <el-input
            placeholder="请输入角色名称"
            v-model="role.roleNameZh"
          ></el-input>
        </el-form-item>
        <el-form-item label="权限字符" label-width="80px">
          <el-input v-model="role.roleName" placeholder="请输入权限字符">
            <!-- <template slot="prepend">ROLE_</template> -->
          </el-input>
        </el-form-item>
        <el-form-item label="创建时间" label-width="80px">
          <el-input
            placeholder="当前分类的创建时间"
            :value="dateFormat(role.createTime)"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="更新时间" label-width="80px">
          <el-input
            placeholder="当前分类的更新时间"
            :value="dateFormat(role.updateTime)"
            disabled
          ></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确定</el-button>
        <el-button @click="handleClose">取消</el-button>
      </span>
    </el-dialog>

    <!--  分配权限对话框  -->
    <el-dialog
      title="分配权限"
      width="500px"
      :visible="permissoionDialog"
      :before-close="handleClosePermission"
    >
      <el-tree
        ref="tree"
        :data="permissionData"
        show-checkbox
        node-key="id"
        style="margin-bottom: 20px"
        check-on-click-node
        default-expand-all
        :props="{ children: 'children', label: 'name' }"
      >
        <span class="custom-tree-node" slot-scope="{ data }">
          <svg-icon v-if="data.icon" :icon="data.icon"></svg-icon>
          <span style="margin-left: 5px">
            {{ data.name }}
          </span>
        </span>
      </el-tree>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="savePermission">确定</el-button>
        <el-button @click="handleClosePermission">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import dayjs from "dayjs";
import {
  getAllRoles,
  insertRole,
  updateRole,
  deleteRole,
  getAllPermission,
} from "@/api/security";

export default {
  name: "Roles",

  data() {
    return {
      // 当前登录的角色
      userRole: this.$store.getters.userInfo.roles[0].roleName,
      // 角色数据
      roleList: [],
      // 对话框是否显示
      dialogShow: false,
      // 对话框标题
      dialogTitle: "",
      // 单个角色数据
      role: {
        id: undefined,
        roleName: "",
        roleNameZh: "",
        permission: [],
        createTime: "",
        updateTime: "",
      },
      // 分配权限对话框
      permissoionDialog: false,
      // 权限数据
      permissionData: [],
    };
  },

  mounted() {
    this.getTableData();
  },

  methods: {
    // 获取表格数据
    getTableData() {
      getAllRoles().then((result) => {
        this.roleList = result;
      });
      // 获取权限数据
      this.getPermission();
    },

    // 获取所有权限数据
    getPermission() {
      getAllPermission().then((result) => {
        // 🔍 调试：打印后端返回的原始数据
        console.log('=== 后端返回的权限数据 ===');
        console.log('原始数据:', JSON.stringify(result, null, 2));
        console.log('数据类型:', typeof result);
        console.log('是否为数组:', Array.isArray(result));
        console.log('数组长度:', result ? result.length : 0);

        // 打印每个顶级菜单的详细信息
        if (result && Array.isArray(result)) {
          result.forEach((item, index) => {
            console.log(`顶级菜单 ${index + 1}:`, {
              id: item.id,
              name: item.name,
              path: item.path,
              icon: item.icon,
              parentId: item.parentId,
              children: item.children ? item.children.length : 0
            });

            // 打印子菜单
            if (item.children && item.children.length > 0) {
              item.children.forEach((child, childIndex) => {
                console.log(`  子菜单 ${childIndex + 1}:`, {
                  id: child.id,
                  name: child.name,
                  path: child.path
                });
              });
            }
          });
        }

        // 直接使用后端返回的树形数据
        this.permissionData = result || [];

        // 过滤掉不需要显示的菜单项
        this.permissionData = this.filterPermissionData(this.permissionData);

        // 打印过滤后的数据
        console.log('=== 过滤后的权限数据 ===');
        console.log('过滤后数据:', JSON.stringify(this.permissionData, null, 2));
      });
    },

    // 递归过滤权限数据，移除"菜单列表"和"接口文档"
    filterPermissionData(data) {
      if (!data || !Array.isArray(data)) {
        return [];
      }

      return data.map(item => {
        // 复制对象以避免修改原数据
        const newItem = { ...item };

        // 递归处理子节点
        if (newItem.children && newItem.children.length > 0) {
          newItem.children = newItem.children
            .filter(child => child.name !== '菜单列表' && child.name !== '接口文档')
            .map(child => this.filterPermissionData([child])[0])
            .filter(child => child !== undefined);
        }

        return newItem;
      });
    },

    // 点击添加按钮
    handleAdd() {
      this.dialogTitle = "新增角色";
      this.role.createTime = this.dateFormat(new Date());
      this.role.updateTime = this.dateFormat(new Date());
      this.dialogShow = true;
    },
    // 点击删除按钮
    handleDelete(row) {
      this.$confirm("确定删除 " + row.roleNameZh + " 吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 执行删除操作
          deleteRole(row.id).then(() => {
            // 重新获取表格数据
            this.getTableData();
          });
        })
        .catch(() => {});
    },
    // 点击更新按钮
    handleUpdate(row) {
      this.dialogTitle = "更新角色";
      this.role = row;
      this.dialogShow = true;
    },
    // 关闭对话框
    handleClose() {
      this.dialogShow = false;
      this.reset();
    },
    // 点击提交按钮
    submitForm() {
      this.dialogShow = false;
      // 如果存在ID则说明为更新操作
      if (this.role.id) {
        updateRole(this.role).then(() => {
          this.getTableData();
        });
      } else {
        // 不存在ID则说明为新增操作
        insertRole(this.role).then(() => {
          this.getTableData();
        });
      }
    },

    // 刷新表单数据
    reset() {
      // 修改表单标题
      this.dialogTitle = "";
      // 重置表单对象
      this.role = {};
    },
    // 点击分配权限对话框
    handlePermission(row) {
      this.role = row;
      this.permissoionDialog = true;
      // this.permissionList = this.getUserPermission(row.permission);
      this.$nextTick(() => {
        // 设置选中的节点
        // this.$refs.tree.setCheckedKeys(row.permission);
        this.$refs.tree.setCheckedKeys(this.role.permission);
      });
    },
    // 点击确定分配权限
    savePermission() {
      // 获取选中的叶子节点和半选中的父节点
      const checkedKeys = this.$refs.tree.getCheckedKeys(); // 完全选中的节点
      const halfCheckedKeys = this.$refs.tree.getHalfCheckedKeys(); // 半选中的父节点

      // 合并所有节点ID，过滤掉应用中心的父节点ID (100)
      this.role.permission = [...checkedKeys, ...halfCheckedKeys]
        .filter((id) => id !== 100 && id !== 1); // 过滤掉应用中心父节点(100)和根节点(1)

      this.submitForm();
      // 关闭对话框
      this.handleClosePermission();
    },

    // 关闭分配权限对话框
    handleClosePermission() {
      this.permissoionDialog = false;
      // 重新获取权限数据
      this.getPermission();
    },
    // 格式化时间
    dateFormat(date) {
      // 使用 dayjs 处理时间
      return dayjs(date).format("YYYY-MM-DD HH:mm:ss");
    },
  },
};
</script>

<style lang="scss" scoped>
.role-container {
  margin-top: 10px;

  .role-header {
    margin-top: 10px;
    padding-left: 15px;
  }

  .role-body {
    margin: 20px 15px 30px 15px;
  }
}
</style>
