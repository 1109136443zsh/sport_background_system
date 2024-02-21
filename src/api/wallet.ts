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
export const getOrderList = (data:object) => {
  return http.request<Response>("get",
    "https://mock.apifox.com/m1/4020694-0-default/admin/wallet/list?apifoxApiId=147842665",
    {data}
  );
};
// 查询自己提现订单
export const getSelfOrderList = (data:object) => {
  return http.request<Response>("get",
    "https://mock.apifox.com/m1/4020694-0-default/admin/wallet/selfOrder",
    {data}
  );
};
// 查看自己收支明细
export const getSelfPaymentList = (data:object) => {
  return http.request<Response>("get",
    "https://mock.apifox.com/m1/4020694-0-default/admin/wallet/selfList",
    {data}
  );
};
// 查看所有收支明细
export const getPaymentList = (data:object) => {
  return http.request<Response>("get",
    "https://mock.apifox.com/m1/4020694-0-default/admin/wallet/list?apifoxApiId=147842667",
    {data}
  );
};
// 查询自己余额
export const getSelfBalance = () => {
  return http.request<Response>("post",
    "https://mock.apifox.com/m1/4020694-0-default/admin/wallet/self"
  );
};
// 提现
export const withdraw = (data:object) => {
  return http.request<Response>("post",
    "https://mock.apifox.com/m1/4020694-0-default/admin/wallet/withdraw",
    {data}
  );
};
