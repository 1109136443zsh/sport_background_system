import {http} from "@/utils/http";
import {baseUrlApi} from "@/api/utils";
import {getToken} from "@/utils/auth";

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
  page_data: PageDatum[];
  /**
   * 分页大小
   */
  size: number;

  [property: string]: any;
}

export interface PageDatum {
  /**
   * 课程ID
   */
  course_id: number;
  /**
   * 课程名
   */
  course_name: string;

  [property: string]: any;
}

// 教练星级-获取列表
export const getRateList = () => {
  return http.request<Response>("get",
    baseUrlApi("/admin/coach/rateList"),{},
    {
      headers: {
        "token": getToken().accessToken
      }
    }
  );
};

// 教练星级-增加
export const rateAdd = (data: object) => {
  return http.request<Response>("post",
    baseUrlApi("/admin/coach/rateAdd"),
    {data},
    {
      headers: {
        "token": getToken().accessToken
      }
    }
  );
};
// 教练星级-更新
export const rateUpdate = (data: object) => {
  return http.request<Response>("post",
    baseUrlApi("/admin/coach/rateUpdate"),
    {data},
    {
      headers: {
        "token": getToken().accessToken
      }
    }
  );
};
// 教练星级-删除
export const rateRemove = (data: object) => {
  return http.request<Response>("post",
    baseUrlApi("/admin/coach/rateRemove"),
    {data},
    {
      headers: {
        "token": getToken().accessToken
      }
    }
  );
};

// 教练星级-添加可上课程
export const rateCourseAdd = (data: object) => {
  return http.request<Response>("post",
    baseUrlApi("/admin/coach/rateCourseAdd"),
    {data},
    {
      headers: {
        "token": getToken().accessToken
      }
    }
  );
};
// 教练星级-获取可上课程列表
export const getRateCourseList = (data: {rate_id: number, page: number}) => {
  const {rate_id, page} = data
  return http.request<Response>("get",
    baseUrlApi(`/admin/coach/rateCourseList?rate_id=${rate_id}&page=${page}`),
    {},
    {
      headers: {
        "token": getToken().accessToken
      }
    }
  );
};
// 教练星级-删除可上课程
export const rateCourseRemove = (data: object) => {
  return http.request<Response>("post",
    baseUrlApi("/admin/coach/rateCourseRemove"),
    {data},
    {
      headers: {
        "token": getToken().accessToken
      }
    }
  );
};
