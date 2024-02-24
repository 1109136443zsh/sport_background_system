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
    `http://115.28.37.42:7788/admin/customer/list?page=${page}`
  );
};


// 更新用户资料
export const updateStudentList = (data: object) => {
  return http.request<Response>("post",
    `http://115.28.37.42:7788/admin/user/update_info`,
    {data}
  );
};

// 获取用户详情
export const getStudentDetail = (user_id: object) => {
  return http.request<Response>("get",
    `http://115.28.37.42:7788/admin/customer/info?user_id=${user_id}`
  );
};
