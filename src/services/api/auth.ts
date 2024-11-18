import axiosInstance from "@/services/axiosInstance";

// 首先定義響應類型接口
interface AuthResponse {
  message: string;
  // 可以根據實際響應添加其他字段
}

export const FETCH_AUTH = {
  /**
   * 用戶註冊
   * @param {object} data - 註冊數據
   * @param {string} data.email - 用戶郵箱
   * @param {string} data.password - 用戶密碼
   * @returns {Promise<AxiosResponse>} 註冊響應
   */
  SignUp: (data: object) => axiosInstance.post("/signUp", data),

  /**
   * 發送驗證碼
   * @param {object} data - 驗證碼數據
   * @param {string} data.email - 目標郵箱
   */
  "send-verification-code": (data: { email: string }): Promise<AuthResponse> =>
    axiosInstance.post("/send-verification-code", data),

  /**
   * 用戶登入
   * @param {object} data - 登入數據
   * @param {string} email - 用戶郵件
   * @param {string} password - 用戶密碼
   * @returns
   */
  SingIn: (data: object) => axiosInstance.post("signIn", data),

  VerifyCode: (data: object) => axiosInstance.post("/verify-code", data),
  
  RefreshToken: (data: object) => axiosInstance.post("/refresh-token", data),
};
