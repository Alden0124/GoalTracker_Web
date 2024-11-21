import { configureStore } from "@reduxjs/toolkit";
import userReducer from '@/stores/slice/userReducer';


export const store = configureStore({
  reducer: {
    user: userReducer
  },
});

// 導出 RootState 和 AppDispatch 類型
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;



