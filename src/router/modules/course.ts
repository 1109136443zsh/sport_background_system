import course from "@/assets/svg/course.svg?component";
export default {
  path: "/course",
  redirect: "/course/index",
  meta:{
    title: "课程管理",
    icon: course,
    rank: 11
  },
  children: [
    {
      path: "/course/list",
      name: "courseManage",
      component: () => import("@/views/course/index.vue"),
      meta: {
        title: "课程列表",
        roles: ["管理员"]
      }
    }
  ]
}
