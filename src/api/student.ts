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
   * 总条数
   */
  count: number;
  /**
   * 当前页
   */
  page: number;
  page_data: User[];
  /**
   * 分页大小
   */
  size: number;

  [property: string]: any;
}

/**
 * 用户基础信息
 */
export interface User {
  /**
   * 头像
   */
  avatar: string;
  /**
   * 昵称
   */
  nickname: string;
  /**
   * openid
   */
  openid: string;
  /**
   * 手机号
   */
  phone: string;
  unionid: string;
  /**
   * 用户id
   */
  user_id: number;

  [property: string]: any;
}

// 获取用户列表
export const getStudentList = (page: number) => {
  return http.request<Response>("get",
    baseUrlApi(`/admin/customer/list?page=${page}`),
    {},
    {
      headers: {
        "token": getToken().accessToken
      }
    }
  );
};


// 更新用户资料
export const updateStudentList = (data: object) => {
  return http.request<Response>("post",
    baseUrlApi("/admin/user/update_info"),
    {data},
    {
      headers: {
        "token": getToken().accessToken
      }
    }
  );
};

// 获取用户详情
export const getStudentDetail = (user_id: number) => {
  return http.request<Response>("get",
    baseUrlApi(`/admin/customer/info?user_id=${user_id}`),
    {},
    {
      headers: {
        "token": getToken().accessToken
      }
    }
  );
};
