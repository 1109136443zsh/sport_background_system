import {http} from "@/utils/http";
import {baseUrlApi} from "@/api/utils";
import {getToken} from "@/utils/auth";

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
export const getNewCustomsList = (data: {day}) => {
  const {day} = data
  return http.request<Response>("get",
    baseUrlApi(`/admin/report/newCustomer?day=${day}`),
    {},
    {
      headers: {
        "token": getToken().accessToken
      }
    }
  );
};
export const getOrderNum = (data: {day}) => {
  const {day} = data
  return http.request<Response>("get",
    baseUrlApi(`/admin/report/orderNum?day=${day}`),
    {},
    {
      headers: {
        "token": getToken().accessToken
      }
    }
  );
};
export const getIncomeNum = (data: {day}) => {
  const {day} = data
  return http.request<Response>("get",
    baseUrlApi(`/admin/report/income?day=${day}`),
    {},
    {
      headers: {
        "token": getToken().accessToken
      }
    }
  );
};

