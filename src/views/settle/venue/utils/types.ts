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
   * 详细地址
   */
  location: string;
  /**
   * 真实姓名
   */
  name: string;
  openid: string;
  /**
   * 手机号
   */
  phone: string;

  [property: string]: any;
}

interface FormProps {
  formInline: FormItemProps
}

export type {FormItemProps, FormProps}
