<template>
  <el-breadcrumb class="breadcrumb" separator-icon="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="(item, index) in getBreadcrumData"
        :key="item.path"
      >
        <!-- 不可点击项，一般为数组中的最后一个 -->
        <span class="no-redirect" v-if="index === breadcrumData.length - 1">
          {{ item.meta.title }}
        </span>
        <!-- 可点击项 -->
        <span class="redirect" v-else @click="onLinkClick(item)">{{
          item.meta.title
        }}</span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
export default {
  name: "Breadcrumb",

  data() {
    return {
      breadcrumData: [],
    };
  },
  computed: {
    getBreadcrumData() {
      // 使用 route.match 属性来获取到当前路由的路由表
      this.breadcrumData = this.$route.matched.filter(
        (item) => item.meta && item.meta.title
      );
      return this.breadcrumData;
    },
  },
  methods: {
    // 鼠标点击跳转事件
    onLinkClick(item) {
      this.$router.push(item.path);
    },
  },
};
</script>

<style lang="scss" scoped>
.breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  ::v-deep .el-breadcrumb__separator {
    color: rgba(94, 234, 212, 0.5);
  }

  ::v-deep .el-breadcrumb__inner {
    color: rgba(255, 255, 255, 0.7);
    font-weight: 500;
  }

  .redirect {
    color: rgba(255, 255, 255, 0.7);
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .redirect:hover {
    color: #5eead4;
    text-shadow: 0 0 8px rgba(94, 234, 212, 0.6);
  }

  .no-redirect {
    color: #5eead4;
    font-weight: 600;
  }
}
</style>
