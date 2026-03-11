// 跨域代理对象
let proxyObjct = {};

// 注意：WeBase 的代理已移至 Nginx 配置
// 请参考 nginx-webase.conf 文件
// WeBase 现在通过 Nginx 的 sub_filter 功能处理，以解决 iframe 跳转问题

// 所有路径都要进行代理（后端API）
proxyObjct["/"] = {
  // WebSocket
  ws: false,
  // 代理到哪里去
  target: "http://localhost:8090",
  // 发送请求头host会被设置成target
  changeOrigin: true,
  // 不重写请求地址
  pathRewrite: {
    "^/": "/",
  },
};

// 使用svg图标时的路径处理
const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  devServer: {
    host: "0.0.0.0",  // 允许外部访问
    port: 8080,
    proxy: proxyObjct,
  },
  // 配置使用svg图标
  chainWebpack(config) {
    config.module.rule("svg").exclude.add(resolve("src/icons")).end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      })
      .end();
  },
};
