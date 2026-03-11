import Main from "@/layout/Main.vue";

export default {
  path: "/federated-learning",
  component: Main,
  redirect: "/federated-learning",
  name: "FederatedLearning",
  meta: {
    title: "泛在协同计算",
    icon: "share",
  },
  children: [
    {
      path: "/federated-learning",
      name: "FederatedLearningIndex",
      component: () => import("@/views/modules/FederatedLearning"),
      meta: {
        title: "泛在协同计算",
        icon: "share",
        // 外部链接配置
        isExternal: true,
        externalUrl: "http://82.157.104.186:3000/home/portal"
      },
    },
  ],
};
