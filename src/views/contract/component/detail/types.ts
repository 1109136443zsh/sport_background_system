interface FormItemProps {
  /**
   * 合同id
   */
  contract_id: number;
  /**
   * 合同名
   */
  name: string;
  /**
   * 签署对象
   */
  sign_role: number;
  /**
   * 合同内容
   */
  text: string;
  [property: string]: any;
}
interface FormProps {
  formInline: FormItemProps
}
export type {FormItemProps, FormProps}
