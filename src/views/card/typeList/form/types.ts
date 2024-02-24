interface FormItemProps {
  /**
   * 每天可使用次数限制 【该项保留便于后续扩展 本次无需实现】
   */
  daily_limit?: number;
  /**
   * 是否需要绑定教练才可以购买 1=True 0=False
   */
  is_bind_coach?: number;
  /**
   * 是否需要绑定课程才可以购买
   */
  is_bind_course?: number;
  /**
   * 是否需要绑定场馆才可以购买
   */
  is_bind_gym?: number;
  /**
   * 卡名称 月卡/周卡/次卡之类的
   */
  name: string;
  /**
   * 会员卡有效时长 单位：秒
   */
  period: number;
  /**
   * 价格 单位：分
   */
  price?: number;
  /**
   * 权益次数 比如月卡就是30次
   */
  remain: number;
  [property: string]: any;
}
interface FormProps {
  formInline: FormItemProps
}
export type {FormProps, FormItemProps}
