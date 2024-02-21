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
   * 总计
   */
  count: string;
  /**
   * 每天列表
   */
  detail: detail[];
  [property: string]: any;
}

export interface detail {
  /**
   * 数量
   */
  count: number;
  /**
   * 日期
   */
  date: string;
  [property: string]: any;
}
export const getNewCustomsList = () => {
  return http.request<Response>("get",
    "https://mock.apifox.com/m1/4020694-0-default/admin/report/newCustomer"
  );
};
export const getOrderNum = () => {
  return http.request<Response>("get",
    "https://mock.apifox.com/m1/4020694-0-default/admin/report/orderNum"
  );
};
export const getIncomeNum = () => {
  return http.request<Response>("get",
    "https://mock.apifox.com/m1/4020694-0-default/admin/report/income"
  );
};

