interface FormItemProps {
  /**
   * 年龄
   */
  age?: number;
  /**
   * 头像
   */
  avatar?: string;
  /**
   * 性别
   */
  gender?: number;
  /**
   * 身高
   */
  height?: number;
  /**
   * 昵称
   */
  nickname?: string;
  /**
   * 基础代谢
   */
  metabolism?: number;
  /**
   * 肌肉含量
   */
  muscle?: number;
  /**
   * bmi
   */
  bmi?: number;
  /**
   * 体脂率百分比
   */
  fat?: number;
  user_id: number;
  /**
   * 体重
   */
  weight?: number;
  url: string;
  [property: string]: any;
}


interface FormProps {
  formInline: FormItemProps;
}

export type{FormItemProps, FormProps};
