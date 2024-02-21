interface DetailItemProps{
  /**
   * 轮播图
   */
  banner: string[];
  /**
   * 学员案例
   */
  case: string[];
  /**
   * 教练id
   */
  coach_id: number;
  /**
   * 教练可上课程
   */
  course: CourseBase[];
  /**
   * 封面图
   */
  cover_image: string;
  /**
   * 限定接单用户性别，0女/1男/2不限
   */
  gender_limit: number;
  /**
   * 教练介绍
   */
  info: string;
  /**
   * 姓名
   */
  name: string;
  /**
   * 课时费
   */
  price: number;
  /**
   * 星级，名称
   */
  rate: string;
  /**
   * 教练所属区域ID
   */
  region_id: number;
  /**
   * 评分
   */
  score: number;
  /**
   * 预约时间段
   */
  segment: Segment[];
  /**
   * 擅长技能
   */
  skill: string[];
  "01HN9PTMVNETH24VW5KBD91GYY": any;
  [property: string]: any;
}


/**
 * 课程基础信息
 */
export interface CourseBase {
  /**
   * 课程id
   */
  course_id: string;
  /**
   * 课程名
   */
  name: string;
  /**
   * 价格，数字价格 单位分
   */
  price: number;
  /**
   * 价格介绍，价格介绍的文本内容
   */
  price_info: string;
  /**
   * 小标题，课程名下面的小标题
   */
  subtitle: string;
  /**
   * 课程类型
   */
  type: number;
  [property: string]: any;
}

export interface Segment {
  /**
   * 时间点状态，可预约=0/不可预约/已被预约
   */
  status: number;
  /**
   * 时间节点ID，根据映射关系 比如0:00是1 0:30是2以此类推
   */
  time_id: number;
  [property: string]: any;
}
interface DetailProps{
  formInline: DetailItemProps
}
export type {DetailProps,DetailItemProps}
