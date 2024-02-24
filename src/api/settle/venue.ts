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
  page_data: ApplyGymBase[];
  /**
   * 分页大小
   */
  size: number;
  [property: string]: any;
}

/**
 * 场馆申请入驻基础信息
 */
type ApplyGymBase = {
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
   * 详细地址
   */
  location: string;
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
}
// 获取场馆列表
export const getVenueList = (data: {page: string, phone: string}) => {
  const {page, phone} = data
  return http.request<Response>("get",
    baseUrlApi(`/admin/apply/gym/list?page=${page}&phone=${phone}`),
    {},
    {
      headers: {
        "token": getToken().accessToken
      }
    }
  );
};
// 获取场馆详情
export const getVenueDetail = (data: {apply_id: string}) => {
  const {apply_id} = data
  return http.request<Response>("get",
    baseUrlApi(`/admin/apply/gym/get?apply_id=${apply_id}`),
    {},
    {
      headers: {
        "token": getToken().accessToken
      }
    }
  );
};

// 同意入驻
export const venueAccept = (data:object) => {
  return http.request<Response>("post",
    baseUrlApi("/admin/apply/gym/accept"),
    {data},
    {
      headers: {
        "token": getToken().accessToken
      }
    }
  );
};
// 拒绝入驻
export const venueReject = (data:object) => {
  return http.request<Response>("post",
    baseUrlApi("/admin/apply/gym/reject"),
    {data},
    {
      headers: {
        "token": getToken().accessToken
      }
    }
  );
};
