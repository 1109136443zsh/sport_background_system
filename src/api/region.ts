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
export const getRegionList = (data:object) => {
  return http.request<Response>("get",
    "https://mock.apifox.com/m1/4020694-0-default/admin/region/list",
    {data}
  );
};
export const deleteRegion = (data:object) => {
  return http.request<Response>("post",
    "https://mock.apifox.com/m1/4020694-0-default/admin/region/remove",
    {data}
  );
};
export const addRegion = (data:object) => {
  return http.request<Response>("post",
    "https://mock.apifox.com/m1/4020694-0-default/admin/region/add",
    {data}
  );
};
