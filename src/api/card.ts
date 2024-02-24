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
  page_data: Card[];
  /**
   * 分页大小
   */
  size: number;

  [property: string]: any;
}

/**
 * 会员卡
 */
export interface Card {
  /**
   * 卡激活时间，一般同购买时间
   */
  activate_time: number;
  /**
   * 卡类型ID
   */
  card_type_id: number;
  /**
   * 绑定的教练ID
   */
  coach_id?: number;
  /**
   * 绑定的课程ID
   */
  course_id?: number;
  /**
   * 过期时间
   */
  expire_time: number;
  /**
   * 绑定的场馆ID
   */
  gym_id?: number;
  /**
   * 权益剩余次数
   */
  remain: number;
  /**
   * 用户ID
   */
  user_id: number;
  /**
   * 用户财务订单关联订单ID，wallet_order表
   */
  wallet_order_id?: number;

  [property: string]: any;
}

// 会员卡-查询
export const getCardList = (page: number) => {
  return http.request<Response>("get",
    baseUrlApi(`/admin/card/typeList?page=${page}`),{},
    {
      headers: {
        "token": getToken().accessToken
      }
    }
  );
};
// 会员卡-删除
export const cardRemove = (data: object) => {
  return http.request<Response>("post",
    baseUrlApi("/admin/card/remove"),
    {data},
    {
      headers: {
        "token": getToken().accessToken
      }
    }
  );
};
// 会员卡-新增
export const cardAdd = (data: object) => {
  return http.request<Response>("post",
    baseUrlApi("/admin/card/add"),
    {data},
    {
      headers: {
        "token": getToken().accessToken
      }
    }
  );
};
// 会员卡类型-查询
export const getCardTypeList = (page: number) => {
  return http.request<Response>("get",
    baseUrlApi(`/admin/card/typeList?page=${page}`),
    {
      headers: {
        "token": getToken().accessToken
      }
    }
  );
};
// 会员卡类型-新增
export const addCardType = (data: object) => {
  return http.request<Response>("post",
    baseUrlApi("/admin/card/typeList"),
    {data},
    {
      headers: {
        "token": getToken().accessToken
      }
    }
  );
};
// 会员卡类型-删除
export const removeCardType = (data: object) => {
  return http.request<Response>("post",
    baseUrlApi("/admin/card/typeRemove"),
    {data},
    {
      headers: {
        "token": getToken().accessToken
      }
    }
  );
};
