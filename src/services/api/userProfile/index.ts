import axiosInstance from "@/services/axiosInstance";
import { UserProfileResponse } from "./type";

export const FETCH_USER_PROFILE = {
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
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return data;
  },
};
