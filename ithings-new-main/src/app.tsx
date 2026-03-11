import type { MenuDataItem, Settings as LayoutSettings } from '@ant-design/pro-layout';
import { history } from '@umijs/max';
import { IconMap } from './utils/iconMap';
import { loadBMap } from './utils/map';
import { setLocal } from './utils/utils';
import { mockSystemConfig } from './utils/mockData';

const loginPath = '/user/login';

// 模拟菜单数据 - 完整菜单
const mockMenuData = [
  {
    path: '/home',
    name: '首页',
    icon: 'icon_menu_01',
  },
  {
    path: '/deviceMangers',
    name: '设备管理',
    icon: 'icon_data_01',
    children: [
      {
        name: '产品',
        path: '/deviceMangers/product/index',
      },
      {
        name: '设备',
        path: '/deviceMangers/device/index',
      },
      {
        name: '分组',
        path: '/deviceMangers/group/index',
      },
    ],
  },
  {
    path: '/ruleEngine',
    name: '算力监控',
    icon: 'icon_menu_02',
    children: [
      {
        name: '场景联动',
        path: '/ruleEngine/scene/index',
      },
    ],
  },
  {
    path: '/systemMangers',
    name: '系统管理',
    icon: 'icon_menu_03',
    children: [
      {
        name: '用户管理',
        path: '/systemMangers/user/index',
      },
      {
        name: '角色管理',
        path: '/systemMangers/role/index',
      },
      {
        name: '菜单管理',
        path: '/systemMangers/menu/index',
      },
      {
        name: '接口管理',
        path: '/systemMangers/api/index',
      },
    ],
  },
  {
    path: '/operationsMonitorings',
    name: '运维监控',
    icon: 'icon_menu_04',
    children: [
      {
        name: '在线调试',
        path: '/operationsMonitorings/onlineDebugs/index',
      },
      {
        name: '日志服务',
        path: '/operationsMonitorings/logService/index',
      },
      {
        name: '远程配置',
        path: '/operationsMonitorings/remoteConfiguration/index',
      },
    ],
  },
  {
    path: '/alarmMangers',
    name: '告警管理',
    icon: 'icon_menu_05',
    children: [
      {
        name: '告警配置',
        path: '/alarmMangers/alarmConfiguration/index',
      },
      {
        name: '告警记录',
        path: '/alarmMangers/alarmConfiguration/log',
      },
    ],
  },
];

const loopMenuItem = (menus: any[]): MenuDataItem[] =>
  menus.map(({ icon, children, hideInMenu, ...item }) => {
    return {
      ...item,
      key: item.path, // 添加 key 字段，避免 layout 错误
      icon: icon ? (
        <img
          src={IconMap[icon as string]}
          alt=""
          style={{
            width: 14,
            height: 14,
            marginRight: 5,
            marginBottom: 5,
          }}
        />
      ) : undefined,
      children: children && loopMenuItem(children),
      hideInMenu: hideInMenu === 1,
    };
  });

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: { userInfo: USER.UserInfoType; menuInfo: MenuDataItem[] };
  fetchUserInfo?: () => Promise<
    { userInfo: USER.UserInfoType; menuInfo: MenuDataItem[] } | undefined
  >;
}> {
  const fetchUserInfo = async () => {
    // 设置百度地图配置到 localStorage
    setLocal('mapData', JSON.stringify(mockSystemConfig.data));

    // 加载百度地图
    loadBMap();

    // 返回模拟的用户信息和菜单
    const mockUserInfo = {
      nickName: '演示用户',
      userName: 'demo',
      userID: '1',
      email: 'demo@example.com',
      phone: '13800138000',
      wechat: '',
      lastIP: '127.0.0.1',
      regIP: '127.0.0.1',
      role: {
        id: 1,
        name: '管理员',
        status: 1,
        remark: '系统管理员',
      },
    };

    const menuInfo = loopMenuItem(mockMenuData);
    return { userInfo: mockUserInfo, menuInfo };
  };

  // 直接跳转到首页，不需要登录
  const currentPath = history.location.pathname;
  if (currentPath === loginPath || currentPath === '/' || currentPath === '/user/login') {
    setTimeout(() => {
      history.push('/home');
    }, 0);
  }

  const currentUser = await fetchUserInfo();
  return {
    fetchUserInfo,
    currentUser,
    settings: {},
  };
}
