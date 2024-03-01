import gym from "@/assets/svg/gym.svg?component";
import {getToken} from "@/utils/auth";

export default {
  path: "/gym",
  redirect: "/gym/index",
  meta: {
    title: "场馆管理",
    icon: gym,
    rank: 8
  },
  children: [
    {
      path: "/gymList/index",
      name: "gymManage",
      component: () => import("@/views/gym/list/index.vue"),
      meta: {
        title: "场馆列表",
        showParent: true,
        roles: ["管理员", "场馆"],
      }
    },
    {
      path: "/gymRate/index",
      name: "gymRateManage",
      component: () => import("@/views/gym/rate/index.vue"),
      meta: {
        title: "星级列表",
        showParent: true,
        roles: ["管理员"]
      }
    }
  ]
}
