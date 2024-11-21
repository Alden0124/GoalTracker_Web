import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 定義用戶資料介面
interface UserInfo {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
  lineId?: string;
  // ... 其他可能的用戶資料
}

// 定義 state 介面
export interface UserState {
  userInfo: UserInfo | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

// 初始狀態
const initialState: UserState = {
  userInfo: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // 設置用戶資料
    setUserInfo: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    // 設置載入狀態
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    // 設置錯誤訊息
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  
    // 登出 - 清除所有用戶資料
    logout: (state) => {
      state.userInfo = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
});

// 導出 actions
export const {
  setUserInfo,
  setLoading,
  setError,
  logout,
} = userSlice.actions;

// 導出 reducer
export default userSlice.reducer;

// 選擇器（Selectors）
export const selectUser = (state: { user: UserState }) => state.user.userInfo;
export const selectIsAuthenticated = (state: { user: UserState }) => state.user.isAuthenticated;
export const selectLoading = (state: { user: UserState }) => state.user.loading;
export const selectError = (state: { user: UserState }) => state.user.error;
