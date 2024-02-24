import {http} from "@/utils/http";

export interface Response {
  /**
   * 状态码
   */
  code: number;
  /**
   * 数据
   */
  data: Datum;
  /**
   * 说明
   */
  msg: string;

  [property: string]: any;
}

export interface Datum {
  /**
   * 总条数
   */
  count: number;
  /**
   * 当前页
   */
  page: number;
  page_data: ApplyPartnerBase[];
  /**
   * 分页大小
   */
  size: number;

  [property: string]: any;
}

/**
 * 区域合伙人申请入驻基础信息
 */
export interface ApplyPartnerBase {
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

// 查询入驻申请列表
export const getPartnerList = (data: { page: number, phone?: string }) => {
  const {page, phone} = data
  return http.request<Response>("get",
    `http://115.28.37.42:7788/admin/apply/partner/list?page=${page}&phone=${phone}`
  );
};
// 查询入驻申请详情
export const getPartnerDetail = (data: { apply_id: number }) => {
  const {apply_id} = data
  return http.request<Response>("get",
    `http://115.28.37.42:7788/admin/apply/partner/get?apply_id=${apply_id}`
  );
};
// 同意入驻
export const partnerAccept = (data) => {
  return http.request<Response>("post",
    `http://115.28.37.42:7788/admin/apply/partner/accept`,
    {data}
  );
};
// 拒绝入驻
export const partnerReject = (data) => {
  return http.request<Response>("post",
    `http://115.28.37.42:7788/admin/apply/partner/reject`,
    {data}
  );
};
