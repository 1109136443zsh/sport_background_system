import region from "@/assets/svg/region.svg"
export default {
  path: "/order",
  meta:{
    title: "订单管理",
    icon: region,
    rank: 4
  },
  children: [
    {
      path: "/order/list",
      name: "orderList",
      component: () => import("@/views/order/list/index.vue"),
      meta: {
        title: "订单列表"
      }
    }
  ]
}
