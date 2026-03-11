import Layout from "@/layout/index";

export default {
  path: "/user",
  component: Layout,
  redirect: "/user/userList",
  name: "userManage",
  meta: {
    title: "用户管理",
    icon: "personnel-manage",
  },
  children: [
    {
      path: "/user/userList",
      name: "UserList", // 修改为与组件name一致（UserList.vue 中定义的name）
      component: () => import("@/views/user/UserList.vue"),
      meta: {
        title: "用户列表",
        icon: "peoples",
      },
    },
  ],
};
