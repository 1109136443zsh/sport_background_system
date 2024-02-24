import {http} from "@/utils/http";
import {getToken} from "@/utils/auth";
import {baseUrlApi} from "@/api/utils";

export interface Response {
  /**
   * 状态码
   */
  code: number;
  /**
   * 数据
   */
  data: Permission[];
  /**
   * 说明
   */
  msg: string;

  [property: string]: any;
}

/**
 * 权限
 */
export interface Permission {
  /**
   * 分组名称，仅用于展示的时候对权限节点进行分组
   */
  group_name: string;
  /**
   * 权限名
   */
  name: string;
  /**
   * 权限id
   */
  permission_id: string;

  [property: string]: any;
}

// 获取权限列表
export const getPowerList = () => {
  return http.request<Response>("get",
    baseUrlApi("/admin/permission/list"),{},
    {
      headers: {
        "token": getToken().accessToken
      }
    }
  );
};
// 授予角色权限
export const grantPermission = (data: object) => {
  return http.request<Response>("post",
    baseUrlApi("/admin/permission/grant"),
    {data},
    {
      headers: {
        "token": getToken().accessToken
      }
    }
  );
};
// 撤销角色权限
export const revokePermission = (data: object) => {
  return http.request<Response>("post",
    baseUrlApi("/admin/permission/revoke"),
    {data},
    {
      headers: {
        "token": getToken().accessToken
      }
    }
  );
};
