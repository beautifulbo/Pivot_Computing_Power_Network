<template>
  <div class="module-container">
    <!-- 科技感背景层 -->
    <div class="tech-background">
      <!-- 网格背景 -->
      <div class="grid-background"></div>
      <!-- 动态粒子背景 -->
      <div class="floating-particles">
        <span v-for="i in 30" :key="i" class="bg-particle"></span>
      </div>
      <!-- 三层渐变背景 -->
      <div class="layer-gradients">
        <div class="gradient-cloud"></div>
        <div class="gradient-edge"></div>
        <div class="gradient-device"></div>
      </div>
    </div>

    <!-- 功能介绍页面 - 使用v-show替代v-if，让iframe在后台持续加载 -->
    <el-card class="module-card" v-if="!showIframe">
      <!-- 模块图标和标题 -->
      <div class="module-header">
        <div class="module-icon" :style="{ background: '#E6A23C' }">
          <i class="el-icon-monitor"></i>
        </div>
        <h1 class="module-title">资源编排与调度</h1>
        <p class="module-subtitle">智能资源编排与调度管理平台</p>
      </div>

      <el-divider />

      <!-- 功能介绍 -->
      <div class="module-section">
        <h2 class="section-title">
          <i class="el-icon-document"></i> 功能介绍
        </h2>
        <p class="section-content">
          研究分布式异构异质资源公平优化分配方法，解决碎片化分布式资源的软硬件兼容性问题，提升云边端协同AI计算服务质量保障的隔离性，实现边缘侧异构异质资源调度的公平可信。
        </p>
      </div>

      <el-divider />

      <!-- 主要特性 -->
      <div class="module-section">
        <h2 class="section-title">
          <i class="el-icon-star-on"></i> 主要特性
        </h2>
        <ul class="features-list">
          <li>
            <el-tag type="warning" effect="plain">多资源统一编排</el-tag>
            <span>支持计算、存储、网络等多种资源的统一编排管理</span>
          </li>
          <li>
            <el-tag type="warning" effect="plain">智能调度算法</el-tag>
            <span>基于AI的智能调度，优化资源分配和任务执行</span>
          </li>
          <li>
            <el-tag type="warning" effect="plain">可视化编排设计</el-tag>
            <span>图形化编排界面，简化复杂应用部署流程</span>
          </li>
          <li>
            <el-tag type="warning" effect="plain">容器与虚拟化支持</el-tag>
            <span>支持Docker、Kubernetes等容器编排和虚拟机调度</span>
          </li>
          <li>
            <el-tag type="warning" effect="plain">动态扩缩容机制</el-tag>
            <span>自动根据负载变化调整资源规模，保障服务质量</span>
          </li>
        </ul>
      </div>

      <el-divider />

      <!-- 操作按钮 -->
      <div class="module-actions">
        <el-button
          type="warning"
          size="large"
          icon="el-icon-link"
          @click="enterSystem"
        >
          进入资源编排与调度系统
        </el-button>
        <el-button
          size="large"
          icon="el-icon-back"
          @click="goBack"
        >
          返回首页
        </el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "ComputingTrade",
  data() {
    return {
      externalUrl: "http://82.157.104.186:8080/#/",
    };
  },
  computed: {
    // 使用 Vuex 存储的 iframe 状态
    showIframe: {
      get() {
        const state = this.$store.state.app.moduleIframeStates[this.$options.name]?.showIframe || false;
        return state;
      },
      set(value) {
        this.$store.commit('app/setModuleIframeState', {
          moduleName: this.$options.name,
          showIframe: value
        });
      }
    },
    iframeCreated: {
      get() {
        const state = this.$store.state.app.moduleIframeStates[this.$options.name]?.iframeCreated || false;
        return state;
      },
      set(value) {
        this.$store.commit('app/setModuleIframeState', {
          moduleName: this.$options.name,
          iframeCreated: value
        });
      }
    }
  },
  activated() {
    console.log("✅ [ComputingTrade] activated()");
    // 组件激活时，如果之前显示了iframe，继续显示
  },
  deactivated() {
    console.log("⏸️ [ComputingTrade] deactivated()");
    // 组件失活时，不修改showIframe状态，保持iframe的显示状态
    // GlobalIframeManager会根据当前路由自动控制显示/隐藏
  },
  methods: {
    enterSystem() {
      console.log("🚀 [ComputingTrade] 进入iframe模式");

      // 统一使用 commit 设置状态，避免通过 setter 导致的部分更新
      this.$store.commit('app/setModuleIframeState', {
        moduleName: this.$options.name,
        showIframe: true,
        iframeCreated: true
      });

      console.log("✅ [ComputingTrade] 状态设置完成");
    },
    goBack() {
      this.$router.push("/dashboard");
    },
  },
};
</script>

<style lang="scss" scoped>
.module-container {
  position: relative;
  padding: 20px;
  min-height: calc(100vh - 80px);
  background: linear-gradient(135deg, #0a0e27 0%, #1a1e3e 50%, #2a2e4e 100%);
  overflow-x: hidden;

  // 科技感背景层
  .tech-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    pointer-events: none;
    overflow: hidden;

    // 网格背景
    .grid-background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image:
        linear-gradient(rgba(42, 82, 152, 0.1) 1px, transparent 1px),
        linear-gradient(90deg, rgba(42, 82, 152, 0.1) 1px, transparent 1px);
      background-size: 50px 50px;
      animation: grid-move 20s linear infinite;
    }

    // 动态粒子背景
    .floating-particles {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;

      .bg-particle {
        position: absolute;
        width: 3px;
        height: 3px;
        background: rgba(255, 255, 255, 0.4);
        border-radius: 50%;
        box-shadow: 0 0 8px rgba(255, 255, 255, 0.6);

        @for $i from 1 through 30 {
          &:nth-child(#{$i}) {
            left: random(100) * 1%;
            top: random(100) * 1%;
            animation: float-#{$i % 5 + 1} (8s + random(8)) linear infinite;
            animation-delay: random(5) * 1s;
          }
        }
      }
    }

    // 三层渐变背景
    .layer-gradients {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0.15;

      .gradient-cloud {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 33.33%;
        background: linear-gradient(180deg, rgba(42, 82, 152, 0.3) 0%, transparent 100%);
        animation: pulse-gradient 8s ease-in-out infinite;
      }

      .gradient-edge {
        position: absolute;
        top: 33.33%;
        left: 0;
        width: 100%;
        height: 33.33%;
        background: linear-gradient(180deg, rgba(20, 184, 166, 0.3) 0%, transparent 100%);
        animation: pulse-gradient 8s ease-in-out infinite 2.6s;
      }

      .gradient-device {
        position: absolute;
        top: 66.66%;
        left: 0;
        width: 100%;
        height: 33.33%;
        background: linear-gradient(180deg, rgba(245, 158, 11, 0.3) 0%, transparent 100%);
        animation: pulse-gradient 8s ease-in-out infinite 5.2s;
      }
    }
  }

  // 确保内容在背景之上
  > * {
    position: relative;
    z-index: 1;
  }

  .module-card {
    max-width: 1200px;
    margin: 0 auto;
    border-radius: 16px;
    background: linear-gradient(135deg,
      rgba(255, 255, 255, 0.98) 0%,
      rgba(255, 255, 255, 0.95) 100%
    );
    border: 1px solid rgba(94, 234, 212, 0.2);
    box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.1),
      0 0 20px rgba(94, 234, 212, 0.1);

    // 模块头部
    .module-header {
      text-align: center;
      padding: 40px 20px;
      background: linear-gradient(135deg,
        rgba(42, 82, 152, 0.05) 0%,
        rgba(94, 234, 212, 0.05) 100%
      );
      border-radius: 16px 16px 0 0;
      position: relative;
      overflow: hidden;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 3px;
        background: linear-gradient(90deg,
          transparent 0%,
          #5eead4 50%,
          transparent 100%
        );
      }

      .module-icon {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 25px;
        background: linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #4a6fa5 100%);
        box-shadow:
          0 8px 24px rgba(42, 82, 152, 0.4),
          0 0 40px rgba(94, 234, 212, 0.2);
        position: relative;

        &::before {
          content: '';
          position: absolute;
          inset: -5px;
          border-radius: 50%;
          background: linear-gradient(135deg, #5eead4 0%, #2a5298 100%);
          opacity: 0.3;
          filter: blur(10px);
          z-index: -1;
        }

        i {
          font-size: 60px;
          color: #ffffff;
          filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.5));
        }
      }

      .module-title {
        font-size: 42px;
        font-weight: bold;
        background: linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #5eead4 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        margin: 0 0 15px 0;
        text-shadow: 0 0 30px rgba(94, 234, 212, 0.3);
      }

      .module-subtitle {
        font-size: 18px;
        color: rgba(42, 82, 152, 0.8);
        margin: 0;
        font-weight: 500;
      }
    }

    ::v-deep .el-divider {
      background: linear-gradient(90deg,
        transparent 0%,
        rgba(94, 234, 212, 0.3) 50%,
        transparent 100%
      );
    }

    // 内容区块
    .module-section {
      padding: 30px 40px;

      .section-title {
        font-size: 24px;
        font-weight: 600;
        color: #2a5298;
        margin: 0 0 20px 0;
        display: flex;
        align-items: center;
        gap: 10px;

        i {
          color: #5eead4;
          filter: drop-shadow(0 0 8px rgba(94, 234, 212, 0.5));
        }
      }

      .section-content {
        font-size: 16px;
        line-height: 1.8;
        color: #606266;
        text-align: justify;
        margin: 0;
        padding: 20px;
        background: rgba(94, 234, 212, 0.03);
        border-left: 3px solid #5eead4;
        border-radius: 8px;
      }

      .features-list {
        list-style: none;
        padding: 0;
        margin: 0;

        li {
          padding: 20px;
          margin-bottom: 15px;
          background: linear-gradient(135deg,
            rgba(42, 82, 152, 0.03) 0%,
            rgba(94, 234, 212, 0.03) 100%
          );
          border-radius: 12px;
          border-left: 4px solid #5eead4;
          border: 1px solid rgba(94, 234, 212, 0.2);
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 15px;
          position: relative;
          overflow: hidden;

          &::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 4px;
            background: linear-gradient(180deg, #5eead4 0%, #2a5298 100%);
            box-shadow: 0 0 10px rgba(94, 234, 212, 0.5);
          }

          &:hover {
            transform: translateX(10px);
            background: linear-gradient(135deg,
              rgba(94, 234, 212, 0.1) 0%,
              rgba(42, 82, 152, 0.05) 100%
            );
            box-shadow:
              0 4px 12px rgba(94, 234, 212, 0.3),
              0 0 20px rgba(94, 234, 212, 0.1);
            border-color: #5eead4;
          }

          ::v-deep .el-tag {
            min-width: 180px;
            text-align: center;
            font-weight: 600;
            flex-shrink: 0;
            background: linear-gradient(135deg, #2a5298 0%, #5eead4 100%);
            border: none;
            color: white;
            box-shadow: 0 2px 8px rgba(94, 234, 212, 0.3);
          }

          span {
            font-size: 15px;
            color: #606266;
            line-height: 1.6;
          }
        }
      }
    }

    // 操作按钮
    .module-actions {
      padding: 30px 40px;
      display: flex;
      justify-content: center;
      gap: 20px;

      ::v-deep .el-button {
        padding: 15px 40px;
        font-size: 16px;
        border-radius: 8px;
        transition: all 0.3s ease;

        &--primary {
          background: linear-gradient(135deg, #2a5298 0%, #5eead4 100%);
          border: none;
          box-shadow: 0 4px 15px rgba(94, 234, 212, 0.3);

          &:hover {
            transform: translateY(-2px);
            box-shadow:
              0 6px 20px rgba(94, 234, 212, 0.4),
              0 0 30px rgba(94, 234, 212, 0.2);
          }
        }

        &--default {
          border: 1px solid rgba(94, 234, 212, 0.5);
          color: #2a5298;
          background: rgba(94, 234, 212, 0.05);

          &:hover {
            background: rgba(94, 234, 212, 0.1);
            border-color: #5eead4;
            color: #2a5298;
          }
        }
      }
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .module-container {
    .module-card {
      .module-header {
        padding: 30px 15px;

        .module-icon {
          width: 100px;
          height: 100px;

          i {
            font-size: 50px;
          }
        }

        .module-title {
          font-size: 32px;
        }
      }

      .module-section {
        padding: 20px 15px;

        .features-list li {
          flex-direction: column;
          align-items: flex-start;

          ::v-deep .el-tag {
            min-width: auto;
          }
        }
      }

      .module-actions {
        padding: 20px 15px;
        flex-direction: column;

        ::v-deep .el-button {
          width: 100%;
        }
      }
    }
  }
}

// ========== 科技感动画效果 ==========

// 网格移动动画
@keyframes grid-move {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(50px);
  }
}

// 粒子浮动动画（5种变体）
@keyframes float-1 {
  0%, 100% {
    transform: translate(0, 0);
    opacity: 0.4;
  }
  50% {
    transform: translate(10px, -20px);
    opacity: 1;
  }
}

@keyframes float-2 {
  0%, 100% {
    transform: translate(0, 0);
    opacity: 0.3;
  }
  50% {
    transform: translate(-15px, 25px);
    opacity: 0.9;
  }
}

@keyframes float-3 {
  0%, 100% {
    transform: translate(0, 0);
    opacity: 0.5;
  }
  50% {
    transform: translate(20px, 10px);
    opacity: 1;
  }
}

@keyframes float-4 {
  0%, 100% {
    transform: translate(0, 0);
    opacity: 0.4;
  }
  50% {
    transform: translate(-10px, -15px);
    opacity: 0.8;
  }
}

@keyframes float-5 {
  0%, 100% {
    transform: translate(0, 0);
    opacity: 0.3;
  }
  50% {
    transform: translate(15px, -25px);
    opacity: 1;
  }
}

// 渐变脉冲动画
@keyframes pulse-gradient {
  0%, 100% {
    opacity: 0.15;
  }
  50% {
    opacity: 0.25;
  }
}
</style>
