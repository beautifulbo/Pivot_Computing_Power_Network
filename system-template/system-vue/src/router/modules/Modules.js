import Layout from "@/layout/index";

export default {
  path: "/modules",
  component: Layout,
  name: "Modules",
  meta: {
    title: "应用中心",
    icon: "tree-table",
  },
  children: [
    {
      path: "ppio",
      name: "PPIO",
      component: () => import("@/views/modules/PPIO"),
      meta: {
        title: "算网融合与感知",
        icon: "server",
      },
    },
    {
      path: "federated-learning",
      name: "FederatedLearning",
      component: () => import("@/views/modules/FederatedLearning"),
      meta: {
        title: "泛在协同计算",
        icon: "nested",
      },
    },
    {
      path: "computing-trade",
      name: "ComputingTrade",
      component: () => import("@/views/modules/ComputingTrade"),
      meta: {
        title: "资源编排与调度",
        icon: "monitor",
      },
    },
    {
      path: "webase",
      name: "WeBase",
      component: () => import("@/views/modules/WeBase"),
      meta: {
        title: "可信生态与溯源",
        icon: "component",
      },
    },
    {
      path: "traffic-prediction",
      name: "TrafficPrediction",
      component: () => import("@/views/modules/TrafficPrediction"),
      meta: {
        title: "智能流量预测",
        icon: "chart",
      },
    },
  ],
};
