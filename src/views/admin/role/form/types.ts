interface FormItemProps {
  /**
   * 角色id
   */
  role_id: number;
  /**
   * 角色名
   */
  role_name: string;
  /*
   * 用户id
   * */
  user_id: string
  /*
   * 内部id
   * */
  inline_id: string
  [property: string]: any;
}
interface FormProps{
  formInline: FormItemProps
}
export type {FormItemProps, FormProps}
