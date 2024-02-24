interface FormItemProps {
  /**
   * 注册地址
   */
  address?: string;
  /**
   * 金额
   */
  amount: number;
  /**
   * 开户行
   */
  bank?: string;
  /**
   * 卡号
   */
  bank_account?: string;
  /**
   * 注册电话
   */
  phone?: string;
  /**
   * 税号
   */
  tax_id: string;
  /**
   * 抬头
   */
  title: string;
  /**
   * 抬头类型
   */
  title_type: number;
  [property: string]: any;
}
interface FormProps {
  formInline: FormItemProps
}
export type {FormItemProps, FormProps}
