import total from "@/assets/svg/total.svg?component";
export default {
  path: "/total",
  redirect: "/total/index",
  meta:{
    icon: total,
    title: "统计",
    rank: 9
  },
  children: [
    {
      path: "/total/index",
      name: "Total",
      component: () => import("@/views/total/index.vue"),
      meta: {
        title: "统计",
      }
    }
  ]
}
