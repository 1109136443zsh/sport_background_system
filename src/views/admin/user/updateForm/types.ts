interface FormItemProps{
  password: string;
  /**
   * 用户id
   */
  user_id: string;
  /**
   * 用户名称
   */
  username: string;
  [property: string]: any;
}
interface FormProps{
  formInline: FormItemProps
}
export type { FormProps, FormItemProps }
