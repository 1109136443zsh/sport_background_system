import bill from "@/assets/svg/bill.svg?component";
export default {
  path: "/bill",
  redirect: "/bill/index",
  meta:{
    title: "发票管理",
    icon: bill,
    rank: 13
  },
  children: [
    // {
    //   path: "/bill/self/index",
    //   name: "selfBillManage",
    //   component: () => import("@/views/bill/self/index.vue"),
    //   meta: {
    //     title: "个人发票"
    //   }
    // },
    // {
    //   path: "/bill/all/index",
    //   name: "allBillManage",
    //   component: () => import("@/views/bill/all/index.vue"),
    //   meta: {
    //     title: "发票列表"
    //   }
    // }
  ]
}
