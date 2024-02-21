import {http} from "@/utils/http";

export interface Response {
  /**
   * 状态码
   */
  code: number;
  /**
   * 数据
   */
  data: Datum[];
  /**
   * 说明
   */
  msg: string;
  [property: string]: any;
}

export interface Datum {
  /**
   * 是否启用
   */
  enable: boolean;
  /**
   * 图片地址
   */
  image: string;
  /**
   * 排序序号
   */
  sort: number;
  /**
   * 跳转链接
   */
  url: string;
  [property: string]: any;
}
// 获取首页轮播图列表
export const getBannerList = () => {
  return http.request<Response>("get",
    "https://mock.apifox.com/m1/4020694-0-default/admin/config/indexBanner/list"
  );
};
// 添加首页轮播图
export const addBanner = (data:object) => {
  return http.request<Response>("post",
    "https://mock.apifox.com/m1/4020694-0-default/admin/config/indexBanner/add",
    {data}
  );
};
// 更新首页轮播图
export const updateBanner = (data:object) => {
  return http.request<Response>("post",
    "https://mock.apifox.com/m1/4020694-0-default/admin/config/indexBanner/update",
    {data}
  );
};
// 删除首页轮播图
export const deleteBanner = (data:object) => {
  return http.request<Response>("post",
    "https://mock.apifox.com/m1/4020694-0-default/admin/config/indexBanner/remove",
    {data}
  );
};
