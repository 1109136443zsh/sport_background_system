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
  page_data: WalletLog[];
  /**
   * 分页大小
   */
  size: number;
  /**
   * 可提现余额，单位：分
   */
  balance: number;
  [property: string]: any;
}
/**
 * 提现订单
 */
export interface Payment {
  /**
   * 提现时间
   */
  create_time: number;
  /**
   * 提现方式，目前仅支持微信
   */
  method: number;
  /**
   * 提现钱款，单位：分
   */
  money: number;
  /**
   * 提现状态
   */
  status_pay: number;
  /**
   * 用户id
   */
  user_id: number;
  /**
   * 角色id
   */
  user_role: number;
  [property: string]: any;
}

/**
 * 收支明细
 */
export interface WalletLog {
  /**
   * 时间
   */
  change_time: number;
  /**
   * 原因
   */
  event: string;
  /**
   * 收支金额
   */
  variation: number;
  [property: string]: any;
}
// 查询所有提现订单
export const getOrderList = (data: { page:number, user_id?:number, user_role?: string }) => {
  const { page, user_id, user_role} = data
  return http.request<Response>("get",
    `http://115.28.37.42:7788/admin/wallet/list?page=${page}&user_id=${user_id}&user_role=${user_role}`
  );
};
// 查询自己提现订单
export const getSelfOrderList = (page:number) => {
  return http.request<Response>("get",
    `http://115.28.37.42:7788/admin/wallet/selfOrder?page=${page}`
  );
};
// 查看自己收支明细
export const getSelfPaymentList = (page:number) => {
  return http.request<Response>("get",
    `http://115.28.37.42:7788/admin/wallet/selfList?page=${page}`
  );
};
// 查看所有收支明细
export const getPaymentList = (data: { page:number, user_id?:number}) => {
  const { page, user_id} = data
  return http.request<Response>("get",
    `http://115.28.37.42:7788/admin/wallet/list?page=${page}&user_id=${user_id}`
  );
};
// 查询自己余额
export const getSelfBalance = () => {
  return http.request<Response>("post",
    "http://115.28.37.42:7788/admin/wallet/self"
  );
};
// 提现
export const withdraw = (data:object) => {
  return http.request<Response>("post",
    "http://115.28.37.42:7788/admin/wallet/withdraw",
    {data}
  );
};
