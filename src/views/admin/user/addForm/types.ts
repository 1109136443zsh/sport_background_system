interface FormItemProps {
  /**
   * 登录账号
   */
  account?: string;
  openid?: string;
  /**
   * 登录密码
   */
  password?: string;
  /**
   * 名称
   */
  username: string;
  [property: string]: any;
}
interface FormProps {
  formInline: FormItemProps
}
export type {FormProps, FormItemProps}
