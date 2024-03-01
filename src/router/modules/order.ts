import region from "@/assets/svg/region.svg"
import {DataInfo, getToken, userKey} from "@/utils/auth";
import {storageLocal} from "@pureadmin/utils";
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
        title: "订单列表",
        roles: ["管理员", "场馆"],
        auths: [storageLocal().getItem<DataInfo<number>>(userKey)?.role ?? ""]
      }
    }
  ]
}
