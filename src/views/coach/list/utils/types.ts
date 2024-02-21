interface FormItemProps {
  /**
   * 学员案例
   */
  case: string[];
  /**
   * 轮播图
   */
  banner: string[];
  /**
   * 教练介绍
   */
  info: string;
  /**
   * 限定接单用户性别，0女/1男/2不限
   */
  gender_limit: number;
  /**
   * 姓名
   */
  name: string;
  /**
   * 擅长技能
   */
  skill: string[];
  /**
   * 教练id
   */
  coach_id: number;
  /**
   * 封面图
   */
  cover_image: string;
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
}

interface FormProps {
  formInline: FormItemProps
}

export type {FormItemProps, FormProps}
