import axiosInstance from "@/services/axiosInstance";

// 定義 API 響應的基本數據結構
interface AuthResponse {
  message: string;
}

export const FETCH_USER = {
  UsetProfile: (): Promise<AuthResponse> => axiosInstance.get("/user/Profile"),
};


