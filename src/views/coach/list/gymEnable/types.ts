interface FormItemProps {
  /**
   * 场馆ID
   */
  gym_id: number;
  /**
   * 场馆地址
   */
  gym_location: string;
  /**
   * 场馆名字
   */
  gym_name: string;
  [property: string]: any;
}
interface FormProps {
  formInline: FormItemProps
}
export type {FormProps,}
