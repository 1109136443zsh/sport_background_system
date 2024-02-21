import {http} from "@/utils/http";

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
  page_data: PageDatum[];
  /**
   * 分页大小
   */
  size: number;
  [property: string]: any;
}

export interface PageDatum {
  /**
   * 课程ID
   */
  course_id: number;
  /**
   * 课程名
   */
  course_name: string;
  [property: string]: any;
}
// 场馆星级-获取列表
export const getRateList = () => {
  return http.request<Response>("get",
    "https://mock.apifox.com/m1/4024188-0-default/admin/coach/rateList"
  );
};

// 教练星级-增加
export const rateAdd = (data:object) => {
  return http.request<Response>("post",
    "https://mock.apifox.com/m1/4020694-0-default/admin/coach/rateAdd",
    {data}
  );
};
// 教练星级-更新
export const rateUpdate = (data:object) => {
  return http.request<Response>("post",
    "https://mock.apifox.com/m1/4020694-0-default/admin/coach/rateUpdate",
    {data}
  );
};
// 教练星级-删除
export const rateRemove = (data:object) => {
  return http.request<Response>("post",
    "https://mock.apifox.com/m1/4024188-0-default/admin/coach/rateRemove",
    {data}
  );
};

// 教练星级-添加可上课程
export const rateCourseAdd = (data:object) => {
  return http.request<Response>("post",
    "https://mock.apifox.com/m1/4020694-0-default/admin/coach/rateCourseAdd",
    {data}
  );
};
// 教练星级-获取可上课程列表
export const getRateCourseList = (data:object) => {
  return http.request<Response>("post",
    "https://mock.apifox.com/m1/4024188-0-default/admin/coach/rateCourseList",
    {data}
  );
};
// 教练星级-删除可上课程
export const rateCourseRemove = (data:object) => {
  return http.request<Response>("post",
    "https://mock.apifox.com/m1/4020694-0-default/admin/coach/rateCourseRemove",
    {data}
  );
};
