<template>
  <div class="sidebar-container">
    <perfect-scrollbar ref="scrollbar">
      <el-menu
        :default-active="activeMenu"
        background-color="transparent"
        text-color="rgba(255, 255, 255, 0.7)"
        active-text-color="#5eead4"
        :collapse="this.$store.getters.isCollapse"
        router
      >
        <sidebar-item
          v-for="item in routes"
          :key="item.path"
          :route="item"
        ></sidebar-item>
      </el-menu>
    </perfect-scrollbar>
  </div>
</template>

<script>
import SidebarItem from "./SidebarItem.vue";
import { filterRoutes, generateMenus } from "@/utils/route";

export default {
  name: "SidebarMenu",
  components: { SidebarItem },
  data() {
    return {};
  },

  mounted() {},
  computed: {
    activeMenu() {
      const { path } = this.$route;
      return path;
    },
    // 监视当路由是否发生变化
    routes() {
      const filteRoutes = filterRoutes(this.$router.options.routes);
      return generateMenus(filteRoutes);
    },
  },
};
</script>

<style lang="scss">
// 全局样式（不使用 scoped）
.sidebar-container {
  .el-menu {
    border: none;
    overflow: visible;

    .el-menu-item,
    .el-submenu__title {
      position: relative;
      height: 50px;
      line-height: 50px;
      margin: 0px 5px 5px 5px;
      padding-right: 0px !important;
      border-radius: 6px;
      transition: all 0.3s ease;
      border-left: 3px solid transparent;

      &:hover {
        background: rgba(94, 234, 212, 0.1) !important;
        border-left-color: rgba(94, 234, 212, 0.6);
        box-shadow: 0 0 15px rgba(94, 234, 212, 0.2);

        .svg-icon,
        i {
          color: #5eead4;
          filter: drop-shadow(0 0 8px rgba(94, 234, 212, 0.8));
        }
      }

      &.is-active {
        background: linear-gradient(90deg,
          rgba(94, 234, 212, 0.15) 0%,
          rgba(94, 234, 212, 0.05) 100%
        ) !important;
        border-left-color: #5eead4;
        box-shadow:
          0 0 20px rgba(94, 234, 212, 0.3),
          inset 0 0 10px rgba(94, 234, 212, 0.1);

        .svg-icon,
        i {
          color: #5eead4;
          filter: drop-shadow(0 0 10px rgba(94, 234, 212, 1));
        }

        &::before {
          content: '';
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          width: 0;
          height: 0;
          border-top: 6px solid transparent;
          border-bottom: 6px solid transparent;
          border-left: 6px solid #5eead4;
          filter: drop-shadow(0 0 5px rgba(94, 234, 212, 0.8));
        }
      }

      .svg-icon,
      i {
        margin-right: 12px;
        transition: all 0.3s ease;
      }
    }

    // 子菜单样式
    .el-submenu {
      .el-menu-item {
        padding-left: 32px !important;
        padding-right: 8px !important;
        margin: 3px 3px 3px 8px !important;
        background: rgba(0, 0, 0, 0.1);
        border-radius: 6px;
        max-width: calc(100% - 11px);
        box-sizing: border-box;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        &::before {
          content: '';
          position: absolute;
          left: 15px;
          top: 50%;
          transform: translateY(-50%);
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(94, 234, 212, 0.4);
          transition: all 0.3s ease;
        }

        &:hover::before {
          background: #5eead4;
          box-shadow: 0 0 8px rgba(94, 234, 212, 0.8);
        }

        &.is-active::before {
          background: #5eead4;
          box-shadow:
            0 0 10px rgba(94, 234, 212, 1),
            0 0 20px rgba(94, 234, 212, 0.5);
          animation: pulse-submenu-dot 2s ease-in-out infinite;
        }
      }
    }

    // 展开的子菜单（关键！这个才是子菜单项的直接父容器）
    .el-menu--inline {
      background: rgba(10, 14, 39, 0.5) !important;
      border-left: 1px solid rgba(94, 234, 212, 0.2);
      margin-left: 5px;
      margin-right: 10px;
      padding-right: 0px;
      max-width: calc(100% - 15px);
      min-width: 0 !important; // 覆盖 Element UI 默认的 min-width
      box-sizing: border-box;

      // 重要！直接定位内联菜单中的菜单项
      .el-menu-item {
        padding-left: 25px !important;
        padding-right: 5px !important;
        margin: 3px 7px 3px 8px !important;
        background: rgba(0, 0, 0, 0.1) !important;
        border-radius: 6px !important;
        max-width: calc(100% - 15px) !important;
        min-width: 0 !important; // 覆盖 Element UI 默认的 min-width: 200px
        box-sizing: border-box !important;
        overflow: hidden !important;
        text-overflow: ellipsis !important;
        white-space: nowrap !important;
      }
    }
  }
}

@keyframes pulse-submenu-dot {
  0%, 100% {
    transform: translateY(-50%) scale(1);
    opacity: 1;
  }
  50% {
    transform: translateY(-50%) scale(1.3);
    opacity: 0.7;
  }
}
</style>

<style lang="scss" scoped>
.sidebar-container {
  margin-top: 120px;
  width: 100%;
  padding: 0;
  background: transparent;

  //perfect-scrollbar默认的类名。自定义滚动条内容区域高度
  ::v-deep .ps {
    height: calc(100vh - 170px);
    overflow-x: hidden !important;
    overflow-y: auto;
    padding: 10px 0px 10px 0;

    // 隐藏滚动条但保持滚动功能
    &::-webkit-scrollbar {
      width: 6px;
      height: 0;
    }

    &::-webkit-scrollbar-thumb {
      background: rgba(94, 234, 212, 0.3);
      border-radius: 3px;
    }

    &::-webkit-scrollbar-track {
      background: rgba(0, 0, 0, 0.1);
    }
  }
}
</style>
