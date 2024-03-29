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
  data: Role[];
  /**
   * 说明
   */
  msg: string;
  [property: string]: any;
}

/**
 * 角色
 */
export interface Role {
  /**
   * 角色id
   */
  role_id: number;
  /**
   * 角色名
   */
  role_name: string;
  [property: string]: any;
}
// 获取角色列表
export const getRoleList = () => {
  return http.request<Response>("get",
    baseUrlApi("/admin/role/list"),{},
    {
      headers: {
        "token": getToken().accessToken
      }
    }
  );
};
// 授予用户角色
export const grantRole = (data:object) => {
  return http.request<Response>("post",
    baseUrlApi("/admin/role/grant"),
    {data},
    {
      headers: {
        "token": getToken().accessToken
      }
    }
  );
};
// 新增角色
export const addRole = (data: object) => {
  return http.request<Response>("post",
    baseUrlApi("/admin/role/add"),
    {data},
    {
      headers: {
        "token": getToken().accessToken
      }
    }
  );
};
// 删除角色
export const deleteRole = (data:object) => {
  return http.request<Response>("post",
    baseUrlApi("/admin/role/remove"),
    {data},
    {
      headers: {
        "token": getToken().accessToken
      }
    }
  );
};
