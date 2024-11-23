import { REMOVE_COOKIE } from "@/utils/cookies";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 定義用戶資料介面
export interface UserInfo {
  accessToken: string;
  userInfo: {
    id: string;
    email?: string;
    avatar?: string;
    username?: string;
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
    username: "",
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
      state.userInfo = { ...state.userInfo, ...userInfo };
      state.isAuthenticated = true;
      console.log(state.userInfo);
    },
    // 登出
    signOut: (state) => {
      state.accessToken = "";
      state.userInfo = initialState.userInfo;
      state.isAuthenticated = false;
      REMOVE_COOKIE();
    },
  },
});

// 導出 actions
export const { setUserInfo, signOut } = userSlice.actions;

// 導出 reducer
export default userSlice.reducer;

// 選擇器（Selectors）
export const selectUserProFile = (state: { user: UserInfo }) => state.user.userInfo;
export const selectIsAuthenticated = (state: { user: UserInfo }) =>
  state.user.isAuthenticated;
