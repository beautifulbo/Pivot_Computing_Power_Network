<template>
  <div class="module-container">
    <!-- 功能介绍页面 - 使用v-show替代v-if,让iframe在后台持续加载 -->
    <el-card class="module-card" v-show="!showIframe">
      <!-- 模块图标和标题 -->
      <div class="module-header">
        <div class="module-icon" :style="{ background: '#2a5298' }">
          <i class="el-icon-coin"></i>
        </div>
        <h1 class="module-title">算网融合与感知</h1>
        <p class="module-subtitle">智能算力网络与感知服务平台</p>
      </div>

      <el-divider />

      <!-- 功能介绍 -->
      <div class="module-section">
        <h2 class="section-title">
          <i class="el-icon-document"></i> 功能介绍
        </h2>
        <p class="section-content">
          研究边缘自适应弹性分布式协同计算机制，在保障计算系统安全可靠、高容错能力和高吞吐量的同时实现分布式并行智能任务分解和调度，以支持智能任务迁移和计算。
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
            <el-tag type="success" effect="plain">联邦分布式计算</el-tag>
            <span>智能任务分发与调度，支持多节点协同计算</span>
          </li>
          <li>
            <el-tag type="success" effect="plain">跨任务模型协同</el-tag>
            <span>促进粗细粒度间的知识迁移与融合，实现离散分布式任务间的自适应联邦聚合</span>
          </li>
          <li>
            <el-tag type="success" effect="plain">数据隐私保护</el-tag>
            <span>支持隐私护驾与导向私有模型，保护数据隐私安全</span>
          </li>
          <li>
            <el-tag type="success" effect="plain">实时协同监控</el-tag>
            <span>可视化协同计算过程，实时监控任务执行状态</span>
          </li>
          <li>
            <el-tag type="success" effect="plain">弹性协同机制</el-tag>
            <span>评估不同任务的可信程度，实现端边云计算资源的多粒度自适应分配</span>
          </li>
        </ul>
      </div>

      <el-divider />

      <!-- 操作按钮 -->
      <div class="module-actions">
        <el-button
          type="success"
          size="large"
          icon="el-icon-link"
          @click="enterSystem"
        >
          进入算网融合与感知系统
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
  name: "PPIO",
  data() {
    return {
      externalUrl: "https://b.datav.run/share/page/195f230710b9d87ff40d75d9946161f1",
    };
  },
  computed: {
    // 使用 Vuex 存储的 iframe 状态
    showIframe: {
      get() {
        const state = this.$store.state.app.moduleIframeStates[this.$options.name]?.showIframe || false;
        console.log(`🔍 [${this.$options.name}] 获取 showIframe 状态:`, state);
        return state;
      },
      set(value) {
        console.log(`💾 [${this.$options.name}] 设置 showIframe 状态:`, value);
        this.$store.commit('app/setModuleIframeState', {
          moduleName: this.$options.name,
          showIframe: value
        });
      }
    },
    iframeCreated: {
      get() {
        const state = this.$store.state.app.moduleIframeStates[this.$options.name]?.iframeCreated || false;
        console.log(`🔍 [${this.$options.name}] 获取 iframeCreated 状态:`, state);
        return state;
      },
      set(value) {
        console.log(`💾 [${this.$options.name}] 设置 iframeCreated 状态:`, value);
        this.$store.commit('app/setModuleIframeState', {
          moduleName: this.$options.name,
          iframeCreated: value
        });
      }
    }
  },
  activated() {
    console.log("✅ [PPIO] activated()");
  },
  deactivated() {
    console.log("⏸️ [PPIO] deactivated()");
  },
  methods: {
    enterSystem() {
      // 第一次点击时标记iframe已创建
      if (!this.iframeCreated) {
        console.log("🎬 [PPIO] 首次创建iframe - 通知全局管理器");
        this.iframeCreated = true;
      }
      this.showIframe = true;
      console.log("🚀 [PPIO] 进入iframe模式 - iframe将由全局管理器显示");
    },
    goBack() {
      this.$router.push("/dashboard");
    },
  },
};
</script>

<style lang="scss" scoped>
.module-container {
  padding: 20px;
  min-height: calc(100vh - 80px);

  .module-card {
    max-width: 1200px;
    margin: 0 auto;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

    .module-header {
      text-align: center;
      padding: 40px 20px;

      .module-icon {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 25px;
        box-shadow: 0 8px 24px rgba(103, 194, 58, 0.3);

        i {
          font-size: 60px;
          color: #ffffff;
        }
      }

      .module-title {
        font-size: 42px;
        font-weight: bold;
        color: #303133;
        margin: 0 0 15px 0;
      }

      .module-subtitle {
        font-size: 18px;
        color: #909399;
        margin: 0;
      }
    }

    .module-section {
      padding: 30px 40px;

      .section-title {
        font-size: 24px;
        font-weight: 600;
        color: #303133;
        margin: 0 0 20px 0;
        display: flex;
        align-items: center;
        gap: 10px;

        i {
          color: #67c23a;
        }
      }

      .section-content {
        font-size: 16px;
        line-height: 1.8;
        color: #606266;
        text-align: justify;
        margin: 0;
      }

      .features-list {
        list-style: none;
        padding: 0;
        margin: 0;

        li {
          padding: 20px;
          margin-bottom: 15px;
          background: #f5f7fa;
          border-radius: 12px;
          border-left: 4px solid #67c23a;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 15px;

          &:hover {
            transform: translateX(10px);
            background: #f0f9ff;
            box-shadow: 0 4px 12px rgba(103, 194, 58, 0.2);
          }

          .el-tag {
            min-width: 180px;
            text-align: center;
            font-weight: 600;
            flex-shrink: 0;
          }

          span {
            font-size: 15px;
            color: #606266;
            line-height: 1.6;
          }
        }
      }
    }

    .module-actions {
      padding: 30px 40px;
      display: flex;
      justify-content: center;
      gap: 20px;

      .el-button {
        padding: 15px 40px;
        font-size: 16px;
        border-radius: 8px;
      }
    }
  }
}

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

          .el-tag {
            min-width: auto;
          }
        }
      }

      .module-actions {
        padding: 20px 15px;
        flex-direction: column;

        .el-button {
          width: 100%;
        }
      }
    }
  }
}
</style>
