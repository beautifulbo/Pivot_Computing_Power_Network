<template>
  <div class="login-container">
    <el-row>
      <div :style="videoContainerStyle" class="video-container">
        <!-- <div :style="fixStyle" class="filter"></div> -->
          <video muted autoplay loop :style="videoContainerStyle" class="fillWidth" v-on:canplay="canplay" ref="myVideo">
        <source src="/static/login3.MP4" type="video/mp4"/>
        浏览器不支持 video 标签，建议升级浏览器。
      </video>
 </div>
      <el-col :span="17" class="video-col">
      
      </el-col>
      <el-col :span="7">
        
          <div class="white-overlay"></div>
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="right">

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
  
  </el-col>
</el-row>
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
      // videoContainerStyle: {
      //   position: 'relative',
      //   width: '100%',
      //   height: '100%',
      //   overflow: 'hidden',
      // },
    fixStyle:{
      width: '100%', // 设置视频容器宽度
        position: 'relative',
        height: '100%',
        overflow: 'hidden',
        //paddingBottom: '56.25%', 
    },
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

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}

$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
}

  .login-form {
    position: absolute;
  padding: 160px 35px 0;
  margin: 0 auto;
  overflow: hidden;
    // position: relative;
    // width: 520px;
    // max-width: 100%;
    // padding: 160px 35px 0;
    // margin: 0 auto;
    // overflow: hidden;
  }
  .white-overlay {
  position: absolute;
  padding: 460px 300px 0;
  margin: 0 auto;
  top: 80px;
  // left: 50px;
  // width: 100px;
  // height: 100px;
  background-color: white; /* 设置白色背景 */
  opacity: 0.5; /* 设置透明度，根据需要进行调整 */
  z-index: 1; /* 确保白色图层在表单之上 */
}

  .tips {
    font-size: 14px;
    color: #fff;
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


    .video-container {
  position: relative;
  z-index: 1; /* 设置视频容器的层级为 1，使其在布局中处于底层 */
}
  

  .video-container video {
    position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  //   z-index: 0;
  //   position: relative;
  //   width: 100%; /* 视频宽度充满父容器 */
  // height: 100%; /* 视频高度充满父容器 */

  // object-fit: fill;
  }

  .video-container .filter {
    z-index: 1;
    position: absolute;
    
    background: rgba(0, 0, 0, 0.4);
  }
  .video-col {
  height: 100%; /* 使 video-col 高度充满整个 el-col */
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
