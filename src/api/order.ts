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
  page_data: OrderDetailCopy[];
  /**
   * 分页大小
   */
  size: number;
  [property: string]: any;
}

/**
 * 订单基础信息
 */
export interface OrderDetailCopy {
  /**
   * 教练封面图
   */
  coach_image: string;
  /**
   * 教练名称
   */
  coach_name: string;
  /**
   * 课程名称
   */
  course_name: string;
  /**
   * 场馆名称
   */
  gym_name: string;
  /**
   * 订单id
   */
  order_id: number;
  /**
   * 最终支付价格
   */
  price: number;
  /**
   * 预定日期时间戳
   */
  schedule_date: number;
  /**
   * 预定时间节点ID
   */
  segment_id: number;
  /**
   * 订单状态，如已结束、待上课等
   */
  status_order: number;
  /**
   * 订单支付状态，如已支付等
   */
  status_pay: number;
  [property: string]: any;
}

// 查询订单列表
export const getOrderList = (data:{
  page: number,
  order_status: number,
  user_id: number,
  gym_id: number,
  complain: number,
  comment: number
}) => {
  const {page, complain, comment, order_status, user_id, gym_id} = data
  return http.request<Response>("get",
    `http://115.28.37.42:7788/admin/order/list?page=${page}&order_status=${order_status}&user_id=${user_id}&gym_id=${gym_id}&complain=${complain}&comment=${comment}`
  );
};
// 查询订单详情
export const getOrderDetail = (data:object) => {
  return http.request<Response>("get",
    "https://mock.apifox.com/m1/4026186-0-default/admin/order/get",
    {data}
  );
};
// 取消订单
export const cancelOrder = (data:object) => {
  return http.request<Response>("post",
    "https://mock.apifox.com/m1/4024188-0-default/admin/order/cancel",
    {data}
  );
};
// 获取订单学员个人信息
export const getUserDetail = (data:object) => {
  return http.request<Response>("get",
    "https://mock.apifox.com/m1/4024188-0-default/admin/order/getUser",
    {data}
  );
};
// 获取订单核销信息
export const getCheckinDetail = (data:object) => {
  return http.request<Response>("post",
    "https://mock.apifox.com/m1/4026186-0-default/admin/order/getCheckin",
    {data}
  );
};
// 订单核销
export const Checkin = (data:object) => {
  return http.request<Response>("post",
    "https://mock.apifox.com/m1/4026186-0-default/admin/order/checkin",
    {data}
  );
};
// 投诉订单-教练/场馆
export const addComplain = (data:object) => {
  return http.request<Response>("post",
    "https://mock.apifox.com/m1/4026186-0-default/admin/order/complain/add",
    {data}
  );
};
// 更新投诉订单状态
export const updateComplain = (data:object) => {
  return http.request<Response>("post",
    "https://mock.apifox.com/m1/4026186-0-default/admin/order/complain/update",
    {data}
  );
};
