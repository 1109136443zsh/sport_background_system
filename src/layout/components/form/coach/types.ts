interface FormItemProps{
  /**
   * 轮播图
   */
  banner: string;
  /**
   * 学员案例
   */
  coachCase: string;
  /**
   * 教练ID
   */
  coach_id: string;
  /**
   * 限定接单用户性别 0女/1男/2不限
   */
  gender_limit?: number;
  /**
   * 介绍
   */
  info?: string;
  /**
   * 教练名称
   */
  name?: string;
  /**
   * 星级id
   */
  rate?: string;
  /**
   * 技能
   */
  skill: string;
  url: string;
  [property: string]: any;
}
interface FormProps{
  formInline: FormItemProps
}
export type { FormItemProps, FormProps}
