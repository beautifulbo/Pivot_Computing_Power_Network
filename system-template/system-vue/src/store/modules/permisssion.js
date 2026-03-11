import { routes, privateRoutes } from "@/router";

export default {
  namespaced: true,
  state: () => ({
    // 路由表，初始时所拥有的路由表
    routes: routes,
  }),
  mutations: {
    // 增加路由
    setRoutes(state, newRoutes) {
      state.routes = [...routes, ...newRoutes];
    },
  },
  actions: {
    /**
     * 根据权限数据进行路由的筛选
     *
     * @param {*} context
     * @param {*} menus 权限数据
     */
    filterRoutes(context, menus) {
      // 筛选之后，获取到需要通过 addRoute 进行添加的路由表数组
      const routes = [];
      let profileRoute = null;

      // 添加保护性检查：确保menus是数组
      if (!menus || !Array.isArray(menus)) {
        console.error("权限数据无效:", menus);
        // 返回空路由数组，添加404路由
        const fallbackRoutes = [{
          path: "/:catchAll(.*)",
          redirect: "/404",
        }];
        context.commit("setRoutes", fallbackRoutes);
        return fallbackRoutes;
      }

      menus.forEach((key) => {
        // 跳过空值
        if (!key) {
          return;
        }

        const matchedRoutes = privateRoutes.filter((item) => item.name === key);

        // 如果是个人中心路由，暂存起来（判断key是"个人中心"或"Profile"）
        if (key === "个人中心" || key === "Profile") {
          if (matchedRoutes.length > 0) {
            profileRoute = matchedRoutes[0];
          }
        } else {
          if (matchedRoutes.length > 0) {
            routes.push(...matchedRoutes);
          }
        }
      });

      // 将个人中心放到最后
      if (profileRoute) {
        routes.push(profileRoute);
      }

      // 所有不匹配的路由，全部进入 404 路由配置页面
      // 注意：该配置必须在所有路由指定之后
      routes.push({
        path: "/:catchAll(.*)",
        redirect: "/404",
      });
      context.commit("setRoutes", routes);
      return routes;
    },
  },
};
