import {http} from "@/utils/http";
import {getToken} from "@/utils/auth";
import {baseUrlApi} from "@/api/utils";

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

// 获取教练列表
export const getCoachList = (data: {
  page: number,
  rate_id?: string,
  name?: string,
  region_id?: string
}) => {
  const {page, rate_id, name, region_id} = data
  return http.request<Response>("get",
    baseUrlApi(`/admin/coach/list?page=${page}&rate_id=${rate_id}&rehion_id=${region_id}&name=${name}`),
    {data},{
      headers: {
        "token": getToken().accessToken
      }
    }
  );
};
// 更新教练资料
export const updateCoach = (data: object) => {
  return http.request<Response>("post",
    baseUrlApi("/admin/coach/update"),
    {data},
    {
      headers: {
        "token": getToken().accessToken
      }
    }
  );
};
// 获取教练详情
export const getCoachDetail = (data: { coach_id }) => {
  const {coach_id} = data
  return http.request<Response>("get",
    baseUrlApi(`admin/coach/get?coach_id=${coach_id}`),{},
    {
      headers: {
        "token": getToken().accessToken
      }
    }
  );
};
// 教练可去场馆-列表
export const getGymEnableList = (data: { coach_id: number, page: number }) => {
  const {coach_id, page} = data
  return http.request<Response>("get",
    baseUrlApi(`/admin/coach/gymEnable/list?coach_id=${coach_id}&page=${page}`),
    {data},
    {
      headers: {
        "token": getToken().accessToken
      }
    }
  );
};
// 教练可去场馆-添加
export const gymEnableAdd = (data: object) => {
  return http.request<Response>("post",
    baseUrlApi("/admin/coach/gymEnable/add"),
    {data},
    {
      headers: {
        "token": getToken().accessToken
      }
    }
  );
};
// 教练可去场馆-删除
export const gymEnableRemove = (data: object) => {
  return http.request<Response>("post",
    baseUrlApi("/admin/coach/gymEnable/remove"),
    {data},
    {
      headers: {
        "token": getToken().accessToken
      }
    }
  );
};
