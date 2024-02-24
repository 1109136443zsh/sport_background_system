interface FormItemProps {
  /**
   * 合同名称
   */
  name?: string;
  /**
   * 需要签署的角色
   */
  sign_role?: string;
  /**
   * 合同内容
   */
  text?: string;
  [property: string]: any;
}
interface FormProps {
  formInline: FormItemProps
}
export type {FormItemProps, FormProps}
