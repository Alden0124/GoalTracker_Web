// 定義 API 響應的基本數據結構
export interface AuthResponse {
  message: string;
}

export interface SignInResponse extends AuthResponse {
  accessToken: string
  user: {
    avatar: string
    email: string
    id: string
    isEmailVerified: boolean
  }
}

export interface GoogleLoginResponse extends AuthResponse {
  accessToken: string;
  // 其他可能的返回數據
}