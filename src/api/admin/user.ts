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
    baseUrlApi(`/admin/user/list?page=${page}`),{},
    {
      headers: {
        "token": getToken().accessToken
      }
    }
  );
};
// 修改用户可用状态
export const updateUserAble = (data: object) => {
  return http.request<Response>("post",
    baseUrlApi("/admin/user/able"),
    {data},
    {
      headers: {
        "token": getToken().accessToken
      }
    }
  );
};
// 删除用户
export const deleteUser = (data: object) => {
  return http.request<Response>("post",
    baseUrlApi("/admin/user/remove"),
    {data},
    {
      headers: {
        "token": getToken().accessToken
      }
    }
  );
};
// 更新用户信息
export const updateUser = (data: object) => {
  return http.request<Response>("post",
    baseUrlApi("/admin/user/update"),
    {data},
    {
      headers: {
        "token": getToken().accessToken
      }
    }
  );
};
// 新增用户
export const addUser = (data: object) => {
  return http.request<Response>("post",
    baseUrlApi("/admin/user/add"),
    {data},
    {
      headers: {
        "token": getToken().accessToken
      }
    }
  );
};
// 获取用户自身的个人信息
export const getUserSelf = () => {
  return http.request<Response>("get",
    baseUrlApi("/admin/user/self"),
    {},
    {
      headers: {
        "token": getToken().accessToken
      }
    }
  );
};
