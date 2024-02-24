interface FormItemProps {
  /**
   * 教练id
   */
  coach_id: number;
  /**
   * 教练封面图
   */
  coach_image: string;
  /**
   * 教练名称
   */
  coach_name: string;
  /**
   * 教练电话
   */
  coach_phone: string;
  /**
   * 教练等级名称
   */
  coach_rate: string;
  /**
   * 学员对教练的评分，暂不返回该项
   */
  coach_score: number;
  /**
   * 学员评价
   */
  comment: string;
  /**
   * 学员评价中的图片
   */
  comment_image: string;
  /**
   * 学员评价中的视频
   */
  comment_video: string;
  /**
   * 投诉信息
   */
  complain: Array<Complain>;
  /**
   * 课程id
   */
  course_id: number;
  /**
   * 课程名称
   */
  course_name: string;
  /**
   * 学员对课程的评分，暂不返回该项
   */
  course_score: number;
  /**
   * 场馆id
   */
  gym_id: number;
  /**
   * 场馆纬度
   */
  gym_latitude: number;
  /**
   * 场馆定位名
   */
  gym_location: string;
  /**
   * 场馆经度
   */
  gym_longitude: number;
  /**
   * 场馆名称
   */
  gym_name: string;
  /**
   * 场馆费
   */
  gym_price: number;
  /**
   * 场馆等级名称
   */
  gym_rate: string;
  /**
   * 是否已评价
   */
  is_comment: boolean;
  /**
   * 订单id
   */
  order_id: number;
  /**
   * 最终支付价格
   */
  price: number;
  /**
   * 预定日期时间戳
   */
  schedule_date: number;
  /**
   * 预定时间节点ID
   */
  segment_id: number;
  /**
   * 订单状态，如已结束、待上课等
   */
  status_order: number;
  /**
   * 订单支付状态，如已支付等
   */
  status_pay: number;
  [property: string]: any;
}

export interface Complain {
  /**
   * 投诉内容
   */
  claim: string;
  /**
   * 发起投诉的主体，学员/教练/场馆
   */
  complain_type: number;
  /**
   * 处理状态
   */
  status_complain: number;
  [property: string]: any;
}
interface FormProps {
  formInline: FormItemProps
}
export type {FormProps, FormItemProps}
