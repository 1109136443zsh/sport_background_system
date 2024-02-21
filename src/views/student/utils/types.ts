interface FormItemProps {

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
   * 年龄
   */
  age?: number;
  /**
   * 头像
   */
  avatar?: string;
  /**
   * 运动目的
   */
  exercise_purpose: string[];
  /**
   * 性别
   */
  gender?: number;
  /**
   * 身高
   */
  height?: number;
  /**
   * 伤痛史
   */
  history_injury: string[];
  /**
   * 运动史
   */
  history_sport: string[];
  /**
   * 昵称
   */
  nickname?: string;
  user_id: number;
  /**
   * 体重
   */
  weight?: number;
  [property: string]: any;
}


interface FormProps {
  formInline: FormItemProps;
}

export type{FormItemProps, FormProps};
