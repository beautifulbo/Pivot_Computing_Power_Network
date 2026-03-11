<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :rules="loginRules"
      :model="loginForm"
      class="login-form-container"
    >
      <div class="login-header">
        <h1 class="login-title">面向泛在人工智能的云边端协同一体化系统</h1>
        <p class="login-subtitle">技术与应用平台</p>
      </div>
      <el-form-item prop="username">
        <el-input
          type="text"
          v-model="loginForm.username"
          placeholder="请输入用户名"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          auto-complete="false"
          v-model="loginForm.password"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input
          type="text"
          auto-complete="false"
          v-model="loginForm.code"
          placeholder="点击图片更换验证码"
          style="width: 210px; margin-right: 10px"
        ></el-input>
        <img
          :src="kaptchaUrl"
          @click="updateKaptcha"
          :style="{ cursor: isLoadingKaptcha ? 'not-allowed' : 'pointer', opacity: isLoadingKaptcha ? 0.6 : 1 }"
          title="点击刷新验证码"
        />
      </el-form-item>
      <el-button
        type="primary"
        style="width: 100%; margin-bottom: 20px"
        @click="submitLogin"
        >登录
      </el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Login",

  data() {
    // 生成唯一的验证码key（用于区分不同用户）
    const kaptchaKey = Date.now() + "_" + Math.random().toString(36).substring(2, 15);
    return {
      kaptchaKey: kaptchaKey,
      kaptchaUrl: "/kaptcha?key=" + kaptchaKey + "&time=" + Date.now(),
      isLoadingKaptcha: false, // 验证码加载状态
      // 用户登录表单
      loginForm: {
        username: "",
        password: "",
        code: "",
        key: kaptchaKey, // 添加key字段
      },
      loginRules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
        ],
        code: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "blur",
          },
        ],
      },
    };
  },

  mounted() {},

  methods: {
    // 生成验证码key（使用时间戳+随机数）
    generateKaptchaKey() {
      return Date.now() + "_" + Math.random().toString(36).substring(2, 15);
    },
    // 表单提交事件
    submitLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$store.dispatch("user/login", this.loginForm).then(() => {
            // 跳转到后台首页
            this.$router.push("/dashboard");
          });
        } else {
          this.$message.error("请输入所有内容");
          return false;
        }
      });
    },
    // 点击图片更换验证码（添加防抖优化）
    updateKaptcha() {
      // 如果正在加载中，则忽略点击
      if (this.isLoadingKaptcha) {
        return;
      }

      // 设置加载状态
      this.isLoadingKaptcha = true;

      // 生成新的验证码key
      this.kaptchaKey = this.generateKaptchaKey();
      this.loginForm.key = this.kaptchaKey;

      // 更新验证码URL（包含新的key）
      this.kaptchaUrl = "/kaptcha?key=" + this.kaptchaKey + "&time=" + Date.now();

      // 500ms后解除加载状态（防抖）
      setTimeout(() => {
        this.isLoadingKaptcha = false;
      }, 500);
    },
  },
};
</script>

<style lang="scss" scoped>
.login-container {
  overflow: hidden;
  // 修改为更符合AI科技感的渐变背景：深蓝到紫色
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #7e22ce 100%);
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  // 添加动态网格背景效果
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image:
      linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
    background-size: 50px 50px;
    opacity: 0.3;
  }

  // 添加动态光晕效果
  &::after {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(147, 51, 234, 0.15) 0%, transparent 70%);
    animation: rotate 20s linear infinite;
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.login-form-container {
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  margin: 0 auto;
  width: 420px;
  padding: 40px 45px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  position: relative;
  z-index: 1;

  .login-header {
    text-align: center;
    margin-bottom: 35px;

    .login-title {
      font-size: 20px;
      font-weight: bold;
      color: #303133;
      margin: 0 0 12px 0;
      line-height: 1.4;
      background: linear-gradient(135deg, #1e3c72 0%, #7e22ce 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .login-subtitle {
      font-size: 14px;
      color: #909399;
      margin: 0;
      font-weight: 300;
    }
  }

  ::v-deep .el-form-item {
    margin-bottom: 25px;

    .el-input__inner {
      height: 45px;
      line-height: 45px;
      border-radius: 8px;
      border: 1px solid #DCDFE6;
      transition: all 0.3s;

      &:focus {
        border-color: #2a5298;
        box-shadow: 0 0 8px rgba(42, 82, 152, 0.3);
      }
    }
  }

  ::v-deep .el-button {
    height: 45px;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 500;
    background: linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #7e22ce 100%);
    border: none;
    transition: all 0.3s;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(126, 34, 206, 0.4);
    }

    &:active {
      transform: translateY(0);
    }
  }

  img {
    border-radius: 6px;
    height: 45px;
    border: 1px solid #DCDFE6;
  }
}

::v-deep .el-form-item__content {
  display: flex;
  align-items: center;
}

// 响应式设计
@media (max-width: 768px) {
  .login-form-container {
    width: 90%;
    padding: 30px 25px;

    .login-header .login-title {
      font-size: 18px;
    }
  }
}
</style>
