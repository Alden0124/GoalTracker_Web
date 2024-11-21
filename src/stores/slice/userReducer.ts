import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 定義用戶資料介面
export interface UserInfo {
  accessToken: string;
  userInfo: {
    id: string;
    email?: string;
    avatar?: string;
    isEmailVerified: boolean;
    providers?: Array<"google" | "line">;
  };
  isAuthenticated?: boolean;
}

// 初始狀態
const initialState: UserInfo = {
  accessToken: "",
  userInfo: {
    id: "",
    email: "",
    avatar: "",
    isEmailVerified: false,
    providers: [],
  },
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // 設置用戶資料
    setUserInfo: (state, action: PayloadAction<UserInfo>) => {
      const { accessToken, userInfo } = action.payload;
      state.accessToken = accessToken;
      state.userInfo = userInfo;
      state.isAuthenticated = true;
    },
  },
});

// 導出 actions
export const { setUserInfo } = userSlice.actions;

// 導出 reducer
export default userSlice.reducer;

// 選擇器（Selectors）
export const selectUser = (state: { user: UserInfo }) => state.user.userInfo;
