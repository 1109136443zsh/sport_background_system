interface FormItemProps {
  /**
   * 轮播图
   */
  banner: string[];
  /**
   * 营业时间，时间节点ID
   */
  begin_time: number;
  /**
   * 封面图
   */
  cover_image: string;
  /**
   * 营业时间，时间节点ID
   */
  end_time: number;
  /**
   * 场馆id
   */
  gym_id: number;
  /**
   * 场馆介绍
   */
  info: string;
  /**
   * 纬度
   */
  latitude: number;
  /**
   * 地址名
   */
  location: string;
  /**
   * 经度
   */
  longitude: number;
  /**
   * 场馆名
   */
  name: string;
  /**
   * 场馆等级，名称
   */
  rate: string;
  /**
   * 场馆等级id
   */
  rate_id: number;
  /**
   * 场馆所属区域ID
   */
  region_id: number;
  /**
   * 评分，【暂不实现 仅做设计】直接返回5.0
   */
  score: number;
  /**
   * 标签
   */
  tags?: string[];
  [property: string]: any;
}
interface FormProps {
  formInline: FormItemProps
}
export type {FormProps, FormItemProps}
