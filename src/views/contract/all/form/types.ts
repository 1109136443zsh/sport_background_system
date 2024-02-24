interface FormItemProps {
  /**
   * 合同图片地址
   */
  image?: string;
  /**
   * 签署时间
   */
  sign_time?: string;
  /**
   * 签署人的user_id
   */
  user_id?: string;
  url: string;
  [property: string]: any;
}
interface FormProps {
  formInline: FormItemProps
}
export type {FormProps, FormItemProps}
