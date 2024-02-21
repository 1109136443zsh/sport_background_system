interface FormItemProps {
  /**
   * 课程类型 私教课/特色课/训练营/团操
   */
  course_type: number;
  /**
   * 课程名
   */
  name: string;
  /**
   * 价格
   */
  price: string;
  /**
   * 价格介绍的文本内容
   */
  price_info: string;
  /**
   * 数字价格 单位分
   */
  subtitle: number;
  title: string,
  course_id: number,
  [property: string]: any;
}
interface FormProps {
  formInline: FormItemProps
}
export type {FormProps, FormItemProps}
