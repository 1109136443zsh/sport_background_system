interface FormItemProps {
  /**
   * 轮播图
   */
  banner: string[];
  /**
   * 营业时间 时间节点ID
   */
  begin_time?: number;
  /**
   * 营业时间 时间节点ID
   */
  end_time?: number;
  /**
   * 场馆ID
   */
  gym_id: string;
  /**
   * 介绍
   */
  info?: string;
  /**
   * 纬度
   */
  latitude?: number;
  /**
   * 地址
   */
  location?: string;
  /**
   * 经度
   */
  longitude?: number;
  /**
   * 场馆名称
   */
  name?: string;
  /**
   * 星级id
   */
  rate_id?: number;
}
interface FormProps {
  formInline: FormItemProps
}
export type {FormProps, FormItemProps}
