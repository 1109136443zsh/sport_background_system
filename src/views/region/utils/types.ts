interface FormItemProps {
  /**
   * 区域名称
   */
  name: string;

  [property: string]: any;
}
interface FormProps{
  formInline: FormItemProps
}
export type {FormItemProps,FormProps}
