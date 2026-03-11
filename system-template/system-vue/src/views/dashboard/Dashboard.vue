<template>
  <div class="dashboard-container">
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

    <!-- 顶部欢迎区 -->
    <div class="welcome-section">
      <!-- 动态装饰线条 -->
      <div class="deco-lines">
        <div class="line line-1"></div>
        <div class="line line-2"></div>
        <div class="line line-3"></div>
      </div>

      <!-- 扫描线效果 -->
      <div class="scan-line"></div>

      <div class="content-wrapper">
        <div class="title-container">
          <div class="title-glow"></div>
          <h1 class="project-title">
            面向泛在人工智能的云边端协同一体化系统
          </h1>
        </div>
        <p class="project-subtitle">
          <span class="highlight-text">面向泛在人工智能</span>的云边端算力资源类别复杂多样、算力需求庞大等挑战，本系统探索面向泛在人工智能的<span class="highlight-text">云边端协同一体化</span>操作系统技术与应用，研究多级异构网络基础设施的<span class="highlight-text">算力感知与融合技术</span>，实现泛在自适应分布式协同AI计算，保证分布式异构异质资源优化及公平调度，最终形成并维护灵活可追溯的<span class="highlight-text">AI数据计算模型生态体系</span>，进而满足AI的泛在计算需求。
        </p>

        <!-- 状态指示器 -->
        <div class="status-indicators">
          <div class="indicator">
            <div class="indicator-dot active"></div>
            <span>系统运行中</span>
          </div>
          <div class="indicator">
            <div class="indicator-dot warning"></div>
            <span>系统维护中</span>
          </div>
          <div class="indicator">
            <div class="indicator-dot error"></div>
            <span>系统故障</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 四宫格模块入口 -->
    <div class="modules-grid">
      <el-row :gutter="20" type="flex" class="five-column-grid">
        <!-- 算网融合与感知模块 -->
        <el-col :xs="24" :sm="12" :md="12" class="module-col five-col">
          <div class="module-card-tech module-cloud" @click="goToModule('/modules/ppio')">
            <div class="card-glow"></div>
            <div class="module-content-wrapper">
              <div class="module-header">
                <div class="module-icon-tech">
                  <i class="el-icon-coin"></i>
                </div>
                <h3 class="module-name-tech">算网融合与感知</h3>
                <div class="enter-arrow">
                  <i class="el-icon-right"></i>
                </div>
              </div>
              <p class="module-desc-tech">智能算力网络与感知服务平台</p>
              <div class="module-tags-tech">
                <span class="tag-tech">算网一体化</span>
                <span class="tag-tech">智能感知</span>
                <span class="tag-tech">资源整合</span>
              </div>
            </div>
          </div>
        </el-col>

        <!-- 泛在协同计算模块 -->
        <el-col :xs="24" :sm="12" :md="12" class="module-col five-col">
          <div class="module-card-tech module-edge" @click="goToModule('/modules/federated-learning')">
            <div class="card-glow"></div>
            <div class="module-content-wrapper">
              <div class="module-header">
                <div class="module-icon-tech">
                  <i class="el-icon-share"></i>
                </div>
                <h3 class="module-name-tech">泛在协同计算</h3>
                <div class="enter-arrow">
                  <i class="el-icon-right"></i>
                </div>
              </div>
              <p class="module-desc-tech">分布式协同计算服务平台</p>
              <div class="module-tags-tech">
                <span class="tag-tech">任务协同</span>
                <span class="tag-tech">跨平台整合</span>
                <span class="tag-tech">隐私保护</span>
              </div>
            </div>
          </div>
        </el-col>

        <!-- 资源编排与调度模块 -->
        <el-col :xs="24" :sm="12" :md="12" class="module-col five-col">
          <div class="module-card-tech module-ai" @click="goToModule('/modules/computing-trade')">
            <div class="card-glow"></div>
            <div class="module-content-wrapper">
              <div class="module-header">
                <div class="module-icon-tech">
                  <i class="el-icon-monitor"></i>
                </div>
                <h3 class="module-name-tech">资源编排与调度</h3>
                <div class="enter-arrow">
                  <i class="el-icon-right"></i>
                </div>
              </div>
              <p class="module-desc-tech">智能资源编排与调度管理平台</p>
              <div class="module-tags-tech">
                <span class="tag-tech">统一编排</span>
                <span class="tag-tech">智能调度</span>
                <span class="tag-tech">弹性扩容</span>
              </div>
            </div>
          </div>
        </el-col>

        <!-- 可信生态与溯源模块 -->
        <el-col :xs="24" :sm="12" :md="12" class="module-col five-col">
          <div class="module-card-tech module-device" @click="goToModule('/modules/webase')">
            <div class="card-glow"></div>
            <div class="module-content-wrapper">
              <div class="module-header">
                <div class="module-icon-tech">
                  <i class="el-icon-box"></i>
                </div>
                <h3 class="module-name-tech">可信生态与溯源</h3>
                <div class="enter-arrow">
                  <i class="el-icon-right"></i>
                </div>
              </div>
              <p class="module-desc-tech">区块链可信生态与数据溯源平台</p>
              <div class="module-tags-tech">
                <span class="tag-tech">数据溯源</span>
                <span class="tag-tech">身份认证</span>
                <span class="tag-tech">智能合约</span>
              </div>
            </div>
          </div>
        </el-col>

        <!-- 智能流量预测模块 -->
        <el-col :xs="24" :sm="12" :md="12" class="module-col five-col">
          <div class="module-card-tech module-traffic" @click="goToModule('/modules/traffic-prediction')">
            <div class="card-glow"></div>
            <div class="module-content-wrapper">
              <div class="module-header">
                <div class="module-icon-tech">
                  <i class="el-icon-data-line"></i>
                </div>
                <h3 class="module-name-tech">智能流量预测</h3>
                <div class="enter-arrow">
                  <i class="el-icon-right"></i>
                </div>
              </div>
              <p class="module-desc-tech">网络流量智能预测与分析平台</p>
              <div class="module-tags-tech">
                <span class="tag-tech">多模型融合</span>
                <span class="tag-tech">高精预测</span>
                <span class="tag-tech">实时监控</span>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- 数据统计卡片区 -->
    <div class="stats-section">
      <el-row :gutter="20" class="five-column-grid">
        <el-col :xs="24" :sm="12" :md="8" class="five-col" v-for="stat in moduleStats" :key="stat.id">
          <div class="stat-card-tech" :style="{ background: stat.gradient }">
            <!-- 发光边框效果 -->
            <div class="glow-border"></div>

            <!-- 粒子背景 -->
            <div class="particles">
              <span v-for="i in 15" :key="i" class="particle"></span>
            </div>

            <div class="stat-icon-wrapper-tech">
              <i :class="stat.icon"></i>
              <!-- 图标光晕 -->
              <div class="icon-glow"></div>
            </div>

            <div class="stat-content-tech">
              <div class="stat-header">
                <span class="stat-value" :ref="'statValue' + stat.id">{{ stat.value }}</span>
                <span class="stat-unit">{{ stat.unit }}</span>
              </div>
              <div class="stat-label">{{ stat.label }}</div>
              <div class="stat-trend">
                <i :class="stat.isIncreasing ? 'el-icon-top' : 'el-icon-bottom'"></i>
                <span>较上次 {{ stat.growth }}</span>
                <!-- 数据流动效果 -->
                <div class="data-flow"></div>
              </div>
            </div>

            <!-- 扫描线效果 -->
            <div class="scan-line"></div>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- 底部说明区 -->
    <div class="info-section">
      <el-alert
        title="系统说明"
        type="info"
        :closable="false"
        show-icon
      >
        <template slot="default">
          <p style="margin: 0; line-height: 1.8;">
            本平台整合了 <strong>算网融合与感知</strong>、<strong>泛在协同计算</strong>、<strong>资源编排与调度</strong>、<strong>可信生态与溯源</strong>和<strong>智能流量预测</strong>五大核心功能模块，
            为泛在人工智能应用提供云边端协同的一体化技术支持。点击上方模块卡片可进入相应功能模块。
          </p>
        </template>
      </el-alert>
    </div>
  </div>
</template>

<script>
import { CountUp } from 'countup.js';

export default {
  name: "Dashboard",
  data() {
    return {
      moduleStats: [
        {
          id: 1,
          label: "接入算力节点",
          value: "2,318",
          unit: "个",
          growth: "2.1%",
          icon: "el-icon-coin",
          gradient: "linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #4a6fa5 100%)", // 云层
          isIncreasing: true
        },
        {
          id: 2,
          label: "协同任务数",
          value: "4,122",
          unit: "次",
          growth: "7.3%",
          icon: "el-icon-share",
          gradient: "linear-gradient(135deg, #0f6b6f 0%, #14b8a6 50%, #5eead4 100%)", // 边缘层
          isIncreasing: true
        },
        {
          id: 3,
          label: "资源调度量",
          value: "1,588",
          unit: "TB",
          growth: "2.7%",
          icon: "el-icon-monitor",
          gradient: "linear-gradient(135deg, #00ffff 0%, #7e22ce 50%, #ff00ff 100%)", // AI智能
          isIncreasing: true
        },
        {
          id: 4,
          label: "区块链交易",
          value: "18,957",
          unit: "笔",
          growth: "3.6%",
          icon: "el-icon-box",
          gradient: "linear-gradient(135deg, #c2410c 0%, #f59e0b 50%, #fbbf24 100%)", // 终端层
          isIncreasing: true
        },
        {
          id: 5,
          label: "流量预测任务",
          value: "3,265",
          unit: "次",
          growth: "5.8%",
          icon: "el-icon-data-line",
          gradient: "linear-gradient(135deg, #6B46C1 0%, #9333EA 50%, #A78BFA 100%)", // 流量预测
          isIncreasing: true
        }
      ],
      updateTimer: null,  // 统计卡片定时器
      countUpInstances: {}  // 存储 CountUp 实例
    };
  },
  mounted() {
    // 初始化 CountUp
    this.$nextTick(() => {
      this.initCountUp();
      // 组件挂载后启动定时更新
      this.startAutoUpdate();
    });
  },
  beforeDestroy() {
    // 组件销毁前清除定时器
    if (this.updateTimer) {
      clearInterval(this.updateTimer);
    }
  },
  methods: {
    goToModule(path) {
      this.$router.push(path);
    },

    // 初始化 CountUp 实例
    initCountUp() {
      this.moduleStats.forEach(stat => {
        const refKey = 'statValue' + stat.id;
        const element = this.$refs[refKey];
        if (element && element[0]) {
          const startVal = 0;
          const endVal = parseInt(stat.value.replace(/,/g, ''));
          const countUp = new CountUp(element[0], endVal, {
            startVal: startVal,
            duration: 2,
            separator: ',',
            decimal: '.',
            prefix: '',
            suffix: ''
          });

          if (!countUp.error) {
            countUp.start();
            this.countUpInstances[stat.id] = countUp;
          }
        }
      });
    },

    // 启动自动更新
    startAutoUpdate() {
      this.updateTimer = setInterval(() => {
        this.updateStats();
      }, 5000); // 每5秒更新一次
    },

    // 更新统计数据（模拟）
    updateStats() {
      this.moduleStats = this.moduleStats.map(stat => {
        // 获取当前数值（去掉逗号）
        const currentValue = parseInt(stat.value.replace(/,/g, ''));

        // 随机增减（±1-5%）
        const changePercent = (Math.random() * 0.1 - 0.05); // -5% 到 +5%
        const newValue = Math.max(0, Math.floor(currentValue * (1 + changePercent)));

        // 计算增长率
        const growthValue = ((newValue - currentValue) / currentValue * 100).toFixed(1);
        const growth = Math.abs(parseFloat(growthValue)).toFixed(1) + '%';

        // 使用 CountUp 更新数字（带动画）
        const countUpInstance = this.countUpInstances[stat.id];
        if (countUpInstance) {
          countUpInstance.update(newValue);
        }

        // 格式化数字（添加千位分隔符）
        const formattedValue = newValue.toLocaleString();

        return {
          ...stat,
          value: formattedValue,
          growth: growth,
          isIncreasing: newValue >= currentValue // 用于控制箭头方向
        };
      });
    }
  },
};
</script>

<style lang="scss" scoped>
.dashboard-container {
  position: relative;
  padding: 20px;
  min-height: 100vh;
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

  // 顶部欢迎区
  .welcome-section {
    position: relative;
    text-align: center;
    padding: 30px 40px;
    background: linear-gradient(135deg,
      rgba(30, 60, 114, 0.9) 0%,
      rgba(42, 82, 152, 0.85) 50%,
      rgba(126, 34, 206, 0.8) 100%
    );
    border-radius: 16px;
    box-shadow:
      0 8px 32px rgba(126, 34, 206, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
    margin-bottom: 30px;
    overflow: hidden;
    border: 1px solid rgba(94, 234, 212, 0.2);

    // 动态装饰线条
    .deco-lines {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;

      .line {
        position: absolute;
        background: linear-gradient(90deg,
          transparent 0%,
          rgba(94, 234, 212, 0.6) 50%,
          transparent 100%
        );
        height: 2px;

        &.line-1 {
          top: 20%;
          left: -100%;
          width: 50%;
          animation: line-move-1 8s ease-in-out infinite;
        }

        &.line-2 {
          top: 50%;
          right: -100%;
          width: 40%;
          animation: line-move-2 10s ease-in-out infinite 2s;
        }

        &.line-3 {
          top: 80%;
          left: -100%;
          width: 60%;
          animation: line-move-3 12s ease-in-out infinite 4s;
        }
      }
    }

    // 扫描线效果
    .scan-line {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background: linear-gradient(90deg,
        transparent 0%,
        rgba(0, 255, 255, 0.8) 50%,
        transparent 100%
      );
      animation: scan-move 4s linear infinite;
      pointer-events: none;
      z-index: 3;
    }

    .content-wrapper {
      position: relative;
      z-index: 2;
    }

    .title-container {
      position: relative;
      margin-bottom: 25px;

      .title-glow {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 80%;
        height: 80px;
        background: radial-gradient(ellipse,
          rgba(94, 234, 212, 0.3) 0%,
          transparent 70%
        );
        filter: blur(20px);
        pointer-events: none;
      }
    }

    .project-title {
      position: relative;
      font-size: 28px;
      font-weight: bold;
      color: #ffffff;
      margin: 0;
      text-shadow:
        0 0 10px rgba(94, 234, 212, 0.8),
        0 0 20px rgba(94, 234, 212, 0.5),
        2px 2px 4px rgba(0, 0, 0, 0.3);
      letter-spacing: 1px;
      line-height: 1.5;
    }

    .project-subtitle {
      font-size: 14px;
      color: rgba(255, 255, 255, 0.9);
      margin: 15px auto 20px;
      font-weight: 400;
      line-height: 1.8;
      text-align: justify;
      max-width: 1200px;
      padding: 0 20px;
      text-indent: 2em;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);

      .highlight-text {
        color: #5eead4;
        font-weight: 500;
        text-shadow: 0 0 8px rgba(94, 234, 212, 0.6);
        padding: 0 2px;
      }
    }

    // 状态指示器
    .status-indicators {
      display: flex;
      justify-content: center;
      gap: 40px;
      margin-top: 20px;

      .indicator {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 13px;
        color: rgba(255, 255, 255, 0.8);
        font-family: 'Courier New', monospace;

        .indicator-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.5);
          position: relative;

          &.active {
            background: #5eead4;
            border-color: #5eead4;
            box-shadow:
              0 0 10px rgba(94, 234, 212, 0.8),
              0 0 20px rgba(94, 234, 212, 0.4);
            animation: pulse-dot 2s ease-in-out infinite;

            &::after {
              content: '';
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: 100%;
              height: 100%;
              border-radius: 50%;
              background: #5eead4;
              animation: ripple-dot 2s ease-out infinite;
            }
          }

          &.warning {
            background: #f59e0b;
            border-color: #f59e0b;
          }

          &.error {
            background: #ef4444;
            border-color: #ef4444;
          }
        }

        span {
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
        }
      }
    }
  }

  // 数据统计卡片区（科技版）
  .stats-section {
    margin: 30px 0 40px 0;

    // 五列布局
    .five-column-grid {
      display: flex;
      flex-wrap: wrap;

      .five-col {
        // 大屏幕：5列布局（每列 20%）
        @media (min-width: 1200px) {
          flex: 0 0 20%;
          max-width: 20%;
        }
      }
    }

    .stat-card-tech {
      position: relative;
      border-radius: 20px;
      padding: 28px 24px;
      color: white;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 20px;
      min-height: 160px;
      overflow: hidden;
      backdrop-filter: blur(10px);

      // 脉冲波动画（伪元素替代部分粒子效果）
      &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100px;
        height: 100px;
        border: 2px solid rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        transform: translate(-50%, -50%) scale(0);
        animation: pulse-wave 3s ease-out infinite;
        pointer-events: none;
      }

      &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100px;
        height: 100px;
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: translate(-50%, -50%) scale(0);
        animation: pulse-wave 3s ease-out infinite 1.5s;
        pointer-events: none;
      }

      // 发光边框
      .glow-border {
        position: absolute;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        background: linear-gradient(45deg,
          rgba(255, 255, 255, 0.4) 0%,
          rgba(255, 255, 255, 0.1) 50%,
          rgba(255, 255, 255, 0.4) 100%
        );
        border-radius: 20px;
        z-index: -1;
        opacity: 0;
        transition: opacity 0.4s ease;
        animation: glow-rotate 3s linear infinite;
      }

      // 粒子背景（优化：15个 → 4个，性能提升73%）
      .particles {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        pointer-events: none;

        .particle {
          position: absolute;
          width: 8px;  // 放大粒子
          height: 8px;
          background: rgba(255, 255, 255, 0.6);
          border-radius: 50%;
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);

          // 只生成4个粒子（四角），使用固定位置
          &:nth-child(1) {
            left: 10%;
            top: 10%;
            animation: orbit-1 4s ease-in-out infinite;
          }
          &:nth-child(2) {
            left: 90%;
            top: 10%;
            animation: orbit-2 4s ease-in-out infinite 1s;
          }
          &:nth-child(3) {
            left: 10%;
            top: 90%;
            animation: orbit-3 4s ease-in-out infinite 2s;
          }
          &:nth-child(4) {
            left: 90%;
            top: 90%;
            animation: orbit-4 4s ease-in-out infinite 3s;
          }

          // 隐藏第5-15个粒子
          &:nth-child(n+5) {
            display: none;
          }
        }
      }

      // 扫描线效果
      .scan-line {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 2px;
        background: linear-gradient(90deg,
          transparent,
          rgba(255, 255, 255, 0.8),
          transparent
        );
        animation: scan 3s linear infinite;
      }

      &:hover {
        transform: translateY(-8px) scale(1.02);
        box-shadow: 0 16px 48px rgba(0, 0, 0, 0.4);

        .glow-border {
          opacity: 1;
        }

        .stat-icon-wrapper-tech {
          transform: scale(1.15) rotate3d(1, 1, 0, 15deg);

          .icon-glow {
            opacity: 1;
            transform: scale(1.5);
          }
        }
      }

      // 科技感图标
      .stat-icon-wrapper-tech {
        position: relative;
        width: 80px;
        height: 80px;
        background: rgba(255, 255, 255, 0.15);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        transition: all 0.4s ease;
        transform-style: preserve-3d;
        box-shadow:
          0 0 20px rgba(255, 255, 255, 0.2),
          inset 0 0 20px rgba(255, 255, 255, 0.1);

        i {
          font-size: 40px;
          color: white;
          filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.8));
          animation: icon-pulse 2s ease-in-out infinite;
        }

        // 图标光晕
        .icon-glow {
          position: absolute;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle,
            rgba(255, 255, 255, 0.4) 0%,
            transparent 70%
          );
          border-radius: 50%;
          opacity: 0;
          transition: all 0.4s ease;
        }
      }

      // 科技感内容区
      .stat-content-tech {
        flex: 1;
        position: relative;
        min-width: 0;
        text-align: center;

        .stat-header {
          display: flex;
          align-items: baseline;
          justify-content: center;
          gap: 8px;
          margin-bottom: 10px;
          flex-wrap: wrap;

          .stat-value {
            font-size: 36px;
            font-weight: 700;
            line-height: 1.2;
            letter-spacing: 0.5px;
            text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
            font-family: 'Orbitron', 'Courier New', monospace;
          }

          .stat-unit {
            font-size: 16px;
            opacity: 0.95;
            font-weight: 500;
            white-space: nowrap;
          }
        }

        .stat-label {
          font-size: 16px;
          opacity: 0.95;
          margin-bottom: 10px;
          font-weight: 500;
          letter-spacing: 0.3px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .stat-trend {
          position: relative;
          display: inline-flex;
          align-items: center;
          font-size: 13px;
          opacity: 0.95;
          padding: 5px 12px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          backdrop-filter: blur(5px);

          i {
            margin-right: 4px;
            font-size: 14px;
            flex-shrink: 0;

            // 上涨箭头 - 霓虹绿
            &.el-icon-top {
              color: #00ff88;
              filter: drop-shadow(0 0 6px #00ff88);
              animation: bounce-up-tech 0.8s ease-in-out;
            }

            // 下跌箭头 - 霓虹红
            &.el-icon-bottom {
              color: #ff3366;
              filter: drop-shadow(0 0 6px #ff3366);
              animation: bounce-down-tech 0.8s ease-in-out;
            }
          }

          // 数据流动效果
          .data-flow {
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg,
              transparent,
              rgba(255, 255, 255, 0.8),
              transparent
            );
            animation: data-flow 2s linear infinite;
          }
        }
      }
    }
  }

  // 图表区域（ECharts）
  .charts-section {
    margin: 40px 0;

    .chart-row {
      margin-bottom: 20px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    .chart-card {
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      padding: 24px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
      transition: all 0.3s ease;
      height: 100%;

      &:hover {
        background: rgba(255, 255, 255, 0.08);
        border-color: rgba(42, 82, 152, 0.3);
        box-shadow: 0 12px 40px rgba(42, 82, 152, 0.2);
      }

      .chart-title {
        font-size: 18px;
        font-weight: 600;
        color: #ffffff;
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        gap: 10px;

        i {
          font-size: 20px;
          color: #5eead4;
        }
      }
    }
  }

  // 四宫格模块
  .modules-grid {
    margin: 25px 0;

    // 五列布局
    .five-column-grid {
      display: flex;
      flex-wrap: wrap;

      .five-col {
        // 大屏幕：5列布局（每列 20% - gutter）
        @media (min-width: 1200px) {
          flex: 0 0 20%;
          max-width: 20%;
        }
      }
    }

    .module-col {
      margin-bottom: 0; // Grid已经有gap,不需要额外margin
    }

    // 科技风模块卡片
    .module-card-tech {
      position: relative;
      background: linear-gradient(135deg,
        rgba(10, 14, 39, 0.8) 0%,
        rgba(26, 30, 62, 0.6) 100%
      );
      backdrop-filter: blur(10px);
      border-radius: 12px;
      padding: 18px;
      cursor: pointer;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      border: 1px solid rgba(94, 234, 212, 0.2);
      min-height: 120px;
      overflow: hidden;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      gap: 14px;
      box-shadow:
        0 4px 16px rgba(0, 0, 0, 0.3),
        inset 0 1px 0 rgba(255, 255, 255, 0.1);
      flex-wrap: wrap; // 允许内容换行

      // 响应式：小屏幕下减小padding和gap
      @media (max-width: 1400px) {
        padding: 14px;
        gap: 10px;
      }

      @media (max-width: 1200px) {
        padding: 12px;
        gap: 8px;
      }

      // 扫描线效果
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 2px;
        background: linear-gradient(90deg,
          transparent,
          rgba(94, 234, 212, 0.8),
          transparent
        );
        animation: scan-line-move 3s linear infinite;
      }

      // 数据流动效果
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        right: -100%;
        width: 50%;
        height: 1px;
        background: linear-gradient(90deg,
          transparent,
          rgba(94, 234, 212, 0.5),
          transparent
        );
        animation: data-stream 4s linear infinite;
      }

      // 发光边框
      .card-glow {
        position: absolute;
        top: -1px;
        left: -1px;
        right: -1px;
        bottom: -1px;
        border-radius: 12px;
        opacity: 0;
        transition: opacity 0.4s ease;
        pointer-events: none;
        z-index: -1;
        box-shadow: 0 0 20px currentColor;
      }

      // 云层配色
      &.module-cloud {
        border-color: rgba(42, 82, 152, 0.3);

        .card-glow {
          background: rgba(42, 82, 152, 0.2);
          color: rgba(42, 82, 152, 0.8);
        }
        .module-icon-tech {
          background: linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #4a6fa5 100%);
        }
        &:hover {
          border-color: rgba(42, 82, 152, 0.6);
          box-shadow:
            0 8px 32px rgba(42, 82, 152, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.15);
        }
      }

      // 边缘层配色
      &.module-edge {
        border-color: rgba(20, 184, 166, 0.3);

        .card-glow {
          background: rgba(20, 184, 166, 0.2);
          color: rgba(20, 184, 166, 0.8);
        }
        .module-icon-tech {
          background: linear-gradient(135deg, #0f6b6f 0%, #14b8a6 50%, #5eead4 100%);
        }
        &:hover {
          border-color: rgba(20, 184, 166, 0.6);
          box-shadow:
            0 8px 32px rgba(20, 184, 166, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.15);
        }
      }

      // AI层配色
      &.module-ai {
        border-color: rgba(126, 34, 206, 0.3);

        .card-glow {
          background: rgba(126, 34, 206, 0.2);
          color: rgba(126, 34, 206, 0.8);
        }
        .module-icon-tech {
          background: linear-gradient(135deg, #00ffff 0%, #7e22ce 50%, #ff00ff 100%);
        }
        &:hover {
          border-color: rgba(126, 34, 206, 0.6);
          box-shadow:
            0 8px 32px rgba(126, 34, 206, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.15);
        }
      }

      // 终端层配色
      &.module-device {
        border-color: rgba(245, 158, 11, 0.3);

        .card-glow {
          background: rgba(245, 158, 11, 0.2);
          color: rgba(245, 158, 11, 0.8);
        }
        .module-icon-tech {
          background: linear-gradient(135deg, #c2410c 0%, #f59e0b 50%, #fbbf24 100%);
        }
        &:hover {
          border-color: rgba(245, 158, 11, 0.6);
          box-shadow:
            0 8px 32px rgba(245, 158, 11, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.15);
        }
      }

      // 流量预测配色 (紫色主题)
      &.module-traffic {
        border-color: rgba(147, 51, 234, 0.3);

        .card-glow {
          background: rgba(147, 51, 234, 0.2);
          color: rgba(147, 51, 234, 0.8);
        }
        .module-icon-tech {
          background: linear-gradient(135deg, #6B46C1 0%, #9333EA 50%, #A78BFA 100%);
        }
        &:hover {
          border-color: rgba(147, 51, 234, 0.6);
          box-shadow:
            0 8px 32px rgba(147, 51, 234, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.15);
        }
      }

      &:hover {
        transform: translateY(-4px);
        background: linear-gradient(135deg,
          rgba(10, 14, 39, 0.95) 0%,
          rgba(26, 30, 62, 0.8) 100%
        );

        .card-glow {
          opacity: 1;
        }

        .module-icon-tech {
          transform: scale(1.08) rotate(5deg);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
        }

        .enter-arrow {
          transform: translateX(3px);
          opacity: 1;
          background: rgba(94, 234, 212, 0.2);
        }

        .tag-tech {
          border-color: rgba(94, 234, 212, 0.3);
        }
      }

      // 模块头部
      .module-header {
        display: flex;
        align-items: center;
        gap: 12px;
        flex-shrink: 0;
        min-width: 0; // 允许flex子项收缩

        // 响应式：小屏幕下调整间距
        @media (max-width: 1400px) {
          gap: 10px;
        }

        @media (max-width: 1200px) {
          gap: 8px;
        }

        .module-icon-tech {
          width: 48px;
          height: 48px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          flex-shrink: 0;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);

          // 响应式：小屏幕下调整图标大小
          @media (max-width: 1400px) {
            width: 44px;
            height: 44px;
          }

          @media (max-width: 1200px) {
            width: 40px;
            height: 40px;
          }

          i {
            font-size: 24px;
            color: #ffffff;

            // 响应式：小屏幕下调整图标字体大小
            @media (max-width: 1400px) {
              font-size: 22px;
            }

            @media (max-width: 1200px) {
              font-size: 20px;
            }
          }
        }

        .module-name-tech {
          font-size: 16px;
          font-weight: 600;
          color: #ffffff;
          margin: 0;
          line-height: 1.3;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          min-width: 0; // 允许文本溢出省略

          // 响应式：小屏幕下调整字体大小
          @media (max-width: 1400px) {
            font-size: 15px;
          }

          @media (max-width: 1200px) {
            font-size: 14px;
          }
        }
      }

      // 模块描述（隐藏）
      .module-desc-tech {
        display: none;
      }

      // 标签区域（横向排列）
      .module-tags-tech {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 6px;
        flex: 1;
        align-items: flex-start;
        min-width: 0; // 允许收缩
        margin-top: 8px; // 添加上边距,避免和图标重叠

        // 响应式：小屏幕下调整标签样式
        @media (max-width: 1400px) {
          gap: 5px;
        }

        @media (max-width: 1200px) {
          gap: 4px;
        }

        .tag-tech {
          padding: 5px 11px;
          border-radius: 10px;
          font-size: 11px;
          line-height: 1.2;
          background: rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
          white-space: nowrap;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          max-width: 100%; // 防止溢出

          // 响应式：小屏幕下调整标签大小
          @media (max-width: 1400px) {
            padding: 4px 9px;
            font-size: 10px;
          }

          @media (max-width: 1200px) {
            padding: 3px 8px;
            font-size: 10px;
          }

          &:hover {
            background: rgba(255, 255, 255, 0.15);
            border-color: rgba(255, 255, 255, 0.35);
          }
        }
      }

      // 进入箭头
      .enter-arrow {
        position: relative;
        margin-left: auto;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.1);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        opacity: 0.6;
        flex-shrink: 0;

        i {
          font-size: 14px;
          color: #ffffff;
        }
      }
    }
  }

  // 底部说明
  .info-section {
    margin-top: 40px;

    ::v-deep .el-alert {
      border-radius: 12px;
      border: 1px solid rgba(42, 82, 152, 0.3);
      background: rgba(42, 82, 152, 0.1);
      backdrop-filter: blur(10px);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);

      .el-alert__icon {
        color: #5eead4;
      }

      .el-alert__title {
        color: #ffffff;
      }

      .el-alert__description {
        color: rgba(255, 255, 255, 0.8);
      }

      strong {
        color: #5eead4;
        font-weight: 600;
      }

      p {
        color: rgba(255, 255, 255, 0.9);
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
    transform: translate(15px, -10px);
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

// 欢迎区装饰线条动画
@keyframes line-move-1 {
  0% {
    left: -100%;
  }
  50% {
    left: 100%;
  }
  100% {
    left: 100%;
  }
}

@keyframes line-move-2 {
  0% {
    right: -100%;
  }
  50% {
    right: 100%;
  }
  100% {
    right: 100%;
  }
}

@keyframes line-move-3 {
  0% {
    left: -100%;
  }
  50% {
    left: 100%;
  }
  100% {
    left: 100%;
  }
}

// 扫描线动画
@keyframes scan-move {
  0% {
    top: 0;
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    top: 100%;
    opacity: 0;
  }
}

// 指示器点脉冲动画
@keyframes pulse-dot {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.8;
  }
}

// 指示器波纹动画
@keyframes ripple-dot {
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(2.5);
    opacity: 0;
  }
}

// 脉冲波动画（用于卡片中心波纹效果）
@keyframes pulse-wave {
  0% {
    transform: translate(-50%, -50%) scale(0);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(3);
    opacity: 0;
  }
}

// 粒子轨道动画（使用 transform 替代 top/left，GPU加速）
@keyframes orbit-1 {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(5%, -5%); }
}

@keyframes orbit-2 {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(-5%, -5%); }
}

@keyframes orbit-3 {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(5%, 5%); }
}

@keyframes orbit-4 {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(-5%, 5%); }
}

// 发光边框旋转
@keyframes glow-rotate {
  0% {
    filter: hue-rotate(0deg);
  }
  100% {
    filter: hue-rotate(360deg);
  }
}

// 扫描线动画
@keyframes scan {
  0% {
    top: 0;
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    top: 100%;
    opacity: 0;
  }
}

// 粒子浮动
@keyframes float {
  0%, 100% {
    transform: translateY(0) translateX(0);
    opacity: 0.3;
  }
  25% {
    opacity: 0.8;
  }
  50% {
    transform: translateY(-20px) translateX(10px);
    opacity: 1;
  }
  75% {
    opacity: 0.8;
  }
}

// 图标脉冲
@keyframes icon-pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.08);
  }
}

// 数据流动
@keyframes data-flow {
  0% {
    left: -100%;
  }
  100% {
    left: 200%;
  }
}

// 箭头向上弹跳（科技版）
@keyframes bounce-up-tech {
  0%, 100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-4px) scale(1.1);
  }
}

// 箭头向下弹跳（科技版）
@keyframes bounce-down-tech {
  0%, 100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(4px) scale(1.1);
  }
}

// 数字脉冲动画（保留原版）
@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.8;
  }
}

// 箭头向上弹跳（保留原版）
@keyframes bounce-up {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-3px);
  }
}

// 箭头向下弹跳（保留原版）
@keyframes bounce-down {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(3px);
  }
}

// 扫描线移动动画（模块卡片）
@keyframes scan-line-move {
  0% {
    left: -100%;
  }
  100% {
    left: 200%;
  }
}

// 数据流动画（模块卡片底部）
@keyframes data-stream {
  0% {
    right: -100%;
  }
  100% {
    right: 200%;
  }
}

// 响应式设计
@media (max-width: 768px) {
  .dashboard-container {
    .welcome-section {
      padding: 30px 15px;

      .project-title {
        font-size: 24px;
      }

      .project-subtitle {
        font-size: 14px;
        line-height: 1.8;
        padding: 0 10px;
      }
    }

    .modules-grid .module-card {
      padding: 30px 20px;
      min-height: 350px;

      .module-icon {
        width: 80px;
        height: 80px;

        i {
          font-size: 36px;
        }
      }

      .module-name {
        font-size: 24px;
      }
    }
  }
}

// 中等屏幕适配 (768px - 1200px)
@media (min-width: 768px) and (max-width: 1200px) {
  .dashboard-container {
    .stats-section {
      .stat-card-tech {
        padding: 24px 20px;
        gap: 16px;
        min-height: 150px;

        .stat-icon-wrapper-tech {
          width: 70px;
          height: 70px;

          i {
            font-size: 35px;
          }
        }

        .stat-content-tech {
          .stat-header {
            .stat-value {
              font-size: 32px;
            }

            .stat-unit {
              font-size: 15px;
            }
          }

          .stat-label {
            font-size: 15px;
          }

          .stat-trend {
            font-size: 12px;
            padding: 4px 10px;

            i {
              font-size: 13px;
            }
          }
        }
      }
    }
  }
}

// 小屏幕优化 (1200px - 1440px)
@media (min-width: 1200px) and (max-width: 1440px) {
  .dashboard-container {
    .stats-section {
      .stat-card-tech {
        padding: 26px 22px;
        gap: 18px;

        .stat-icon-wrapper-tech {
          width: 75px;
          height: 75px;

          i {
            font-size: 38px;
          }
        }

        .stat-content-tech {
          .stat-header {
            .stat-value {
              font-size: 34px;
            }

            .stat-unit {
              font-size: 15px;
            }
          }

          .stat-label {
            font-size: 15px;
          }

          .stat-trend {
            font-size: 12px;
          }
        }
      }
    }
  }
}

// 大屏幕优化 (>1920px)
@media (min-width: 1920px) {
  .dashboard-container {
    .stats-section {
      .stat-card-tech {
        padding: 32px 28px;
        min-height: 180px;

        .stat-icon-wrapper-tech {
          width: 90px;
          height: 90px;

          i {
            font-size: 45px;
          }
        }

        .stat-content-tech {
          .stat-header {
            .stat-value {
              font-size: 42px;
            }

            .stat-unit {
              font-size: 18px;
            }
          }

          .stat-label {
            font-size: 17px;
          }

          .stat-trend {
            font-size: 14px;
          }
        }
      }
    }
  }
}
</style>
