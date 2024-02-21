interface FormItemProps {
  /**
   * 投诉内容
   */
  claim: string;
  /**
   * 订单ID
   */
  order_id: number;
  [property: string]: any;
}
interface FormProps {
  formInline: FormItemProps
}
export type {FormProps, FormItemProps}
