interface FormItemProps {
  /**
   * 会员卡类型ID
   */
  card_type_id: number;
  /**
   * 绑定的教练ID
   */
  coach_id?: number;
  /**
   * 绑定的课程ID
   */
  course_id?: number;
  /**
   * 绑定的场馆ID
   */
  gym_id?: number;
  /**
   * 用户ID
   */
  user_id: number;
  [property: string]: any;
}

interface FormProps {
  formInline: FormItemProps
}

export type {FormItemProps, FormProps}
