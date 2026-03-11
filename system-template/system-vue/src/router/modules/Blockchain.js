import Main from "@/layout/Main.vue";

export default {
  path: "/blockchain",
  component: Main,
  redirect: "/ppio",
  name: "blockchain",
  meta: {
    title: "区块链模块",
    icon: "box",
  },
  children: [
    {
      path: "/ppio",
      name: "PPIO",
      component: () => import("@/views/modules/PPIO"),
      meta: {
        title: "算网融合与感知",
        icon: "coin",
      },
    },
    {
      path: "/federated-learning",
      name: "FederatedLearning",
      component: () => import("@/views/modules/FederatedLearning"),
      meta: {
        title: "泛在协同计算",
        icon: "share",
      },
    },
    {
      path: "/computing-trade",
      name: "ComputingTrade",
      component: () => import("@/views/modules/ComputingTrade"),
      meta: {
        title: "资源编排与调度",
        icon: "monitor",
      },
    },
    {
      path: "/webase",
      name: "WeBase",
      component: () => import("@/views/modules/WeBase"),
      meta: {
        title: "可信生态与溯源",
        icon: "box",
      },
    },
  ],
};
