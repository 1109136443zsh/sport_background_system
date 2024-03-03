interface FormItemProps {
  /**
   * 课程id
   */
  course_id: string;
  /**
   * 会员卡课程关联id
   */
  id: number;
  /**
   * 课程名
   */
  name: string;
  /**
   * 价格，数字价格 单位分
   */
  price: number;
  /**
   * 价格介绍，价格介绍的文本内容
   */
  price_info: string;
  /**
   * 小标题，课程名下面的小标题
   */
  subtitle: string;
  /**
   * 课程类型
   */
  type: number;
  card_type_id: number
  [property: string]: any;
}
interface FormProps {
  formInline: FormItemProps
}
export type {FormProps, FormItemProps}
