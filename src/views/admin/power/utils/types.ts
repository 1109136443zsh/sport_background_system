interface FormItemProps{
  /**
   * 权限id
   */
  permission_id: string;
  user_id: string;
}
interface FormProps{
  formInline: FormItemProps
}
export type {FormProps,FormItemProps}
