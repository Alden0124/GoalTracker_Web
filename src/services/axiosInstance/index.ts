import axios, { 
  InternalAxiosRequestConfig,
  AxiosHeaders 
} from "axios";
import { GET_COOKIE, REMOVE_COOKIE } from "@/utils/cookies";
import { ApiError } from "./type";
import { store } from '@/stores';
import { startLoading, finishLoading } from '@/stores/slice/loadingReducer';

const isProd = window.location.hostname !== "localhost";

// 根據環境設置 baseURL
const baseURL = isProd
  ? "https://goaltracker-admin.onrender.com/api"
  : import.meta.env.VITE_API_URL;

// 創建 axios 實例
const instance = axios.create({
  baseURL,
  timeout: 15000,
  withCredentials: true,
  headers: {
    ...(isProd && {
      "Accept": "application/json",
      "X-Requested-With": "XMLHttpRequest"
    })
  }
});

// 追蹤請求數量
let pendingRequests = 0;

const handleStartLoading = () => {
  pendingRequests++;
  
  // 如果是第一個請求，才觸發 loading
  if (pendingRequests === 1) {
    store.dispatch(startLoading());
  }
};

const handleStopLoading = () => {
  pendingRequests = Math.max(0, pendingRequests - 1);
  
  // 只有當所有請求都完成時，才關閉 loading
  if (pendingRequests === 0) {
    store.dispatch(finishLoading());
  }
};

// 請求攔截器
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (config.headers?.['skip-loading'] !== 'true') {
      handleStartLoading();
    }
    
    const currentLang = localStorage.getItem("language") || "zh-TW";
    
    if (!(config.headers instanceof AxiosHeaders)) {
      config.headers = new AxiosHeaders(config.headers);
    }

    config.headers.set('Accept-Language', currentLang);
    
    if (!config.headers.get('Content-Type')) {
      config.headers.set('Content-Type', 'application/json');
    }
    
    const token = GET_COOKIE() || false;
    if (token) {
      config.headers.set('Authorization', `Bearer ${token}`);
    }

    return config;
  },
  (error) => {
    handleStopLoading();
    console.error('請求攔截器錯誤:', error);
    return Promise.reject(error);
  }
);

// 響應攔截器
instance.interceptors.response.use(
  (response) => {
    if (response.config.headers?.['skip-loading'] !== 'true') {
      handleStopLoading();
    }
    return response.data;
  },
  (error) => {
    if (error.config?.headers?.['skip-loading'] !== 'true') {
      handleStopLoading();
    }
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
