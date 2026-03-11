<template>
  <div class="login-container">
   
        <div class="video-container">
        <!-- <div :style="fixStyle" class="filter"></div> -->
          <video muted autoplay loop :style="fixStyle" class="fillWidth" v-on:canplay="canplay" ref="myVideo">
        <source src="/static/login3.MP4" type="video/mp4"/>
        浏览器不支持 video 标签，建议升级浏览器。
      </video>
 </div>
      
        <div class="form-container">  
          <div class="white-overlay"></div>
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">铁塔自适应流量预测功能验证</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">Login</el-button>

      <div class="tips">
        <span style="margin-right:20px;">username: admin</span>
        <span> password: any</span>
      </div>

    </el-form>
  </div>
 
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
    videoCanPlay:false,
    fixStyle:'',
      loginForm: {
        username: 'admin',
        password: '111111'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    canplay() {
      this.videoCanPlay=true;
      // const video = this.$refs.myVideo; // 添加 ref="myVideo" 到 video 标签上
      // video.play()
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
 
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      // &:-webkit-autofill {
      //   box-shadow: 0 0 0px 1000px $bg inset !important;
      //   -webkit-text-fill-color: $cursor !important;
      // }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color:#ccc;
  }
}

$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

// .login-container {
//   min-height: 100%;
//   width: 100%;
//   background-color: $bg;
//   overflow: hidden;
// }
.login-container {
  position: relative;
  width: 100%;
  height: 100vh; /* 100% 视口高度 */
  overflow: hidden;
}

.video-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1; /* 确保视频在最底层 */
}

video.fillWidth {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 覆盖整个容器，保持视频比例 */
}

.form-container {
  position: absolute;
  top: 30%;
  left: 65%;
  //transform: translate(-50%, -50%);
  z-index: 3; /* 确保表单在视频上一层 */
  /* 其他表单样式 */
}
  .login-form {
    position: relative;
  padding: 30px 25px 0;
  margin: 0 auto;
  overflow: hidden;
  color:#ccc;
 
  }
  .white-overlay {
  position: absolute;
  padding: 400px 200px 0;
  margin: 0 auto;
 
  background-color: white; /* 设置白色背景 */
  opacity: 0.8; /* 设置透明度，根据需要进行调整 */
  z-index: 2; /* 确保白色图层在表单之上 */
}

  .tips {
    font-size: 14px;
    color: #f9f9f9;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }


  // .video-container {
  //   position: relative;
  //   height: auto;
  //   overflow: hidden;
  // }

  .video-container video {
    z-index: 0;
    position: absolute;
    width: 100%; /* 视频宽度充满父容器 */
  height: 100%; /* 视频高度充满父容器 */
  }

  .video-container .filter {
    z-index: 1;
    position: absolute;
    
    background: rgba(0, 0, 0, 0.4);
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

</style>
