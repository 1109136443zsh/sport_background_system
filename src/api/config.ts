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
  page_data: PageData[];
  /**
   * 分页大小
   */
  size: number;
  [property: string]: any;
}

export interface PageData {
  /**
   * 配置项key
   */
  key: string;
  /**
   * 配置值value
   */
  value: string;
  [property: string]: any;
}
// 获取首页轮播图列表
export const getBannerList = () => {
  return http.request<Response>("get",
    "http://115.28.37.42:7788/admin/config/indexBanner/list"
  );
};
// 添加首页轮播图
export const addBanner = (data:object) => {
  return http.request<Response>("post",
    "http://115.28.37.42:7788/admin/config/indexBanner/add",
    {data}
  );
};
// 更新首页轮播图
export const updateBanner = (data:object) => {
  return http.request<Response>("post",
    "http://115.28.37.42:7788/admin/config/indexBanner/update",
    {data}
  );
};
// 删除首页轮播图
export const deleteBanner = (data:object) => {
  return http.request<Response>("post",
    "http://115.28.37.42:7788/admin/config/indexBanner/remove",
    {data}
  );
};
// 获取系统设置列表
export const getConfigList = (page:number) => {
  return http.request<Response>("get",
    `http://115.28.37.42:7788/admin/config/list?page=${page}`
  );
};
// 更新系统设置项
export const updateConfigList = (data:object) => {
  return http.request<Response>("post",
    "http://115.28.37.42:7788/admin/config/update",
    {data}
  );
};
