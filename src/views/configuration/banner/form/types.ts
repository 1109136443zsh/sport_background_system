interface FormItemProps {
  /**
   * 是否启用
   */
  enable: number;
  /**
   * 图片地址
   */
  image: string;
  /**
   * banner id
   */
  index_banner_id: number;
  /**
   * 排序
   */
  sort: number;
  /**
   * 跳转链接
   */
  url: string;
  imageUrl: string;
  [property: string]: any;
}
interface FormProps {
  formInline: FormItemProps
}
export type {FormProps, FormItemProps}
