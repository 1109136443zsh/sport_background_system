import {http} from "@/utils/http";
import {baseUrlApi} from "@/api/utils";
import {getToken} from "@/utils/auth";

type Response = {
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
type Data = {
  /**
   * 总条数
   */
  count: number;
  /**
   * 当前页
   */
  page: number;
  page_data: ApplyCoachBase[];
  /**
   * 分页大小
   */
  size: number;
  [property: string]: any;
}

/**
 * 教练申请入驻基础信息
 */
type ApplyCoachBase = {
  /**
   * 申请ID
   */
  apply_id: number;
  /**
   * 申请当前状态
   */
  apply_status: number;
  /**
   * 申请时间
   */
  apply_time: number;
  /**
   * 头像
   */
  avatar: string;
  /**
   * 真实姓名
   */
  name: string;
  openid: string;
  /**
   * 手机号
   */
  phone: string;
  [property: string]: any;
};

export const getCoachList = (data: { page: number, phone: string }) => {
  const {page, phone} = data
  return http.request<Response>("get",
    baseUrlApi(`/admin/apply/coach/list?page=${page}&phone=${phone}`),
    {},
    {
      headers: {
        "token": getToken().accessToken
      }
    }
  );
};
// 获取入驻详情
export const getCoachDetail = (data: { apply_id }) => {
  const {apply_id} = data
  return http.request<Response>("get",
    baseUrlApi(`/admin/apply/coach/get?apply_id=${apply_id}`),
    {data},
    {
      headers: {
        "token": getToken().accessToken
      }
    }
  );
};
// 同意入驻
export const coachAccept = (data: object) => {
  return http.request<Response>("post",
    baseUrlApi("/admin/apply/coach/accept"),
    {data},
    {
      headers: {
        "token": getToken().accessToken
      }
    }
  );
};
// 拒绝入驻
export const coachReject = (data: object) => {
  return http.request<Response>("post",
    baseUrlApi("/admin/apply/coach/reject"),
    {data},
    {
      headers: {
        "token": getToken().accessToken
      }
    }
  );
};
