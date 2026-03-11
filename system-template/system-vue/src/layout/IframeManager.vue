<template>
  <div class="iframe-manager">
    <!-- 所有iframe同时存在,通过z-index和visibility控制显示 -->
    <div
      v-for="module in modules"
      :key="module.name"
      class="iframe-wrapper"
      :class="{ 'is-active': currentModule === module.name }"
    >
      <IframeContainer
        :src="module.url"
        :title="module.title"
        :icon-class="module.icon"
      />
    </div>
  </div>
</template>

<script>
import IframeContainer from "@/components/IframeContainer";

export default {
  name: "IframeManager",
  components: {
    IframeContainer,
  },
  data() {
    return {
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
          url: "http://82.157.104.186:8080/#/",
          icon: "el-icon-monitor",
        },
        {
          name: "WeBase",
          title: "可信生态与溯源",
          url: "https://hitchily-nonemancipative-lizeth.ngrok-free.dev",
          icon: "el-icon-box",
        },
      ],
    };
  },
  computed: {
    currentModule() {
      // 根据当前路由判断应该显示哪个iframe
      const routeName = this.$route.name;
      return routeName;
    },
  },
  mounted() {
    console.log("🌐 [IframeManager] 所有iframe已创建,永不销毁!");
  },
};
</script>

<style lang="scss" scoped>
.iframe-manager {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  display: none; // 默认隐藏整个管理器

  &.is-visible {
    display: block;
  }

  .iframe-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    visibility: hidden; // 隐藏但保持在DOM中
    opacity: 0;
    transition: opacity 0.3s ease;

    &.is-active {
      visibility: visible;
      opacity: 1;
      z-index: 1;
    }
  }
}
</style>
