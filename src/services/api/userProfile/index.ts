import axiosInstance from "@/services/axiosInstance";
import { UserProfileResponse } from "./type";


export const FETCH_USER_PROFILE = {
  // 用戶資料管理
  GetUserProfile: (): Promise<UserProfileResponse> =>
    axiosInstance.get(`/users/profile`),
  GetPublicUserProfile: (userId: string): Promise<UserProfileResponse> =>
    axiosInstance.get(`/users/profile/${userId}`),
  UpdateProfile: async (formData: FormData) => {
    const { data } = await axiosInstance.patch<UserProfileResponse>(
      "/users/profile",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return data;
  },
  // 追蹤相關
  FollowUser: (userId: string): Promise<UserProfileResponse> =>
    axiosInstance.post(`/users/follow/${userId}`),

  UnfollowUser: (userId: string): Promise<UserProfileResponse> =>
    axiosInstance.delete(`/users/follow/${userId}`),

  GetFollowers: (userId: string): Promise<UserProfileResponse> =>
    axiosInstance.get(`/users/followers/${userId}`),

  GetFollowing: (userId: string): Promise<UserProfileResponse> =>
    axiosInstance.get(`/users/following/${userId}`),
};
