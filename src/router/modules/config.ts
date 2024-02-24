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
      component: () => import("@/views/configuration/banner/index.vue"),
      meta: {
        title: "首页轮播图设置"
      }
    },
    {
      path: "/config/list/index",
      name: "configList",
      component: () => import("@/views/configuration/setting/index.vue"),
      meta: {
        title: "系统配置"
      }
    }
  ]
}
