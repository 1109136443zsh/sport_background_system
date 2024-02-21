import student from "@/assets/svg/student.svg"
export default {
  path: "/student",
  redirect: "/student/index",
  meta:{
    icon: student,
    title: "学员管理",
    rank: 4
  },
  children: [
    {
      path: "/student/index",
      name: "stuManage",
      component: () => import("@/views/student/index.vue"),
      meta: {
        icon: "flUser",
        title: "学员管理"
      }
    }
  ]
}
