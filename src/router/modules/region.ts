import region from "@/assets/svg/region.svg"
export default {
  path: "/region",
  meta:{
    title: "区域管理",
    icon: region,
    rank: 13
  },
  children: [
    {
      path: "/region/index",
      name: "regionManage",
      component: () => import("@/views/region/index.vue"),
      meta: {
        title: "区域管理"
      }
    }
  ]
}
