<template>
  <div class="tags-view-container">
    <div class="tags-view-left">
      <router-link
        class="tags-view-item"
        v-for="(tag, index) in this.$store.getters.tagsViewList"
        :class="isActive(tag) ? 'active' : ''"
        :key="tag.fullPath"
        :to="{ path: tag.fullPath }"
        :style="{
          backgroundColor: isActive(tag) ? 'rgba(94, 234, 212, 0.2)' : '',
          borderColor: isActive(tag) ? '#5eead4' : '',
          color: isActive(tag) ? '#5eead4' : '',
        }"
      >
        {{ tag.meta.title }}
        <i
          v-show="tag.path != '/dashboard'"
          class="el-icon-close"
          @click.prevent.stop="onCloseClick(index)"
        ></i>
      </router-link>
    </div>
    <!-- 关闭全部 -->
    <div class="tags-view-right">
      <span class="tags-view-item" @click="closeAll">关闭全部</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TagsView",
  data() {
    return {
      // 鼠标右键
      selectIndex: 0,
    };
  },

  methods: {
    // 是否被选中
    isActive(tag) {
      return tag.path === this.$route.path;
    },
    // 关闭 tag 的点击事件
    onCloseClick(index) {
      this.selectIndex = index;
      this.$store.commit("app/removeTagsView", {
        type: "index",
        index,
      });
      // 如果关闭的是当前标签页则返回上一个标签页
      if (index === this.selectIndex) {
        this.$router.push(
          this.$store.getters.tagsViewList[
            this.$store.getters.tagsViewList.length - 1
          ].path
        );
      }
    },
    // 关闭全部标签事件
    closeAll() {
      this.$store.commit("app/closeAllTagsView");
      // 跳转路由到仪表盘
      this.$router.push("/dashboard");
    },
  },
};
</script>

<style lang="scss" scoped>
.tags-view-container {
  display: flex;
  justify-content: space-between;
  height: 34px;
  width: 100%;
  background: linear-gradient(90deg,
    rgba(10, 14, 39, 0.95) 0%,
    rgba(26, 30, 62, 0.95) 100%
  );
  border-bottom: 1px solid rgba(94, 234, 212, 0.2);
  box-shadow: 0 2px 8px rgba(94, 234, 212, 0.1);

  .tags-view-left {
    width: calc(100% - 100px);
    /* 设置超出滚动 */
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;

    /* 自定义滚动条 */
    &::-webkit-scrollbar {
      height: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background: rgba(94, 234, 212, 0.3);
      border-radius: 2px;
    }

    &::-webkit-scrollbar-track {
      background: rgba(0, 0, 0, 0.1);
    }
  }

  .tags-view-right {
    width: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    right: 10px;
  }

  .tags-view-item {
    text-decoration: none;
    display: inline-block;
    position: relative;
    cursor: pointer;
    height: 26px;
    line-height: 26px;
    border: 1px solid rgba(94, 234, 212, 0.3);
    color: rgba(255, 255, 255, 0.7);
    background: rgba(10, 14, 39, 0.5);
    padding: 0 8px;
    font-size: 12px;
    margin-left: 5px;
    margin-top: 4px;
    margin-bottom: 2px;
    border-radius: 4px;
    transition: all 0.3s ease;

    &:first-of-type {
      margin-left: 15px;
    }
    &:last-of-type {
      margin-right: 15px;
    }

    &:hover {
      background: rgba(94, 234, 212, 0.1);
      border-color: rgba(94, 234, 212, 0.6);
      color: #5eead4;
    }

    &.active {
      font-weight: 600;
      box-shadow: 0 0 10px rgba(94, 234, 212, 0.3);

      &::before {
        content: "";
        background: #5eead4;
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        position: relative;
        margin-right: 4px;
        box-shadow: 0 0 6px rgba(94, 234, 212, 0.8);
        animation: pulse-dot 2s ease-in-out infinite;
      }
    }

    // close 按钮
    .el-icon-close {
      width: 16px;
      height: 16px;
      line-height: 10px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      color: rgba(255, 255, 255, 0.5);

      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }

      &:hover {
        background-color: rgba(94, 234, 212, 0.3);
        color: #5eead4;
      }
    }
  }
}

@keyframes pulse-dot {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.2);
  }
}
</style>
