import Layout from "@/layout/index";

export default {
  path: "/profile",
  component: Layout,
  name: "Profile", // 必须与数据库中menu表的permission字段匹配
  meta: {
    title: "个人中心",
    icon: "user",
  },
  children: [
    {
      path: "",  // 改为空路径，这样子路由路径就是 /profile
      name: "ProfileIndex", // 保持不变，需要修改组件的name为ProfileIndex
      component: () => import("@/views/profile/Profile"),
      meta: {
        title: "个人中心",
        icon: "user",
      },
    },
  ],
};
