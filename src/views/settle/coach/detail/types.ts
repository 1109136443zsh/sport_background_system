interface FormItemProps {
  /**
   * 申请ID
   */
  apply_id: number;
  /**
   * 申请当前状态
   */
  apply_status: number;
  /**
   * 申请时间
   */
  apply_time: number;
  /**
   * 头像
   */
  avatar: string;
  /**
   * 封面图
   */
  cover_image: string;
  /**
   * 介绍
   */
  info: string;
  /**
   * 真实姓名
   */
  name: string;
  openid: string;
  /**
   * 手机号
   */
  phone: string;
  /**
   * 技能
   */
  skill: string[];
  [property: string]: any;
}
interface FormProps {
  formInline: FormItemProps
}
export type {FormProps, FormItemProps}
