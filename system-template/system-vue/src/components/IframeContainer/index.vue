<template>
  <div class="iframe-container">
    <div class="iframe-header" v-if="showHeader">
      <div class="header-left">
        <i :class="iconClass" class="module-icon"></i>
        <span class="module-name">{{ title }}</span>
      </div>
      <div class="header-right">
        <el-button
          size="small"
          icon="el-icon-link"
          @click="openInNewTab"
          circle
          title="在新窗口打开"
        ></el-button>
        <el-button
          size="small"
          icon="el-icon-refresh"
          @click="refreshIframe"
          circle
          title="刷新"
        ></el-button>
        <el-button
          size="small"
          icon="el-icon-full-screen"
          @click="toggleFullscreen"
          circle
          title="全屏"
        ></el-button>
      </div>
    </div>

    <div class="iframe-wrapper" :class="{ 'fullscreen': isFullscreen }">
      <iframe
        ref="iframe"
        :src="src"
        frameborder="0"
        width="100%"
        height="100%"
        @load="handleIframeLoad"
        @error="handleIframeError"
      ></iframe>

      <div v-if="loading" class="iframe-loading">
        <i class="el-icon-loading"></i>
        <p>正在加载...</p>
      </div>

      <div v-if="loadError" class="iframe-error">
        <i class="el-icon-warning"></i>
        <p>页面加载失败</p>
        <p class="error-hint">目标网站可能不支持嵌入或设置了访问限制</p>
        <el-button type="primary" @click="openInNewTab" icon="el-icon-link">
          在新窗口中打开
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "IframeContainer",
  props: {
    // iframe 的 URL
    src: {
      type: String,
      required: true,
    },
    // 标题
    title: {
      type: String,
      default: "外部系统",
    },
    // 图标类名
    iconClass: {
      type: String,
      default: "el-icon-link",
    },
    // 是否显示头部
    showHeader: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      loading: true,
      loadError: false,
      isFullscreen: false,
      loadTimeout: null,
      componentId: Math.random().toString(36).substr(2, 9), // 唯一ID用于追踪
    };
  },
  created() {
    console.log(`🔷 [IframeContainer ${this.componentId}] created - 组件被创建`);
    console.log(`   title: ${this.title}`);
    console.log(`   src: ${this.src}`);
  },
  mounted() {
    console.log(`🟢 [IframeContainer ${this.componentId}] mounted - 组件已挂载到DOM`);
    console.log(`   iframe元素:`, this.$refs.iframe);
    console.log(`   iframe.src:`, this.$refs.iframe?.src);

    // 设置超时检测，如果10秒后还在加载，可能存在问题
    this.loadTimeout = setTimeout(() => {
      if (this.loading) {
        console.warn(`⏱️ [IframeContainer ${this.componentId}] 加载超时（10秒）`);
        this.$message.warning('页面加载较慢，建议在新窗口打开');
      }
    }, 10000);
  },
  beforeDestroy() {
    console.log(`🔴 [IframeContainer ${this.componentId}] beforeDestroy - 组件即将被销毁！`);
    console.log(`   ⚠️  这不应该发生！iframe应该一直保留在DOM中！`);

    document.removeEventListener("keydown", this.handleEscKey);
    if (this.loadTimeout) {
      clearTimeout(this.loadTimeout);
    }
  },
  destroyed() {
    console.log(`💀 [IframeContainer ${this.componentId}] destroyed - 组件已被销毁`);
  },
  methods: {
    // iframe 加载完成
    handleIframeLoad() {
      console.log(`✅ [IframeContainer ${this.componentId}] iframe加载完成`);
      this.loading = false;
      this.loadError = false;
      if (this.loadTimeout) {
        clearTimeout(this.loadTimeout);
      }

      // 尝试检测 iframe 是否被阻止
      try {
        const iframe = this.$refs.iframe;
        if (iframe && iframe.contentWindow) {
          // 如果可以访问 contentWindow，说明加载成功
          console.log(`   iframe内容可访问`);
        }
      } catch (e) {
        // 如果抛出异常，可能是跨域限制
        console.warn(`   iframe可能存在跨域限制:`, e);
      }
    },
    // iframe 加载错误
    handleIframeError() {
      console.error(`❌ [IframeContainer ${this.componentId}] iframe加载失败`);
      this.loading = false;
      this.loadError = true;
      if (this.loadTimeout) {
        clearTimeout(this.loadTimeout);
      }
      this.$message.error('页面加载失败，请尝试在新窗口打开');
    },
    // 在新窗口打开
    openInNewTab() {
      window.open(this.src, "_blank");
      this.$message.success("已在新窗口打开");
    },
    // 刷新 iframe
    refreshIframe() {
      console.log(`🔄 [IframeContainer ${this.componentId}] 手动刷新iframe`);
      this.loading = true;
      this.loadError = false;
      this.$refs.iframe.src = this.src;

      // 重新设置超时检测
      if (this.loadTimeout) {
        clearTimeout(this.loadTimeout);
      }
      this.loadTimeout = setTimeout(() => {
        if (this.loading) {
          console.warn(`⏱️ [IframeContainer ${this.componentId}] 刷新后加载超时`);
          this.$message.warning('页面加载较慢，建议在新窗口打开');
        }
      }, 10000);
    },
    // 切换全屏
    toggleFullscreen() {
      this.isFullscreen = !this.isFullscreen;
      if (this.isFullscreen) {
        this.$message.success("已进入全屏模式，按 ESC 键退出");
        document.addEventListener("keydown", this.handleEscKey);
      } else {
        document.removeEventListener("keydown", this.handleEscKey);
      }
    },
    // 处理 ESC 键退出全屏
    handleEscKey(e) {
      if (e.key === "Escape" && this.isFullscreen) {
        this.isFullscreen = false;
        document.removeEventListener("keydown", this.handleEscKey);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.iframe-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 4px;
  overflow: hidden;

  .iframe-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    .header-left {
      display: flex;
      align-items: center;
      gap: 12px;

      .module-icon {
        font-size: 20px;
      }

      .module-name {
        font-size: 16px;
        font-weight: 600;
      }
    }

    .header-right {
      display: flex;
      gap: 8px;

      .el-button {
        background: rgba(255, 255, 255, 0.2);
        border: none;
        color: #fff;

        &:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      }
    }
  }

  .iframe-wrapper {
    position: relative;
    flex: 1;
    overflow: hidden;

    &.fullscreen {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 9999;
      background: #fff;
    }

    iframe {
      display: block;
    }

    .iframe-loading {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background: #fff;
      color: #409eff;
      font-size: 16px;

      i {
        font-size: 40px;
        margin-bottom: 10px;
      }

      p {
        margin: 0;
      }
    }

    .iframe-error {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background: #fff;
      color: #f56c6c;
      font-size: 16px;
      padding: 20px;

      i {
        font-size: 60px;
        margin-bottom: 20px;
      }

      p {
        margin: 10px 0;
        text-align: center;
      }

      .error-hint {
        font-size: 14px;
        color: #909399;
        margin-bottom: 30px;
        max-width: 500px;
      }

      .el-button {
        margin-top: 10px;
      }
    }
  }
}
</style>
