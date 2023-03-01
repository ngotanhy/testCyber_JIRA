import axios, { AxiosRequestConfig } from "axios";
import { toast } from "react-toastify";
import { toastOptionsErr } from "../App";

export const configs = {
  setStore: (name: string, values: any) => {
    localStorage.setItem(name, values);
  },
  getStore: (name: string) => {
    return localStorage.getItem(name);
  },
  setStoreJSON: (name: string, values: any) => {
    // Biến thành chuỗi
    values = JSON.stringify(values);
    // Lưu vào store
    localStorage.setItem(name, values);
  },
  getStoreJSON: (name: string) => {
    if (localStorage.getItem(name)) {
      let value: any = localStorage.getItem(name);
      let content = JSON.parse(value);
      return content;
    }
    return null;
  },

  clearLocalStorage: (name: string) => {
    localStorage.removeItem(name);
  },
  ACCESS_TOKEN: "accessToken",
  USER_LOGIN: "userLogin",
  CURRENT_USER:"currentUser",
};

export const {
  ACCESS_TOKEN,
  USER_LOGIN,
  CURRENT_USER,
  setStore,
  getStore,
  setStoreJSON,
  getStoreJSON,
  clearLocalStorage
} = configs;

export const TOKEN_CYBERSOFT =
  "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL2V4cGlyZWQiOiIyLzQvMjA0NiAzOjE2OjM4IFBNIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6ImI5Mzc2NDk3LTE2NzgtNDJlMC1iOGY4LWQ1Y2NhYTAzMjc0ZiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6ImFkbWluQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6WyJDX0tIIiwiQU5ZIiwiQ19MTCIsIkNfTE9QIiwiQ19ORCIsIkNIRUNLX01FTlRPUl9MT1AiLCJEX0RBTkgiLCJEX0tIIiwiRF9MTCIsIkRfTkQiLCJGX0dDIiwiRl9MT1AiLCJHRF9MSCIsIktfVFQiLCJOX1FVWUVOIiwiUUxfQkwiLCJRTF9CTSIsIlFMX0NMIiwiUUxfR0MiLCJRTF9ITVQiLCJRTF9LSCIsIlFMX0xUIiwiUUxfVFQiLCJSX0JIIiwiUl9LSCIsIlJfTEwiLCJSX0xPUCIsIlJfTkQiLCJSX1ZMIiwiVV9LSCIsIlVfTEwiLCJVX0xPUCIsIlVfTkQiLCJYX0tIX0wiLCJRTF9MQ04iLCJRTF9US0QiLCJRTF9DSFRMIiwiUUxfUk0iLCJEX0JUIiwiS19DSEVDS19MIiwiUUxfQ0NOIiwiUUxfS0tIViIsIlVfTkdBWV9CSCIsIlFMX0NPTkZJRyJdLCJuYmYiOjE2NzU0OTg1OTgsImV4cCI6MTY3NTUwMjE5OH0.qDwGahgmxsJyfRjjpEUJk3i-fjLHKTCEOs3VKhTMVyo";

//Cấu hình interceptor {Cấu hình cho các request và response}
export const http = axios.create({
  baseURL: `https://jiranew.cybersoft.edu.vn/api`,
  timeout: 6000,
});

//Cấu hình request

http.interceptors.request.use(
  (config:AxiosRequestConfig)  => {
      const token = getStore(ACCESS_TOKEN);
      if( config.headers){
          config.headers  = {
              ['Token']: token,
              ['tokenCybersoft']: TOKEN_CYBERSOFT
          }
      }
      return config
  },
  error => {
      Promise.reject(error)
  }
)
/*
    StatusCode: Mã kết quả trả về do backend qui định
    200(Success): Kết quả trả về thành công
    201(Created): Tạo giá trị thành công trên server (thường dùng 200)
    400(Bad Request); Không tồn tại đường dẫn
    404(Not Found): Không tìm thấy dữ liệu
    401(UnAuthorize): Không có quyền truy cập vào API
    403(Forbiden): Token chưa đủ quyền truy cập
    500(Error in server): Lỗi xảy ra trên server (Nguyên do do FE hoặc BE tùy tình huống)
*/

// // Cấu hình kết quả trả về
http.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    if (err.response.status === 400 || err.response.status === 404) {
      toast.error("Error", toastOptionsErr);
      return Promise.reject(err);
    }
    if (err.response.status === 401 || err.response.status === 403) {
      toast.error("Token Không hợp lệ! Vui lòng đăng nhập lại", toastOptionsErr);
      return Promise.reject(err);
    }
  }
);
