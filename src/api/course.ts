import {http} from "@/utils/http";
import {baseUrlApi} from "@/api/utils";
import {getToken} from "@/utils/auth";

export interface Response {
  /**
   * 状态码
   */
  code: number;
  /**
   * 数据
   */
  data: Data;
  /**
   * 说明
   */
  msg: string;

  [property: string]: any;
}

/**
 * 数据
 */
export interface Data {
  /**
   * 总条数
   */
  count: number;
  /**
   * 当前页
   */
  page: number;
  page_data: CourseBase[];
  /**
   * 分页大小
   */
  size: number;

  [property: string]: any;
}

/**
 * 课程基础信息
 */
export interface CourseBase {
  /**
   * 课程id
   */
  course_id: string;
  /**
   * 课程名
   */
  name: string;
  /**
   * 价格，数字价格 单位分
   */
  price: number;
  /**
   * 价格介绍，价格介绍的文本内容
   */
  price_info: string;
  /**
   * 小标题，课程名下面的小标题
   */
  subtitle: string;
  /**
   * 课程类型
   */
  type: number;

  [property: string]: any;
}

// 获取课程列表
export const getCourseList = (data: { page: number, course_type?: number }) => {
  const {page, course_type} = data
  return http.request<Response>("get",
    baseUrlApi(`/admin/course/list?page=${page}&course_type=${course_type}`),
    {},
    {
      headers: {
        "token": getToken().accessToken
      }
    }
  );
};
// 删除课程
export const removeCourse = (data: object) => {
  return http.request<Response>("post",
    baseUrlApi("/admin/course/remove"),
    {data},
    {
      headers: {
        "token": getToken().accessToken
      }
    }
  );
};
// 新增课程
export const addCourse = (data: object) => {
  return http.request<Response>("post",
    baseUrlApi("/admin/course/add"),
    {data},
    {
      headers: {
        "token": getToken().accessToken
      }
    }
  );
};
// 更新课程
export const updateCourse = (data: object) => {
  return http.request<Response>("post",
    baseUrlApi("/admin/course/update"),
    {data},
    {
      headers: {
        "token": getToken().accessToken
      }
    }
  );
};
// 获取课程详情
export const getCourseDetail = (data: object) => {
  return http.request<Response>("get",
    baseUrlApi("/admin/course/get"),
    {data},
    {
      headers: {
        "token": getToken().accessToken
      }
    }
  );
};
