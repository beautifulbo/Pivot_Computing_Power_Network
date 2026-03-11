<template>
  <div class="sidebar-tech">
    <!-- 顶部装饰线 -->
    <div class="top-deco"></div>

    <div class="logo-container">
      <!-- 使用系统图标 -->
      <svg-icon
        icon="system"
        class="logo-icon"
      ></svg-icon>
    </div>

    <sidebar-menu></sidebar-menu>

    <!-- 底部装饰 -->
    <div class="bottom-deco">
      <div class="scan-line"></div>
    </div>
  </div>
</template>

<script>
import SidebarMenu from "./components/SidebarMenu";

export default {
  name: "Sidebar",
  components: { SidebarMenu },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.sidebar-tech {
  position: relative;
  height: 100%;
  background: linear-gradient(180deg,
    #0a0e27 0%,
    #1a1e3e 50%,
    #0a0e27 100%
  );
  border-right: 1px solid rgba(94, 234, 212, 0.2);
  overflow-x: hidden;

  // 顶部装饰线
  .top-deco {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg,
      transparent 0%,
      rgba(94, 234, 212, 0.8) 50%,
      transparent 100%
    );
  }

  // 底部装饰
  .bottom-deco {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 60px;
    pointer-events: none;

    .scan-line {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background: linear-gradient(90deg,
        transparent 0%,
        rgba(94, 234, 212, 0.6) 50%,
        transparent 100%
      );
      animation: pulse-line 3s ease-in-out infinite;
    }
  }
}

.logo-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 140px;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 20px;
  background: transparent;
  border-bottom: none;
  margin-bottom: 0;
  z-index: 10;

  .logo-icon {
    width: 80px;
    height: 80px;
    font-size: 50px;
    color: #5eead4;
    flex-shrink: 0;
    filter: drop-shadow(0 0 10px rgba(94, 234, 212, 0.8));
    transition: all 0.3s ease;
    z-index: 1;

    &:hover {
      transform: scale(1.1) rotate(5deg);
      filter: drop-shadow(0 0 20px rgba(94, 234, 212, 1));
    }
  }

  .logo-title {
    margin-left: 10px;
    color: #fff;
    font-weight: 600;
    line-height: 50px;
    font-size: 16px;
    white-space: nowrap;
  }

  // 系统状态指示
  .system-status {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-top: 10px;
    font-size: 11px;
    color: #5eead4;
    font-family: 'Courier New', monospace;
    letter-spacing: 2px;
    z-index: 1;

    .status-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #5eead4;
      box-shadow:
        0 0 8px rgba(94, 234, 212, 0.8),
        0 0 16px rgba(94, 234, 212, 0.4);
      animation: blink-dot 2s ease-in-out infinite;
    }
  }
}

// 动画
@keyframes pulse-line {
  0%, 100% {
    opacity: 0.3;
  }
  50% {
    opacity: 1;
  }
}

@keyframes blink-dot {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
}
</style>
