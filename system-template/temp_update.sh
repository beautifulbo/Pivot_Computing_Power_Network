#!/bin/bash
# 批量更新其他三个模块，使其与 FederatedLearning 保持一致

# 为 PPIO.vue 创建更新的版本
cat > temp_PPIO.vue << 'EOF'
<template>
  <div class="module-container">
    <el-card class="module-card" v-show="!showIframe">
      <div class="module-header">
        <div class="module-icon" :style="{ background: '#2a5298' }">
          <i class="el-icon-coin"></i>
        </div>
        <h1 class="module-title">算网融合与感知</h1>
        <p class="module-subtitle">智能算力网络与感知服务平台</p>
      </div>
      <el-divider />
      <div class="module-section">
        <h2 class="section-title">
          <i class="el-icon-document"></i> 功能介绍
        </h2>
        <p class="section-content">
          研究多级异构网络基础设施的算力感知与融合技术，采用泛在智能的协同架构来充分整合边缘计算的低时延特征以及云计算中海量集中式计算资源。
        </p>
      </div>
      <el-divider />
      <div class="module-section">
        <h2 class="section-title">
          <i class="el-icon-star-on"></i> 主要特性
        </h2>
        <ul class="features-list">
          <li>
            <el-tag type="primary" effect="plain">算网一体化架构</el-tag>
            <span>融合计算与网络，构建统一的算力网络基础设施</span>
          </li>
          <li>
            <el-tag type="primary" effect="plain">智能感知与监测</el-tag>
            <span>实时感知网络状态、算力分布和资源使用情况</span>
          </li>
          <li>
            <el-tag type="primary" effect="plain">多层次算力整合</el-tag>
            <span>整合云、边、端多层次算力资源，实现协同服务</span>
          </li>
          <li>
            <el-tag type="primary" effect="plain">动态资源调度</el-tag>
            <span>基于感知数据的智能调度，优化算力网络性能</span>
          </li>
        </ul>
      </div>
      <el-divider />
      <div class="module-actions">
        <el-button type="primary" size="large" icon="el-icon-link" @click="enterSystem">
          进入算网融合与感知系统
        </el-button>
        <el-button size="large" icon="el-icon-back" @click="goBack">
          返回首页
        </el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "PPIO",
  computed: {
    showIframe: {
      get() {
        return this.$store.state.app.moduleIframeStates[this.$options.name]?.showIframe || false;
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
        return this.$store.state.app.moduleIframeStates[this.$options.name]?.iframeCreated || false;
      },
      set(value) {
        this.$store.commit('app/setModuleIframeState', {
          moduleName: this.$options.name,
          iframeCreated: value
        });
      }
    }
  },
  methods: {
    enterSystem() {
      if (!this.iframeCreated) {
        this.iframeCreated = true;
      }
      this.showIframe = true;
    },
    goBack() {
      this.$router.push("/dashboard");
    },
  },
};
</script>

<style lang="scss" scoped>
/* 复用 FederatedLearning 的样式 */
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
        box-shadow: 0 8px 24px rgba(42, 82, 152, 0.3);

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
          color: #2a5298;
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
          border-left: 4px solid #2a5298;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 15px;

          &:hover {
            transform: translateX(10px);
            background: #f0f9ff;
            box-shadow: 0 4px 12px rgba(42, 82, 152, 0.2);
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
</style>
EOF

echo "Updated PPIO.vue template created"
EOF
chmod +x temp_update.sh
