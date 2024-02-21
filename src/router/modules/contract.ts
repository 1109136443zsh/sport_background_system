import contract from "@/assets/svg/contract.svg"
export default {
  path: "/contract",
  meta:{
    title: "合同管理",
    icon: contract,
    rank: 5
  },
  children: [
    {
      path: "/contract/index",
      name: "contractManage",
      component: () => import("@/views/contract/all/index.vue"),
      meta: {
        title: "合同列表",
        showParent: true
      }
    },
    {
      path: "/contract/wait/index",
      name: "contractWaitManage",
      component: () => import("@/views/contract/wait/index.vue"),
      meta: {
        title: "待签署合同",
        showParent: true
      }
    },
    {
      path: "/contract/signed/index",
      name: "contractSignedManage",
      component: () => import("@/views/contract/signed/index.vue"),
      meta: {
        title: "已签署合同",
        showParent: true
      }
    }
  ]
}
