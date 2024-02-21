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
   * 场馆ID
   */
  gym_id: number;
  /**
   * 场馆地址
   */
  gym_location: string;
  /**
   * 场馆名字
   */
  gym_name: string;
  [property: string]: any;
}

// 教练可去场馆-列表
export const getGymEnableList = (data:object) => {
  return http.request<Response>("post",
    "https://mock.apifox.com/m1/4020694-0-default/admin/coach/gymEnable/list",
    {data}
  );
};
// 教练可去场馆-添加
export const gymEnableAdd = (data:object) => {
  return http.request<Response>("post",
    "https://mock.apifox.com/m1/4020694-0-default/admin/coach/gymEnable/add",
    {data}
  );
};
// 教练可去场馆-删除
export const gymEnableRemove = (data:object) => {
  return http.request<Response>("post",
    "https://mock.apifox.com/m1/4020694-0-default/admin/coach/gymEnable/add",
    {data}
  );
};
