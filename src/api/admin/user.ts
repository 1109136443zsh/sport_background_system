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
  page_data: AdminUser[];
  /**
   * 分页大小
   */
  size: number;

  [property: string]: any;
}

/**
 * 后台用户
 */
export interface AdminUser {
  /**
   * 是否启用
   */
  enable: boolean;
  /**
   * 角色内部ID，如果用户是教练则该项为教练ID，场馆为场馆ID
   */
  inline_id: number;
  /**
   * 上次登录时间
   */
  last_login: number;
  /**
   * 角色ID
   */
  role_id: number;
  /**
   * 用户id
   */
  user_id: string;
  /**
   * 用户名称
   */
  username: string;

  [property: string]: any;
}

// 获取用户列表
export const getUserList = (page: number) => {
  return http.request<Response>("get",
    `http://115.28.37.42:7788/admin/user/list?page=${page}`
  );
};
// 修改用户可用状态
export const updateUserAble = (data: object) => {
  return http.request<Response>("post",
    "http://115.28.37.42:7788/admin/user/able",
    {data}
  );
};
// 删除用户
export const deleteUser = (data: object) => {
  return http.request<Response>("post",
    "http://115.28.37.42:7788/admin/user/list",
    {data}
  );
};
// 更新用户信息
export const updateUser = (data: object) => {
  return http.request<Response>("post",
    "http://115.28.37.42:7788/admin/user/update",
    {data}
  );
};
// 新增用户
export const addUser = (data: object) => {
  return http.request<Response>("post",
    "http://115.28.37.42:7788/admin/user/add",
    {data}
  );
};
