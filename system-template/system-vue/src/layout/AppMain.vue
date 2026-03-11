<template>
  <div class="app-main">
    <!-- 移除 transition 包装,避免干扰 keep-alive -->
    <keep-alive :include="cachedViews">
      <!-- 移除 :key,让 keep-alive 正常工作! -->
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import { isTags } from "@/utils/tags";

export default {
  name: "AppMain",
  computed: {
    // 获取需要缓存的组件名称列表
    cachedViews() {
      const cached = this.$store.state.app.cachedViews || [];
      console.log("🔍 [AppMain] cachedViews:", cached);
      return cached;
    },
  },
  mounted() {
    console.log("✅ [AppMain] 组件已挂载, keep-alive 已启用");
  },
  data() {
    return {};
  },
  watch: {
    $route(to, from) {
      console.log("🔄 [AppMain] 路由变化:");
      console.log("  从:", from.path, "→ 到:", to.path);
      console.log("  当前路由 name:", to.name);
      console.log("  当前路由 fullPath:", to.fullPath);

      this.addTagsViewList(to);
      this.addCachedView(to);

      // 显示当前缓存的组件列表
      console.log("  当前缓存组件:", this.$store.state.app.cachedViews);

      // 关键：检查即将渲染的组件的实际 name
      this.$nextTick(() => {
        const currentComponent = this.$children[0]?.$children[0];
        if (currentComponent) {
          console.log("  ✅ 实际渲染的组件 name:", currentComponent.$options.name);
        }
      });
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
        console.log("⚠️ [AppMain] 路由不需要缓存:", route.path);
        return;
      }

      if (route.name) {
        console.log("➕ [AppMain] 添加缓存:", route.name);
        this.$store.commit("app/addCachedView", route.name);
      } else {
        console.warn("⚠️ [AppMain] 路由没有 name 属性:", route.path);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.app-main {
  // 浏览器可视区域的高度 100vh
  min-height: calc(100vh - 50px - 43px);
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 104px 20px 20px 20px;
  box-sizing: border-box;
}
</style>
