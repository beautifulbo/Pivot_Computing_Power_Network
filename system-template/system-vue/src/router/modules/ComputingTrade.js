import Main from "@/layout/Main.vue";

export default {
  path: "/computing-trade",
  component: Main,
  redirect: "/computing-trade",
  name: "ComputingTrade",
  meta: {
    title: "资源编排与调度",
    icon: "monitor",
  },
  children: [
    {
      path: "/computing-trade",
      name: "ComputingTradeIndex",
      component: () => import("@/views/modules/ComputingTrade"),
      meta: {
        title: "资源编排与调度",
        icon: "monitor",
        // 外部链接配置
        isExternal: true,
        externalUrl: "/computing-trade/ithings/user/login"
      },
    },
  ],
};
