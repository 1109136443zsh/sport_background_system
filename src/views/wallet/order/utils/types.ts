interface FormItemsProps{
  /**
   * 时间
   */
  change_time: number;
  /**
   * 原因
   */
  event: string;
  /**
   * 收支金额
   */
  variation: number;
  [property: string]: any;
}
interface FormProps {
  formInline: FormItemsProps
}
export type {FormProps,FormItemsProps}
