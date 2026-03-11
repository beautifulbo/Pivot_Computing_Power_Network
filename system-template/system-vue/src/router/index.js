import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/layout/index";
import security from "./modules/Security";
import user from "./modules/User";
import log from "./modules/Log";
import modules from "./modules/Modules";
import profile from "./modules/Profile";

Vue.use(VueRouter);

// 公开路由表（所有人都能看到菜单）
export const routes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/Login.vue"),
    hidden: true,
  },
  {
    path: "/",
    redirect: "/dashboard",
    component: Layout,
    children: [
      // 首页
      {
        path: "/dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/Dashboard"),
        meta: {
          title: "首页",
          icon: "dashboard",
        },
      },
      // 404
      {
        path: "/404",
        name: "404",
        component: () => import("@/views/error-page/404"),
        meta: {
          title: "404",
        },
      },
      // 401
      {
        path: "/401",
        name: "401",
        component: () => import("@/views/error-page/401"),
        meta: {
          title: "401",
        },
      },
    ],
  },
  // 应用中心菜单（包含四个子模块）
  modules,
];

// 私有路由表（需要权限才能看到菜单）
export const privateRoutes = [
  security,
  user,
  log,
  profile, // 个人中心放到最后
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes: [...routes],
});

Vue.use(VueRouter);
const VueRouterPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch((err) => err);
};

export default router;
