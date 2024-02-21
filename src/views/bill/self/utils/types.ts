
/**
 * 发票
 */
interface FormItemProps {
  /**
   * 注册地址
   */
  address: string;
  /**
   * 金额，单位：分
   */
  amount: number;
  /**
   * 开户行
   */
  bank: string;
  /**
   * 卡号
   */
  bank_account: string;
  /**
   * 发票ID
   */
  bill_id: number;
  /**
   * 发票链接，已开具就会有
   */
  bill_url?: string;
  /**
   * 注册电话
   */
  phone: string;
  /**
   * 申请开票状态
   */
  status: number;
  /**
   * 税号
   */
  tax_id: string;
  /**
   * 抬头
   */
  title: string;
  /**
   * 抬头类型，0=个人/1=单位
   */
  title_type: number;
  /**
   * 申请人ID
   */
  user_id: number;
  [property: string]: any;
}
interface FormProps{
  formInline: FormItemProps
}
export type {FormItemProps, FormProps}
