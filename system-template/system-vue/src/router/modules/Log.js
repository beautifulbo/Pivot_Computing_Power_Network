import Layout from "@/layout/index";

export default {
  path: "/log",
  component: Layout,
  redirect: "/log/operation",
  name: "logManage",
  meta: {
    title: "日志管理",
    icon: "server",
  },
  children: [
    {
      path: "/log/operation",
      name: "Operation", // 修改为与组件name一致（Operation.vue 中定义的name）
      component: () => import("@/views/log/Operation.vue"),
      meta: {
        title: "操作日志",
        icon: "access",
      },
    },
  ],
};
