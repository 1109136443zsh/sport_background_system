interface FormItemProps {
  /**
   * 0/1 是否仅查看已评价单
   */
  comment?: number;
  /**
   * 0/1 是否仅查看投诉单
   */
  complain?: number;
  /**
   * 根据gym_id筛选
   */
  gym_id?: number;
  /**
   * 根据订单状态筛选
   */
  order_status?: number;
  /**
   * 分页
   */
  page: number;
  /**
   * 根据user_id筛选
   */
  user_id?: number;
  [property: string]: any;
}
interface FormProps {
  formInline: FormItemProps
}
export type { FormItemProps, FormProps}