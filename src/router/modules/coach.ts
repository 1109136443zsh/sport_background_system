import coach from "@/assets/svg/coach.svg?component";
export default {
  path: "/coach",
  redirect: "/coach/index",
  meta:{
    icon: coach,
    title: "教练管理",
    rank: 7
  },
  children: [
    {
      path: "/list/index",
      name: "coachManage",
      component: () => import("@/views/coach/list/index.vue"),
      meta: {
        title: "教练列表",
        roles: ["管理员"]
      }
    },
    {
      path: "/rate/course/index",
      name: "rateCourseManage",
      component: () => import("@/views/coach/rate/index.vue"),
      meta: {
        title: "星级管理",
        roles: ["管理员"]
      }
    }
  ]
}
