import Layout from "@/layout/index";

export default {
  path: "/security",
  component: Layout,
  redirect: "/security/roles",
  name: "security",
  meta: {
    title: "权限管理",
    icon: "security",
  },
  children: [
    {
      path: "/security/roles",
      name: "Roles", // 修改为与组件name一致（Roles.vue 中定义的name）
      component: () => import("@/views/security/Roles.vue"),
      meta: {
        title: "角色管理",
        icon: "role",
      },
    },
    // 菜单列表和接口文档已隐藏，如需使用请取消注释
    // {
    //   path: "/security/menus",
    //   name: "menus",
    //   component: () => import("@/views/security/Menus.vue"),
    //   meta: {
    //     title: "菜单列表",
    //     icon: "menu",
    //   },
    // },
    // {
    //   path: "/security/interface",
    //   name: "swagger",
    //   component: () => import("@/views/security/Interface.vue"),
    //   meta: {
    //     title: "接口文档",
    //     icon: "swagger",
    //   },
    // },
  ],
};
