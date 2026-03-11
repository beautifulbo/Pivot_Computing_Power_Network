import { getLocal } from '@/utils/utils';

export async function loadBMap() {
  return new Promise(function (resolve, reject) {
    const data = JSON.parse(getLocal('mapData') as string);
    if (typeof window.BMap !== 'undefined') {
      resolve(window.BMap);
      return true;
    }
    window.onBMapCallback = function () {
      resolve(window.BMap);
    };
    
    // 引入百度地图 v2.0
    const script = document.createElement('script');
    script.type = 'text/javascript';
    // 使用 // 开头的URL，自动匹配当前页面的协议（http或https）
    script.src =
      '//api.map.baidu.com/api?v=2.0&ak=' +
      data.map.accessKey +
      '&callback=onBMapCallback';
    script.onerror = reject;
    document.head.appendChild(script);
  });
}
