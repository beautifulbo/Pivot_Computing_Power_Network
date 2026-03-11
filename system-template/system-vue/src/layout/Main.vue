<template>
  <!-- 带有切换动画，并且具备组件缓存的 -->
  <div>
    <!-- 移除 transition 包装,避免干扰 keep-alive -->
    <keep-alive :include="cachedViews">
      <!-- 移除 :key 属性以确保 keep-alive 正常工作 -->
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import { isTags } from "@/utils/tags";

export default {
  name: "Main",
  computed: {
    // 获取需要缓存的组件名称列表
    cachedViews() {
      const cached = this.$store.state.app.cachedViews || [];
      console.log("🔍 [Main] cachedViews:", cached);
      return cached;
    },
  },
  data() {
    return {};
  },

  mounted() {
    console.log("✅ [Main] 组件已挂载, keep-alive 已启用");
  },

  watch: {
    $route(to, from) {
      console.log("🔄 [Main] 路由变化:");
      console.log("  从:", from.path, "→ 到:", to.path);
      console.log("  当前路由 name:", to.name);

      this.addTagsViewList(to);
      this.addCachedView(to);

      console.log("  当前缓存组件:", this.$store.state.app.cachedViews);
    },
  },
  methods: {
    // 添加到标签栏
    addTagsViewList(to) {
      // 并不是所有的路由都不需要保存
      if (!isTags(to.path)) return;
      // 从 to 中解构出想要的属性
      const { fullPath, meta, name, params, path, query } = to;
      this.$store.commit("app/addTagsViewList", {
        fullPath,
        meta,
        name,
        params,
        path,
        query,
        title: this.$route.name,
      });
    },
    // 添加到缓存列表
    addCachedView(route) {
      if (!isTags(route.path)) {
        console.log("⚠️ [Main] 路由不需要缓存:", route.path);
        return;
      }

      if (route.name) {
        console.log("➕ [Main] 添加缓存:", route.name);
        this.$store.commit("app/addCachedView", route.name);
      } else {
        console.warn("⚠️ [Main] 路由没有 name 属性:", route.path);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.main-container {
  margin: 0;
  padding: 0;
  width: 0;
  height: 0;
}
</style>
