import axios from "axios";
import store from "@/store";

// 创建axios实例
const service = axios.create({
  withCredentials: true, // 默认的false  // `withCredentials` 表示跨域请求时是否需要使用凭证cookie
  timeout: 8000, // 请求超时时间
  // baseURL: process.env.VUE_APP_BASE_API,
  baseURL: "/api",
  // headers: { post: { 'Content-Type': 'application/x-www-form-urlencoded' } },
});

// request拦截器
service.interceptors.request.use(
  (config) => {
    // const token = window.localStorage.getItem('accessToken')
    // if (token) {
    //     config.headers.common.Authorization = token
    // }
    return config;
  },
  (error) => {
    // console.log("请求失败")
    Promise.reject(error);
  }
);
// response拦截器
service.interceptors.response.use(
  (response) => {
    const responseType = response.headers["content-type"];
    if (responseType && responseType.startsWith("application/json")) {
      // 统一处理状态
      const res = response.data;
      if (res.code !== 0) {
        // 需自定义
        throw new Error(res.msg);
      } else {
        return res.data;
      }
    } else {
      return Promise.resolve(response);
    }
  },
  (error) => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = "错误请求";
          break;
        case 401:
          error.message = "未授权，请重新登录";
          store.dispatch("system/updateLoginTip");
          return;
        case 403:
          error.message = "拒绝访问";
          break;
        case 404:
          error.message = "请求错误,未找到该资源";
          break;
        case 405:
          error.message = "请求方法未允许";
          break;
        case 408:
          error.message = "请求超时";
          break;
        case 500:
          error.message = "服务器端出错";
          break;
        case 501:
          error.message = "网络未实现";
          break;
        case 502:
          error.message = "网络错误";
          break;
        case 503:
          error.message = "服务不可用";
          break;
        case 504:
          error.message = "网络超时";
          break;
        case 505:
          error.message = "http版本不支持该请求";
          break;
        default:
          error.message = `未知错误${error.response.status}`;
      }
    } else {
      error.message = "连接到服务器失败";
    }
    return Promise.reject(error);
  }
);

/* 网络请求部分 */

const api = {
  /*
   *  get请求
   *  url:请求地址
   *  params:参数
   * */
  async get(url, params = {}) {
    return service({
      url: url,
      method: "get",
      params: params,
    });
  },

  async put(url, file) {
    return service({
      url: url,
      method: "put",
      data: file,
      withCredentials: false,
    });
  },

  async putCos(url, headers, file) {
    headers["Content-Type"] = file.type;
    return service({
      url: url,
      method: "put",
      data: file,
      headers: headers,
      withCredentials: false,
    });
  },

  /*
   *  post请求
   *  url:请求地址
   *  params:参数
   * */
  async post(url, params = {}) {
    return service({
      url: url,
      method: "post",
      data: params,
    });
  },

  async postForm(url, params = {}) {
    return service({
      url: url,
      method: "post",
      data: params,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
  },

  /*
   *  文件上传
   *  url:请求地址
   *  params:参数
   * */
  async fileUpload(url, params = {}) {
    try {
      let res = await service({
        url: url,
        method: "post",
        data: params,
        headers: { "Content-Type": "multipart/form-data" },
      });
      res = res.data;
      return new Promise((resolve, reject) => {
        if (res.code === 0) {
          resolve(res);
        } else {
          reject(res);
        }
      });
    } catch (err) {
      // return (e.message)
      alert("服务器出错");
      console.log(err);
    }
  },
};

export default api;
