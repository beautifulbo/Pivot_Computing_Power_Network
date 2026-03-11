import Main from "@/layout/Main.vue";

export default {
  path: "/ppio",
  component: Main,
  redirect: "/ppio",
  name: "PPIO",
  meta: {
    title: "算网融合与感知",
    icon: "coin",
  },
  children: [
    {
      path: "/ppio",
      name: "PPIOIndex",
      component: () => import("@/views/modules/PPIO"),
      meta: {
        title: "算网融合与感知",
        icon: "coin",
      },
    },
  ],
};
