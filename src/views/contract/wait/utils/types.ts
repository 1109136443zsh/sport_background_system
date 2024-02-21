export interface Response {
  /**
   * 状态码
   */
  code: number;
  /**
   * 数据
   */
  data: ContractBase[];
  /**
   * 说明
   */
  msg: string;
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
