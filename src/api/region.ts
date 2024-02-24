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
   * 区域名称
   */
  name: string;
  /**
   * 区域ID
   */
  region_id: string;

  [property: string]: any;
}
// 获取区域列表
export const getRegionList = (data: { page: number }) => {
  const {page} = data
  return http.request<Response>("get",
    `http://115.28.37.42:7788/admin/region/list?page=${page}`
  );
};
// 删除区域
export const deleteRegion = (data: object) => {
  return http.request<Response>("post",
    "http://115.28.37.42:7788/admin/region/remove",
    {data}
  );
};
// 新增区域
export const addRegion = (data: object) => {
  return http.request<Response>("post",
    "http://115.28.37.42:7788/admin/region/add",
    {data}
  );
};
