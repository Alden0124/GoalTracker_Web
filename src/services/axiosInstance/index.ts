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
  withCredentials: true, // 保持不變，這很重要
  headers: {
    "Content-Type": "application/json",
    ...(isProd && {
      "Accept": "application/json",
      "X-Requested-With": "XMLHttpRequest"
    })
  }
});

// 請求攔截器
instance.interceptors.request.use(
  (req) => {
    const token = GET_COOKIE() || false;
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }

    // 添加 CORS 相關配置
    if (isProd) {
      req.headers["Access-Control-Allow-Credentials"] = "true";
      req.headers["Access-Control-Allow-Origin"] = "https://goaltracker-admin.onrender.com";
    }

    // 調試日誌
    console.log('Request Config:', {
      url: req.url,
      headers: req.headers,
      withCredentials: req.withCredentials
    });

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
    // 調試日誌
    console.log('Response Info:', {
      status: response.status,
      headers: response.headers,
      cookies: document.cookie
    });

    // 檢查是否有新的 refreshToken
    const cookies = document.cookie.split(';');
    const refreshTokenCookie = cookies.find(cookie => 
      cookie.trim().startsWith('refreshToken=')
    );
    
    if (refreshTokenCookie) {
      console.log('Found refreshToken in cookies');
    }

    return response.data;
  },
  async (error) => {
    if (error.response) {
      console.error('Error Response:', {
        status: error.response.status,
        headers: error.response.headers,
        data: error.response.data
      });

      // 處理 401 錯誤
      if (error.response.status === 401) {
        if (error.response.data?.expired) {
          try {
            // 嘗試刷新 token
            const response = await instance.post('/auth/refresh-token');
            if (response.data?.accessToken) {
              // 更新 token 並重試原請求
              const originalRequest = error.config;
              originalRequest.headers.Authorization = 
                `Bearer ${response.data.accessToken}`;
              return instance(originalRequest);
            }
          } catch (refreshError) {
            console.error('Token 刷新失敗:', refreshError);
            REMOVE_COOKIE();
            // 可以添加重定向到登入頁面的邏輯
          }
        } else {
          REMOVE_COOKIE();
          // 可以添加重定向到登入頁面的邏輯
        }
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