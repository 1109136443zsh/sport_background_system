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
  page_data: ContractBase[];
  /**
   * 分页大小
   */
  size: number;
  [property: string]: any;
}

/**
 * 合同
 */
export interface ContractBase {
  /**
   * 合同id
   */
  contract_id: number;
  /**
   * 合同名
   */
  name: string;
  /**
   * 签署对象
   */
  sign_role: number;
  [property: string]: any;
}
// 获取所有合同
export const getContractList = (data:object) => {
  return http.request<Response>("get",
    "https://mock.apifox.com/m1/4020694-0-default/admin/contract/list",
    {data}
  );
};
// 获取未签署的合同
export const getWaitContractList = (data:object) => {
  return http.request<Response>("get",
    "https://mock.apifox.com/m1/4020694-0-default/admin/contract/wait",
    {data}
  );
};
// 获取已签署的合同
export const getSignedContractList = (data:object) => {
  return http.request<Response>("get",
    "https://mock.apifox.com/m1/4020694-0-default/admin/contract/signed",
    {data}
  );
};
// 线下合同补录
export const contractApply = (data:object) => {
  return http.request<Response>("get",
    "https://mock.apifox.com/m1/4020694-0-default/admin/contract/signed",
    {data}
  );
};
// 签署合同/同意条款
export const contractSign = (data:object) => {
  return http.request<Response>("get",
    "https://mock.apifox.com/m1/4026186-0-default/admin/contract/sign",
    {data}
  );
};

