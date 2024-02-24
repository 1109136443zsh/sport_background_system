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
export const getContractList = (page:number) => {
  return http.request<Response>("get",
    `http://115.28.37.42:7788/admin/contract/list?page=${page}`
  );
};
// 获取未签署的合同
export const getWaitContractList = (page:number) => {
  return http.request<Response>("get",
    `http://115.28.37.42:7788/admin/contract/wait?page=${page}`
  );
};
// 获取已签署的合同
export const getSignedContractList = (page:number) => {
  return http.request<Response>("get",
    `http://115.28.37.42:7788/admin/contract/signed?page=${page}`
  );
};
// 线下合同补录
export const contractApply = (data:object) => {
  return http.request<Response>("post",
    "http://115.28.37.42:7788/admin/contract/supply",
    {data}
  );
};
// 签署合同/同意条款
export const contractSign = (data:object) => {
  return http.request<Response>("post",
    "http://115.28.37.42:7788/admin/contract/sign",
    {data}
  );
};
// 删除合同
export const contractRemove = (data:object) => {
  return http.request<Response>("post",
    "http://115.28.37.42:7788/admin/contract/remove",
    {data}
  );
};
// 获取合同详情
export const contractDetail = (data: {contract_id: number}) => {
  const {contract_id} = data
  return http.request<Response>("get",
    `http://115.28.37.42:7788/admin/contract/get?contract_id=${contract_id}`,
    {data}
  );
};
// 添加合同
export const addContract = (data:object) => {
  return http.request<Response>("post",
    "http://115.28.37.42:7788/admin/contract/add",
    {data}
  );
};
