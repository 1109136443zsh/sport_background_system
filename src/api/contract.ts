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
    baseUrlApi(`/admin/contract/list?page=${page}`),
    {},
    {
      headers: {
        "token": getToken().accessToken
      }
    }
  );
};
// 获取未签署的合同
export const getWaitContractList = (page:number) => {
  return http.request<Response>("get",
    baseUrlApi(`/admin/contract/wait?page=${page}`),
    {},
    {
      headers: {
        "token": getToken().accessToken
      }
    }
  );
};
// 获取已签署的合同
export const getSignedContractList = (page:number) => {
  return http.request<Response>("get",
    baseUrlApi(`/admin/contract/signed?page=${page}`),
    {},
    {
      headers: {
        "token": getToken().accessToken
      }
    }
  );
};
// 线下合同补录
export const contractApply = (data:object) => {
  return http.request<Response>("post",
    baseUrlApi("/admin/contract/supply"),
    {data},
    {
      headers: {
        "token": getToken().accessToken
      }
    }
  );
};
// 签署合同/同意条款
export const contractSign = (data:object) => {
  return http.request<Response>("post",
    baseUrlApi("/admin/contract/sign"),
    {data},
    {
      headers: {
        "token": getToken().accessToken
      }
    }  );
};
// 删除合同
export const contractRemove = (data:object) => {
  return http.request<Response>("post",
    baseUrlApi("/admin/contract/remove"),
    {data},
    {
      headers: {
        "token": getToken().accessToken
      }
    }
  );
};
// 获取合同详情
export const contractDetail = (data: {contract_id: number}) => {
  const {contract_id} = data
  return http.request<Response>("get",
    baseUrlApi(`/admin/contract/get?contract_id=${contract_id}`),
    {data},
    {
      headers: {
        "token": getToken().accessToken
      }
    }
  );
};
// 添加合同
export const addContract = (data:object) => {
  return http.request<Response>("post",
    baseUrlApi("/admin/contract/add"),
    {data},
    {
      headers: {
        "token": getToken().accessToken
      }
    }
  );
};
