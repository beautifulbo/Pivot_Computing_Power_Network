<template>
            <div>

<iframe ref="iframe" :src='src'  frameborder='0' style="width:100%;height:500px"></iframe>

<!-- 统计图容器 -->
<!-- <div id="main" style="width: 100%;height: 500px;"></div> -->
<!-- <iframe :src= 'src' id="map" frameborder='0' style="width:100%;height:500px"></iframe> -->

</div>
</template>
<script>
export default{

    data() {
    return {

      src: 'static/tieta_ecdn_1.html',
    }
},
methods: {
    onClick() {
      //预测按钮方法

      window.addEventListener('message', this.getiframeMsg)


    },
    // vue获取iframe传递过来的信息
    getiframeMsg(event) {
      const res = event.data;
      console.log(event)
      if (res.cmd === 'myIframe') {
        console.log(res)
      }
    },
    // vue向iframe传递信息
    vueSendMsg() {
      const iframeWindow = this.$refs.iframe.contentWindow;
      iframeWindow.postMessage({
        cmd: 'myVue',
        params: {
          info: 'Vue向iframe传递的消息',
        }
      }, '*')
    },
    // 触发iframe中的方法

    iframeMethods() {
      this.$refs.iframe.contentWindow.triggerByVue('通过Vue触发iframe中的方法');
    },
  },
  // mounted() {
  //   window.addEventListener('message', this.getiframeMsg)
  // },
};
</script>
