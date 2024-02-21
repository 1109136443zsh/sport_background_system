import {http} from "@/utils/http";


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
    "https://mock.apifox.com/m1/4020694-0-default/admin/permission/list"
  );
};
// 授予角色权限
export const grantPermission = (data: object) => {
  return http.request<Response>("post",
    "https://mock.apifox.com/m1/4020694-0-default/admin/permission/grant",
    {data}
  );
};
// 撤销角色权限
export const revokePermission = (data: object) => {
  return http.request<Response>("post",
    "https://mock.apifox.com/m1/4020694-0-default/admin/permission/revoke",
    {data}
  );
};
