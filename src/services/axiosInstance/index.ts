import axios from "axios";
// cookie
import { GET_COOKIE, REMOVE_COOKIE } from "@/utils/cookies";
// type
import { ApiError } from "./type";

// 使用 import.meta.env 訪問環境變數，如果沒有則使用生產環境的 URL
const baseURL =
  import.meta.env.VITE_API_URL || "https://goaltracker-admin.onrender.com/api";

// 創建 axios 實例
const instance = axios.create({
  baseURL,
  timeout: 15000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// 請求攔截器
instance.interceptors.request.use(
  (req) => {
    const token = GET_COOKIE() || false;
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
      console.log('發送請求時的 token:', token);
    }
    return req;
  },
  (error) => {
    console.error('請求攔截器錯誤:', error);
    return Promise.reject(error);
  }
);

// 響應攔截器
instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 未授權，可以在這裡處理登出邏輯
          REMOVE_COOKIE();
          // 可以在這裡添加重定向到登錄頁面的邏輯
          break;
        case 403:
          // 權限不足
          console.error("沒有權限訪問該資源");
          break;
        case 404:
          // 資源不存在
          console.error("請求的資源不存在");
          break;
        default:
          console.error("發生錯誤:", error.response.data);
      }
      console.log(error);
    }
    return Promise.reject<ApiError>({
      respData: error.response.data,
      errorMessage: error.response?.data?.message,
      status: error.response.status,
    });
  }
);

export default instance;
