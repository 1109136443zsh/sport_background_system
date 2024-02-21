interface FormItemProps {
  /**
   * 核销码，用于生成二维码
   */
  checkin_code: string;
  /**
   * 快速核销编号，用于无法扫码场景手动输入
   */
  checkin_fast: string;
  [property: string]: any;
}
interface FormProps {
  formInline: FormItemProps
}
export type {FormProps, FormItemProps}
