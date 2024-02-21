interface FormItemProps {
  /**
   * 场馆额外分成费用
   */
  bonus: number;
  /**
   * 学员额外付费
   */
  charge: number;
  /**
   * 星级名称
   */
  name: string;
  /**
   * 星级ID
   */
  rate_id: number;
  [property: string]: any;
}
interface FormProps {
  formInline: FormItemProps
}
export type {FormItemProps, FormProps}
