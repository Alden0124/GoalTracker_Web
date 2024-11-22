import axiosInstance from "@/services/axiosInstance";
import { UserProfileResponse } from "./type";

export const FETCH_USER_PROFILE = {
  GetUserProfile: (): Promise<UserProfileResponse> =>
    axiosInstance.get("/users/profile"),
};
