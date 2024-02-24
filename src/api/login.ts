import {http} from "@/utils/http";
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
  accessToken: string;
  expires: Date,
  username?: string;
  roles: Array<string>;
  refreshToken: string;
}

/**
 * 数据
 */
export interface Data {
  /**
   * 登录二维码过期时间，时间戳
   */
  expire_time: number;
  /**
   * 登录二维码
   */
  qrcode: string;
  /**
   * 二维码对应的唯一会话id，消费该id获取token
   */
  session_id: string;
}

/**
 * 数据
 */
export interface Data {
  /**
   * 过期时间
   */
  expire_time: number;
  accessToken: string;

  [property: string]: any;
}

export type UserResult = {
  code: number;
  data: {
    /** 用户名 */
    username: string;
    /** 当前登陆用户的角色 */
    roles: Array<string>;
    /** `token` */
    accessToken: string;
    /** 用于调用刷新`accessToken`的接口时所需的`token` */
    refreshToken: string;
    /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
    expires: Date;
  };
};

// 账密登录
export const getLogin = (data: object) => {
  return http.request<UserResult>("post",
      "http://115.28.37.42:7788/admin/user/login",
    {data}
  );
};



// 二维码登录
export const qrCodeLogin = () => {
  return http.request<Response>("get",
    "http://115.28.37.42:7788/admin/user/wxlogin"
  );
};
// 检查小程序扫码登录状态
export const checkQrCodeLogin = (data: object) => {
  return http.request<Response>("post",
    "http://115.28.37.42:7788/admin/user/checkWxlogin",
    {data}
  );
};
