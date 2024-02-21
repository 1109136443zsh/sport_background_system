import settle from "@/assets/svg/settle.svg"
export default {
  path: "/settle",
  redirect: "/settle/venue/index",
  meta:{
    icon: settle,
    title: "入驻管理",
    rank: 12
  },
  children: [
    {
      path: "/settle/venue/index",
      name: "venueManage",
      component: () => import("@/views/settle/venue/index.vue"),
      meta: {
        title: "场馆入驻管理",
        showParent: true
      }
    },
    {
      path: "/settle/coach/index",
      name: "",
      component: () => import("@/views/settle/coach/index.vue"),
      meta: {
        title: "教练入驻管理",
        showParent: true
      }
    }
  ]
}
