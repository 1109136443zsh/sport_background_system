import coach from "@/assets/svg/coach.svg?component";
export default {
  path: "/card",
  redirect: "/card/index",
  meta:{
    title: "会员卡管理",
    rank: 14
  },
  children: [
    {
      path: "/card/list/index",
      name: "cardListManage",
      component: () => import("@/views/card/list/index.vue"),
      meta: {
        title: "会员卡列表"
      }
    },
    {
      path: "/card/type/index",
      name: "typeManage",
      component: () => import("@/views/card/typeList/index.vue"),
      meta: {
        title: "类型列表"
      }
    }
  ]
}
