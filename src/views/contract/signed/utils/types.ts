interface FormItemProps {
  /**
   * 合同id
   */
  contract_id: number;
  /**
   * 补录的线下合同会有图片
   */
  image: string;
  /**
   * 合同名
   */
  name: string;
  /**
   * 签署对象
   */
  sign_role: number;
  /**
   * 签署时间
   */
  sign_time: number;
  /**
   * 签署人ID
   */
  user_id: number;
  /**
   * 签署人名称
   */
  user_name: string;
  [property: string]: any;
}
interface FormProps {
  formInline: FormItemProps
}

export type {FormProps,FormItemProps}
