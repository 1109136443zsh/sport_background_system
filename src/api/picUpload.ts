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
   * 访问地址
   */
  url: string;

  [property: string]: any;
}

// 后台通用图片上传
export const picUpload = (data: object) => {
  return http.request<Response>("post",
    "http://115.28.37.42:7788/admin/imageUpload",
    {data},
    {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
  );
};
