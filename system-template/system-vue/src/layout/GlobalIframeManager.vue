<template>
  <!-- 全局 iframe 管理器 - 独立于路由，永不销毁 -->
  <div class="global-iframe-manager">
    <!-- 为每个模块创建一个 iframe 容器 -->
    <div
      v-for="module in modules"
      :key="module.name"
      class="iframe-layer"
      :class="{ 'is-visible': isModuleVisible(module.name) }"
    >
      <!-- 使用 v-if 控制创建，一旦创建就不再销毁 -->
      <IframeContainer
        v-if="moduleStates[module.name] && moduleStates[module.name].iframeCreated"
        :src="module.url"
        :title="module.title"
        :icon-class="module.icon"
      />

      <el-button
        v-if="isModuleVisible(module.name)"
        class="back-button"
        type="info"
        icon="el-icon-back"
        @click="hideModuleIframe(module.name)"
      >
        返回介绍页面
      </el-button>
    </div>
  </div>
</template>

<script>
import IframeContainer from "@/components/IframeContainer";

export default {
  name: "GlobalIframeManager",
  components: {
    IframeContainer,
  },
  data() {
    return {
      // 所有支持 iframe 的模块配置
      modules: [
        {
          name: "FederatedLearning",
          title: "泛在协同计算",
          url: "http://82.157.104.186:3000/home/portal",
          icon: "el-icon-share",
        },
        {
          name: "PPIO",
          title: "算网融合与感知",
          url: "https://b.datav.run/share/page/195f230710b9d87ff40d75d9946161f1",
          icon: "el-icon-coin",
        },
        {
          name: "ComputingTrade",
          title: "资源编排与调度",
          url: "http://82.157.104.186:8080/#/", // iThings 物联网平台
          icon: "el-icon-monitor",
        },
        {
          name: "WeBase",
          title: "可信生态与溯源",
          url: "https://hitchily-nonemancipative-lizeth.ngrok-free.dev",
          icon: "el-icon-box",
        },
        {
          name: "TrafficPrediction",
          title: "智能流量预测",
          url: "http://82.157.104.186:9528/",
          icon: "el-icon-data-line",
        },
      ],
    };
  },
  computed: {
    // 将 store 中的 moduleIframeStates 映射为计算属性
    moduleStates() {
      return this.$store.state.app.moduleIframeStates;
    }
  },
  watch: {
    $route(to, from) {
      console.log("🔄 [GlobalIframeManager] 路由变化:");
      console.log(`   从: ${from.name} → 到: ${to.name}`);
      console.log("   当前所有模块状态:", JSON.stringify(this.moduleStates, null, 2));
    }
  },
  mounted() {
    console.log("🌐 [GlobalIframeManager] 全局 iframe 管理器已挂载");
    console.log("   所有 iframe 将在此统一管理，永不销毁！");
  },
  methods: {
    // 判断模块的 iframe 是否应该显示
    // 需要满足两个条件：1. showIframe为true  2. 当前路由是该模块
    isModuleVisible(moduleName) {
      const state = this.$store.state.app.moduleIframeStates[moduleName];
      const isCurrentRoute = this.$route.name === moduleName;
      const visible = state?.showIframe && isCurrentRoute;

      console.log(`🔍 [GlobalIframeManager] isModuleVisible(${moduleName}):`);
      console.log(`   - showIframe: ${state?.showIframe}`);
      console.log(`   - iframeCreated: ${state?.iframeCreated}`);
      console.log(`   - 当前路由: ${this.$route.name}`);
      console.log(`   - 路由匹配: ${isCurrentRoute}`);
      console.log(`   - 最终可见: ${visible}`);

      return visible;
    },
    // 判断模块的 iframe 是否已创建
    isModuleIframeCreated(moduleName) {
      const state = this.$store.state.app.moduleIframeStates[moduleName];
      const created = state?.iframeCreated || false;
      console.log(`🔍 [GlobalIframeManager] ${moduleName} iframeCreated:`, created);
      return created;
    },

    // 判断模块的 iframe 是否应该显示
    isModuleIframeActive(moduleName) {
      const state = this.$store.state.app.moduleIframeStates[moduleName];
      const active = state?.showIframe || false;
      console.log(`🔍 [GlobalIframeManager] ${moduleName} showIframe:`, active);
      return active;
    },

    // 隐藏模块的 iframe
    hideModuleIframe(moduleName) {
      console.log(`👈 [GlobalIframeManager] 隐藏 ${moduleName} 的 iframe`);
      this.$store.commit('app/setModuleIframeState', {
        moduleName: moduleName,
        showIframe: false
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.global-iframe-manager {
  // 全局 iframe 管理器始终存在，但默认隐藏
  position: fixed;
  top: 50px;  // 顶部导航栏高度
  left: 210px;  // 侧边栏宽度
  right: 0;
  bottom: 0;
  pointer-events: none;  // 默认不响应鼠标事件
  z-index: 1001;  // 在内容之上

  .iframe-layer {
    position: absolute;
    top: 43px;  // 标签栏高度
    left: 0;
    right: 0;
    bottom: 0;
    background: #f0f2f5;
    padding: 20px;
    box-sizing: border-box;

    // 默认完全隐藏
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease;

    &.is-visible {
      opacity: 1;
      visibility: visible;
      pointer-events: auto;  // 显示时启用鼠标事件
    }

    .back-button {
      position: absolute;
      bottom: 20px;
      right: 20px;
      z-index: 100;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
  }
}

// 侧边栏折叠时调整位置
.hideSidebar .global-iframe-manager {
  left: 50px;
}
</style>
