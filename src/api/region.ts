import {http} from "@/utils/http";
import {getToken} from "@/utils/auth";
import {baseUrlApi} from "@/api/utils";

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
    baseUrlApi(`/admin/region/list?page=${page}`),
    {},
    {
      headers: {
        "token": getToken().accessToken
      }
    }
  );
};
// 删除区域
export const deleteRegion = (data: object) => {
  return http.request<Response>("post",
    baseUrlApi("/admin/region/remove"),
    {data},
    {
      headers: {
        "token": getToken().accessToken
      }
    }
  );
};
// 新增区域
export const addRegion = (data: object) => {
  return http.request<Response>("post",
    baseUrlApi("/admin/region/add"),
    {data},
    {
      headers: {
        "token": getToken().accessToken
      }
    }
  );
};
