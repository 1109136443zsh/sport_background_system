import {http} from "@/utils/http";

export interface Response {
  /**
   * 状态码
   */
  code: number;
  /**
   * 数据
   */
  data: Data;
  /**
   * 说明
   */
  msg: string;
  [property: string]: any;
}

/**
 * 数据
 */
export interface Data {
  /**
   * 总条数
   */
  count: number;
  /**
   * 当前页
   */
  page: number;
  page_data: Coach[];
  /**
   * 分页大小
   */
  size: number;
  [property: string]: any;
}

/**
 * 教练基础信息
 */
export interface Coach {
  /**
   * 教练id
   */
  coach_id: number;
  /**
   * 封面图
   */
  cover_image: string;
  /**
   * 限定接单用户性别，0女/1男/2不限
   */
  gender_limit: number;
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
   * 擅长技能
   */
  skill: string[];
  [property: string]: any;
}
export const getCoachList = (data:object) => {
  return http.request<Response>("get",
    "https://mock.apifox.com/m1/4020694-0-default/admin/coach/list",
    {data}
  );
};
export const updateCoach = (data:object) => {
  return http.request<Response>("post",
    "https://mock.apifox.com/m1/4020694-0-default/admin/coach/list",
    {data}
  );
};


