export interface ApifoxModel {
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
  /**
   *  状态
   */
  status: number,
  sign_role: number;

  [property: string]: any;
}
