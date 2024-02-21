interface FormItemProps {
  /**
   * 年龄
   */
  age: number;
  /**
   * 头像
   */
  avatar: string;
  bmi: number;
  /**
   * 体脂率百分比 %
   */
  fat: number;
  /**
   * 性别 0=女/1=男
   */
  gender: number;
  /**
   * 身高 cm
   */
  height: number;
  /**
   * 基础代谢 Kcal
   */
  metabolism: number;
  /**
   * 肌肉含量 kg
   */
  muscle: number;
  /**
   * 昵称
   */
  nickname: string;
  /**
   * 手机号
   */
  phone: string;
  /**
   * 用户ID
   */
  user_id: number;
  /**
   * 体重 kg
   */
  weight: number;
  [property: string]: any;
}
interface FormProps {
  formInline: FormItemProps
}
export type {FormProps, FormItemProps}
