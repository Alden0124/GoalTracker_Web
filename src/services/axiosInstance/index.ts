import axios from "axios";

// 使用 import.meta.env 訪問環境變數，如果沒有則使用生產環境的 URL
const baseURL =
  import.meta.env.VITE_API_URL || "https://goaltracker-admin.onrender.com/api";

// 創建 axios 實例
const instance = axios.create({
  baseURL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 請求攔截器
instance.interceptors.request.use(
  (config) => {
    // 從 localStorage 獲取 token
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 響應攔截器
instance.interceptors.response.use(
  (response) => {
    // 直接返回響應數據
    return response.data;
  },
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 未授權，可以在這裡處理登出邏輯
          localStorage.removeItem("token");
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
    return Promise.reject({
      respData: error.response.data,
      errorMessage: error.response?.data?.message,
      status: error.response.status,
    });
  }
);

export default instance;
