import Main from "@/layout/Main.vue";

export default {
  path: "/webase",
  component: Main,
  redirect: "/webase",
  name: "WeBase",
  meta: {
    title: "可信生态与溯源",
    icon: "box",
  },
  children: [
    {
      path: "/webase",
      name: "WeBaseIndex",
      component: () => import("@/views/modules/WeBase"),
      meta: {
        title: "可信生态与溯源",
        icon: "box",
      },
    },
  ],
};
