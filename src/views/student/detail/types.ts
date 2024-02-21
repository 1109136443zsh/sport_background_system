interface UserDetailItemProps {
  /**
   * 年龄
   */
  age: number;
  /**
   * 头像
   */
  avatar: string;
  /**
   * BMI
   */
  bmi: number;
  /**
   * 体脂率百分比，%
   */
  fat: number;
  /**
   * 性别，0=女/1=男
   */
  gender: number;
  /**
   * 身高，cm
   */
  height: number;
  /**
   * 基础代谢，Kcal
   */
  metabolism: number;
  /**
   * 肌肉含量，KG
   */
  muscle: number;
  /**
   * 昵称
   */
  nickname: string;
  /**
   * openid
   */
  openid: string;
  /**
   * 手机号
   */
  phone: string;
  unionid: string;
  /**
   * 用户id
   */
  user_id: number;
  /**
   * 体重，kg
   */
  weight: number;
  [property: string]: any;
}
interface UserDetailProps{
  formInline: UserDetailItemProps
}
export type {UserDetailProps,UserDetailItemProps}
