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
  page_data: Gym[];
  /**
   * 分页大小
   */
  size: number;
  [property: string]: any;
}

/**
 * 场馆基础信息
 */
export interface Gym {
  /**
   * 封面图
   */
  cover_image: string;
  /**
   * 场馆id
   */
  gym_id: number;
  /**
   * 纬度
   */
  latitude: number;
  /**
   * 地址名
   */
  location: string;
  /**
   * 经度
   */
  longitude: number;
  /**
   * 场馆名
   */
  name: string;
  /**
   * 场馆等级，名称
   */
  rate: string;
  /**
   * 场馆等级id
   */
  rate_id: number;
  /**
   * 场馆所属区域ID
   */
  region_id: number;
  /**
   * 评分，【暂不实现 仅做设计】直接返回5.0
   */
  score: number;
  /**
   * 标签
   */
  tags?: string[];
  [property: string]: any;
}

// 获取场馆列表
export const getGymList = (data:object) => {
  return http.request<Response>("get",
    "https://mock.apifox.com/m1/4020694-0-default/admin/gym/list",
    {data}
  );
};
//获取场馆详情
export const getGymDetail = (data:object) => {
  return http.request<Response>("get",
    "https://mock.apifox.com/m1/4020694-0-default/admin/gym/get",
    {data}
  );
};
// 更新场馆资料
export const updateGym = (data:object) => {
  return http.request<Response>("post",
    "https://mock.apifox.com/m1/4020694-0-default/admin/gym/update",
    {data}
  );
};
// 场馆星级-获取列表
export const getRateList = () => {
  return http.request<Response>("get",
    "https://mock.apifox.com/m1/4024188-0-default/admin/gym/rateList"
  );
};
// 场馆星级-增加
export const rateAdd = (data:object) => {
  return http.request<Response>("post",
    "https://mock.apifox.com/m1/4024188-0-default/admin/gym/rateAdd",
    {data}
  );
};
// 场馆星级-删除
export const rateRemove = (data:object) => {
  return http.request<Response>("post",
    "https://mock.apifox.com/m1/4024188-0-default/admin/gym/rateRemove",
    {data}
  );
};
// 场馆星级-更新
export const rateUpdate = (data:object) => {
  return http.request<Response>("post",
    "https://mock.apifox.com/m1/4024188-0-default/admin/gym/rateUpdate",
    {data}
  );
};
// 获取场馆可上课程
export const getRateCourseList = (data:object) => {
  return http.request<Response>("post",
    "https://mock.apifox.com/m1/4024188-0-default/admin/gym/courseList",
    {data}
  );
};
// 删除场馆可上课程
export const rateCourseRemove = (data:object) => {
  return http.request<Response>("post",
    "https://mock.apifox.com/m1/4024188-0-default/admin/gym/courseRemove",
    {data}
  );
};
// 添加场馆可上课程
export const rateCourseAdd = (data:object) => {
  return http.request<Response>("post",
    "https://mock.apifox.com/m1/4024188-0-default/admin/gym/courseAdd",
    {data}
  );
};
