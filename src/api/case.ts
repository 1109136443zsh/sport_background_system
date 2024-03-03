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

export interface Data {
  coach_case_id: number;
  coach_id: string;
  coach_name: string;
  image_url: string;

  [property: string]: any;
}

// 学员案例列表
export const getCaseList = (data: { coach_id: number }) => {
  const {coach_id} = data
  return http.request<Response>("get",
    baseUrlApi(`/coach/case/list?coach_id=${coach_id}`),
    {},
    {
      headers: {
        "token": getToken().accessToken
      }
    }
  );
};
// 添加学员案例
export const addCase = (data: object) => {
  return http.request<Response>("post",
    baseUrlApi(`/coach/case/add`),
    {data},
    {
      headers: {
        "token": getToken().accessToken
      }
    }
  );
};
// 删除学员案例
export const removeCase = (data: object) => {
  return http.request<Response>("post",
    baseUrlApi(`/coach/case/delete`),
    {data},
    {
      headers: {
        "token": getToken().accessToken
      }
    }
  );
};
