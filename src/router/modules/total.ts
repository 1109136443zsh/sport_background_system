import total from "@/assets/svg/total.svg?component";

export default {
  path: "/total",
  redirect: "/total/index",
  meta: {
    icon: total,
    title: "统计",
    rank: 9
  },
  children: [
    {
      path: "/total/customs/index",
      name: "customs",
      component: () => import("@/views/total/customs/index.vue"),
      meta: {
        title: "新用户数量",
        showParent: true
      }
    },
    {
      path: "/total/orderNum/index",
      name: "orderNum",
      component: () => import("@/views/total/orderNum/index.vue"),
      meta: {
        title: "订单数量",
        showParent: true
      }
    },
    {
      path: "/total/income/index",
      name: "income",
      component: () => import("@/views/total/income/index.vue"),
      meta: {
        title: "收入数量",
        showParent: true
      }
    }
  ]
}
