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
  page_data: Gym[];
  /**
   * 分页大小
   */
  size: number;

  [property: string]: any;
}

/**
 * 场馆基础信息
 */
export interface Gym {
  /**
   * 封面图
   */
  cover_image: string;
  /**
   * 场馆id
   */
  gym_id: number;
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

// 获取场馆列表
export const getGymList = (data: {
  page: number,
  rate_id: number,
  name: string,
  region_id: number
}) => {
  const {
    page,
    rate_id,
    region_id,
    name
  } = data
  return http.request<Response>("get",
    baseUrlApi(`/admin/gym/list?page=${page}&rate_id=${rate_id}&region_id=${region_id}&name=${name}`),
    {},
    {
      headers: {
        "token": getToken().accessToken
      }
    }
  );
};
//获取场馆详情
export const getGymDetail = (data: { gym_id: number }) => {
  const {gym_id} = data
  return http.request<Response>("get",
    baseUrlApi(`/admin/gym/get?gym_id=${gym_id}`),
    {},
    {
      headers: {
        "token": getToken().accessToken
      }
    }
  );
};
// 更新场馆资料
export const updateGym = (data: object) => {
  return http.request<Response>("post",
    baseUrlApi("/admin/gym/update"),
    {data},
    {
      headers: {
        "token": getToken().accessToken
      }
    }
  );
};
// 场馆星级-获取列表
export const getRateList = () => {
  return http.request<Response>("get",
    baseUrlApi("/admin/gym/rateList"),
    {},
    {
      headers: {
        "token": getToken().accessToken
      }
    }
  );
};
// 场馆星级-增加
export const rateAdd = (data: object) => {
  return http.request<Response>("post",
    baseUrlApi("/admin/gym/rateAdd"),
    {data},
    {
      headers: {
        "token": getToken().accessToken
      }
    }
  );
};
// 场馆星级-删除
export const rateRemove = (data: object) => {
  return http.request<Response>("post",
    baseUrlApi("/admin/gym/rateRemove"),
    {data},
    {
      headers: {
        "token": getToken().accessToken
      }
    }
  );
};
// 场馆星级-更新
export const rateUpdate = (data: object) => {
  return http.request<Response>("post",
    baseUrlApi("/admin/gym/rateUpdate"),
    {data},
    {
      headers: {
        "token": getToken().accessToken
      }
    }
  );
};
// 获取场馆可上课程
export const getRateCourseList = (data: {page: number, gym_id: number}) => {
  const {page, gym_id} = data
  return http.request<Response>("get",
    baseUrlApi("/admin/gym/courseList"),
    {data},
    {
      headers: {
        "token": getToken().accessToken
      }
    }
  );
};
// 删除场馆可上课程
export const rateCourseRemove = (data: object) => {
  return http.request<Response>("post",
    baseUrlApi("/admin/gym/courseRemove"),
    {data},
    {
      headers: {
        "token": getToken().accessToken
      }
    }
  );
};
// 添加场馆可上课程
export const rateCourseAdd = (data: object) => {
  return http.request<Response>("post",
    baseUrlApi("/admin/gym/courseAdd"),
    {data},
    {
      headers: {
        "token": getToken().accessToken
      }
    }
  );
};
