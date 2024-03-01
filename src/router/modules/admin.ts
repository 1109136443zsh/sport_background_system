import coach from "@/assets/svg/coach.svg?component";

export default {
  path: "/admin",
  redirect: "/admin/index",
  meta: {
    icon: "setting",
    title: "后台管理",
    rank: 3
  },
  children: [
    {
      path: "/admin/role/index",
      name: "roleManage",
      component: () => import("@/views/admin/role/index.vue"),
      meta: {
        title: "角色管理",
        showParent: true,
        roles: ["管理员"]
      }
    },
    // {
    //   path: "/admin/permission/index",
    //   name: "permisssionManage",
    //   component: () => import("@/views/admin/power/index.vue"),
    //   meta: {
    //     title: "权限管理",
    //     showParent: true
    //   }
    // },
    {
      path: "/admin/user/index",
      name: "userManage",
      component: () => import("@/views/admin/user/index.vue"),
      meta: {
        title: "用户管理",
        showParent: true,
        roles: ["管理员"]
      }
    },
  ]
}
