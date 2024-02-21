import config from "@/assets/svg/config.svg?component";
export default {
  path: "/config",
  redirect: "/config/index",
  meta:{
    title: "配置",
    icon: config,
    rank: 10
  },
  children: [
    {
      path: "/config/index",
      name: "configManage",
      component: () => import("@/views/configuration/index.vue"),
      meta: {
        title: "配置"
      }
    }
  ]
}
