import bill from "@/assets/svg/bill.svg?component";
export default {
  path: "/wallet",
  redirect: "/wallet/index",
  meta:{
    icon: bill,
    title: "财务管理",
    rank: 6
  },
  children: [
    {
      path: "/wallet/order/index",
      name: "orderManage",
      component: () => import("@/views/wallet/order/index.vue"),
      meta: {
        title: "所有订单",
        showParent: true
      }
    },
    {
      path: "/wallet/selfOrder/index",
      name: "selfOrderManage",
      component: () => import("@/views/wallet/selfOrder/index.vue"),
      meta: {
        title: "个人订单",
        showParent: true
      }
    },
    {
      path: "/wallet/payment/index",
      name: "paymentManage",
      component: () => import("@/views/wallet/payment/index.vue"),
      meta: {
        title: "所有收支详情",
        showParent: true
      }
    },
    {
      path: "/wallet/selfPayment/index",
      name: "selfPaymentManage",
      component: () => import("@/views/wallet/selfPayment/index.vue"),
      meta: {
        title: "个人收支详情",
        showParent: true
      }
    }
  ]
}
