import {http} from "@/utils/http";

type Response = {
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
type Data = {
  /**
   * 总条数
   */
  count: number;
  /**
   * 当前页
   */
  page: number;
  page_data: ApplyGymBase[];
  /**
   * 分页大小
   */
  size: number;
  [property: string]: any;
}

/**
 * 场馆申请入驻基础信息
 */
type ApplyGymBase = {
  /**
   * 申请ID
   */
  apply_id: number;
  /**
   * 申请当前状态
   */
  apply_status: number;
  /**
   * 申请时间
   */
  apply_time: number;
  /**
   * 详细地址
   */
  location: string;
  /**
   * 真实姓名
   */
  name: string;
  openid: string;
  /**
   * 手机号
   */
  phone: string;
  [property: string]: any;
}
// 获取场馆列表
export const getVenueList = (data:object) => {
  return http.request<Response>("get",
    "https://mock.apifox.com/m1/4020694-0-default/admin/apply/gym/list",
    {data}
  );
};
// 获取场馆详情
export const getVenueDetail = (data:object) => {
  return http.request<Response>("get",
    "https://mock.apifox.com/m1/4020694-0-default/admin/apply/gym/get",
    {data}
  );
};

// 同意入驻
export const venueAccept = (data:object) => {
  return http.request<Response>("post",
    "https://mock.apifox.com/m1/4020694-0-default/admin/apply/gym/accept",
    {data}
  );
};
// 拒绝入驻
export const venueReject = (data:object) => {
  return http.request<Response>("post",
    "https://mock.apifox.com/m1/4020694-0-default/admin/apply/gym/reject",
    {data}
  );
};
