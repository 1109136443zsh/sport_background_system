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
  page_data: Bill[];
  /**
   * 分页大小
   */
  size: number;

  [property: string]: any;
}

/**
 * 发票
 */
export interface Bill {
  /**
   * 注册地址
   */
  address: string;
  /**
   * 金额，单位：分
   */
  amount: number;
  /**
   * 开户行
   */
  bank: string;
  /**
   * 卡号
   */
  bank_account: string;
  /**
   * 发票ID
   */
  bill_id: number;
  /**
   * 发票链接，已开具就会有
   */
  bill_url?: string;
  /**
   * 注册电话
   */
  phone: string;
  /**
   * 申请开票状态
   */
  status: number;
  /**
   * 税号
   */
  tax_id: string;
  /**
   * 抬头
   */
  title: string;
  /**
   * 抬头类型，0=个人/1=单位
   */
  title_type: number;
  /**
   * 申请人ID
   */
  user_id: number;

  [property: string]: any;
}

// 获取所有发票列表
export const getBillList = (data: { page: number, user_id: number }) => {
  const {page, user_id} = data
  return http.request<Response>("get",
    `http://115.28.37.42:7788/admin/bill/list?page=${page}&user_id=${user_id}`
  );
};
// 获取自己的发票的列表
export const getBillSelfList = (data: { page: number }) => {
  const {page} = data
  return http.request<Response>("get",
    `http://115.28.37.42:7788/admin/bill/self?page=${page}`
  );
};
// 上传发票
export const uploadBill = (data) => {
  return http.request<Response>("post",
    `http://115.28.37.42:7788/admin/bill/upload`,
    {data}
  );
};
// 申请开票
export const addBill = (data: object) => {
  return http.request<Response>("post",
    "http://115.28.37.42:7788/admin/bill/add",
    {data}
  );
};
