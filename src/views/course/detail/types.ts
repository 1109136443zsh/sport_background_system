interface FormItemProps {
  /**
   * 可上课教练
   */
  coach_list: [];
  /**
   * 课程id
   */
  course_id: string;
  /**
   * 可上课门店
   */
  gym_list: [];
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
  [property: string]: any;
}
interface FormProps {
  formInline: FormItemProps
}
export type {FormProps, FormItemProps}
