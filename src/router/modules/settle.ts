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
      name: "venue",
      component: () => import("@/views/settle/venue/index.vue"),
      meta: {
        title: "场馆",
        showParent: true,
        roles: ["管理员"]
      }
    },
    {
      path: "/settle/coach/index",
      name: "coach",
      component: () => import("@/views/settle/coach/index.vue"),
      meta: {
        title: "教练",
        showParent: true,
        roles: ["管理员"]
      }
    },
    {
      path: "/settle/partner/index",
      name: "partner",
      component: () => import("@/views/settle/partner/index.vue"),
      meta: {
        title: "合伙人",
        showParent: true,
        roles: ["管理员"]
      }
    }
  ]
}
