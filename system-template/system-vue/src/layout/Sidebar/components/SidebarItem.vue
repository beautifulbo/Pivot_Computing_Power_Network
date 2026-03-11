<template>
  <div>
    <el-submenu v-if="route.children.length > 0" :index="route.path">
      <template #title>
        <menu-item
          :title="route.meta.title"
          :icon="route.meta.icon"
        ></menu-item>
      </template>
      <!-- 循环渲染 -->
      <sidebar-item
        v-for="item in route.children"
        :key="item.path"
        :route="item"
      />
    </el-submenu>
    <!-- 外部链接 -->
    <el-menu-item
      v-else-if="route.meta && route.meta.isExternal"
      :index="route.path + '-external'"
      @click.native.prevent="handleExternalLink(route.meta.externalUrl)"
    >
      <menu-item :title="route.meta.title" :icon="route.meta.icon"></menu-item>
    </el-menu-item>
    <!-- 普通内部链接 -->
    <el-menu-item v-else :index="route.path">
      <menu-item :title="route.meta.title" :icon="route.meta.icon"></menu-item>
    </el-menu-item>
  </div>
</template>

<script>
import MenuItem from "./MenuItem.vue";

export default {
  name: "SidebarItem",
  props: {
    route: {
      type: Object,
      require: true,
    },
  },
  components: { MenuItem },
  data() {
    return {};
  },

  mounted() {},

  methods: {
    // 处理外部链接点击
    handleExternalLink(url) {
      if (url) {
        window.open(url, '_blank');
      }
    }
  },
};
</script>

<style lang="scss" scoped></style>
