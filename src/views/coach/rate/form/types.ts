interface FormItemProps{
  /**
   * 教练额外分成费用
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
  /*
   * 判断是添加还是更新
   *  */
  title: string
  [property: string]: any;
}
interface FormProps{
  formInline: FormItemProps
}
export type { FormProps, FormItemProps}
