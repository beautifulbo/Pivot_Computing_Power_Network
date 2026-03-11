/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { history } from '@umijs/max';
import { notification } from 'antd';
import { stringify } from 'querystring';
import { extend } from 'umi-request';
import { GUIDKEY, iThingsSetToken, TOKENKEY } from './const';
import { getTimestamp, getToken, setToken, setUID } from './utils';
import { 
  mockDeviceCountData,
  mockDeviceListData,
  mockProductListData,
  mockGroupListData,
  mockUserListData,
  mockRoleListData,
  mockMenuListData,
  mockApiListData,
  mockLogData,
  mockDeviceDetailData,
} from './mockData';

// 开启模拟数据模式 - 禁用所有真实 API 调用
const USE_MOCK_DATA = true;

// const codeMessage = {
//   200: '服务器成功返回请求的数据。',
//   201: '新建或修改数据成功。',
//   202: '一个请求已经进入后台排队（异步任务）。',
//   204: '删除数据成功。',
//   400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
//   401: '用户没有权限（令牌、用户名、密码错误）。',
//   403: '用户得到授权，但是访问是被禁止的。',
//   404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
//   406: '请求的格式不可得。',
//   410: '请求的资源被永久删除，且不会再得到的。',
//   422: '当创建一个对象时，发生一个验证错误。',
//   500: '服务器发生错误，请检查服务器。',
//   502: '网关错误。',
//   503: '服务不可用，服务器暂时过载或维护。',
//   504: '网关超时。',
// };

/**
 * 异常处理程序
 */
const errorHandler = (error: { response: Response; isReturnResponse?: boolean }): Response => {
  const { response, isReturnResponse } = error;

  // 如果是模拟数据拦截，直接返回响应，不显示错误
  if (isReturnResponse && USE_MOCK_DATA) {
    return response;
  }

  if (response && response.status) {
    response
      .clone()
      .text()
      .then((v) => {
        const regex = /"msg":"([^"]+)"/;
        const match = v.match(regex);
        try {
          const data = JSON.parse(v);
          // 只在非模拟模式下显示错误
          if (!USE_MOCK_DATA) {
            notification.error({
              message: `请求错误, 错误码:${data.code}`,
              description: data.message || data.msg,
            });
          }
        } catch {
          if (!USE_MOCK_DATA) {
            notification.error({
              message: `请求错误, 错误码:${response.status}`,
              description: match?.[1] || v,
            });
          }
        }
      });
  } else if (!response && !USE_MOCK_DATA) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }

  return response;
};

const redirectLoginPage = () => {
  const queryString = stringify({
    redirect: window.location.href,
  });
  history.push(`/user/login?${queryString}`);
};

// 模拟数据拦截器 - 阻止真实 API 调用
const mockDataInterceptor = (url: string, options: any) => {
  if (USE_MOCK_DATA) {
    // 返回一个 Promise，模拟 API 响应
    return Promise.reject({
      response: new Response(
        JSON.stringify({
          code: 200,
          msg: 'Mock data',
          data: {},
        }),
        {
          status: 200,
          statusText: 'OK',
          headers: new Headers({
            'Content-Type': 'application/json',
          }),
        }
      ),
      isReturnResponse: true,
    });
  }
  
  const token = getToken();
  options.headers[GUIDKEY] = getTimestamp();

  if (token && options.headers) {
    options.headers[TOKENKEY] = token;
  }
  const IThingsSetTokenValue = localStorage.getItem('iThingsSetToken');

  if (IThingsSetTokenValue) {
    options.headers[TOKENKEY] = IThingsSetTokenValue;
  }
  return {
    url,
    options: { ...options },
  };
};

//响应拦截器
const responseInterceptors = (response: any) => {
  const IThingsSetTokenValue = response.headers.get(iThingsSetToken);
  if (IThingsSetTokenValue) {
    setToken(IThingsSetTokenValue);
    localStorage.setItem('iThingsSetToken', IThingsSetTokenValue);
  } else {
    localStorage.setItem('iThingsSetToken', '');
  }

  if (response.status === 401 && window.location.pathname !== '/user/login') {
    setToken('');
    setUID('');
    return redirectLoginPage();
  }
  return response;
};

/**
 * 配置request请求时的默认参数
 */
const originalRequest = extend({
  errorHandler, // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
  timeout: 200000,
});

export const stream = extend({
  credentials: 'include',
  parseResponse: false,
});

// 模拟响应生成器 - 根据URL返回对应的假数据
const getMockResponse = (url: string, options?: any) => {
  console.log(`[MOCK] Blocked API call to: ${url}`);
  
  // 设备相关
  if (url.includes('/device/info/count')) {
    return mockDeviceCountData;
  }
  if (url.includes('/device/info/read')) {
    return mockDeviceDetailData;
  }
  if (url.includes('/device/info/index') || url.includes('/device/info')) {
    return mockDeviceListData;
  }
  
  // 产品相关
  if (url.includes('/product/info/index') || url.includes('/product/info')) {
    return mockProductListData;
  }
  
  // 分组相关
  if (url.includes('/group/info/index') || url.includes('/group/info')) {
    return mockGroupListData;
  }
  
  // 用户管理
  if (url.includes('/user/index') || url.includes('/user/read')) {
    return mockUserListData;
  }
  
  // 角色管理
  if (url.includes('/role/index') || url.includes('/role/read')) {
    return mockRoleListData;
  }
  
  // 菜单管理
  if (url.includes('/menu/index') || url.includes('/menu/read')) {
    return mockMenuListData;
  }
  
  // 接口管理
  if (url.includes('/api/index') || url.includes('/api/read')) {
    return mockApiListData;
  }
  
  // 日志相关
  if (url.includes('/log/')) {
    return mockLogData;
  }
  
  // 默认空响应
  return {
    code: 200,
    msg: 'success',
    data: {
      list: [],
      total: 0,
      listAll: [],
      info: {},
      menu: [],
    },
  };
};

// 如果启用模拟模式，包装 request 函数
const request = USE_MOCK_DATA 
  ? (url: string, options?: any) => {
      return Promise.resolve(getMockResponse(url, options));
    }
  : originalRequest;

// 只在非模拟模式下使用拦截器
if (!USE_MOCK_DATA) {
  originalRequest.interceptors.request.use(mockDataInterceptor, { global: false });
  stream.interceptors.request.use(mockDataInterceptor, { global: false });
  originalRequest.interceptors.response.use(responseInterceptors, { global: false });
}

export default request;
