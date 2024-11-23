import axios from "axios";
import { GET_COOKIE, REMOVE_COOKIE } from "@/utils/cookies";
import { ApiError } from "./type";

const isProd = window.location.hostname !== "localhost";

// 根據環境設置 baseURL
const baseURL = isProd
  ? "https://goaltracker-admin.onrender.com/api"
  : import.meta.env.VITE_API_URL;

// 創建 axios 實例
const instance = axios.create({
  baseURL,
  timeout: 15000,
  withCredentials: true, // 確保跨域請求時攜帶 cookies
  headers: {
    "Content-Type": "application/json",
    // 添加其他必要的標頭
    ...(isProd && {
      "Accept": "application/json",
      "X-Requested-With": "XMLHttpRequest"
    })
  }
});

// 請求攔截器
instance.interceptors.request.use(
  (req) => {
    // 獲取當前語言
    const currentLang = localStorage.getItem("language") || "zh-TW";
    
    // 設置 Accept-Language header
    req.headers["Accept-Language"] = currentLang;

    // 設置 token
    const token = GET_COOKIE() || false;
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
      // 添加調試日誌
      console.log('Request URL:', req.url);
      console.log('Request Headers:', req.headers);
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
    // 添加響應調試日誌
    console.log('Response Headers:', response.headers);
    console.log('Response Cookies:', document.cookie);
    return response.data;
  },
  (error) => {
    if (error.response) {
      console.error('完整錯誤信息:', {
        status: error.response.status,
        headers: error.response.headers,
        data: error.response.data
      });
      
      switch (error.response.status) {
        case 401:
          REMOVE_COOKIE();
          // 可以添加重定向邏輯
          break;
        // ... 其他錯誤處理 ...
      }
    }
    return Promise.reject<ApiError>({
      respData: error.response?.data,
      errorMessage: error.response?.data?.message,
      status: error.response?.status
    });
  }
);

export default instance;
