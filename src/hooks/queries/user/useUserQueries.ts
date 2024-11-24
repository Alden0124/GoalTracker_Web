import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FETCH_USER_PROFILE } from "@/services/api/userProfile";
import { useAppDispatch } from "@/hooks/common/useAppReduxs";
import { setUserInfo } from "@/stores/slice/userReducer";
import { GET_COOKIE } from "@/utils/cookies";
import { handleError } from "@/utils/errorHandler";
import { queryKeys } from "./queryKeys";
import { notification } from "@/utils/notification";

// 獲取當前用戶資料
export const useCurrentUser = (options = {}) => {
  const dispatch = useAppDispatch();
  const token = GET_COOKIE();

  return useQuery({
    queryKey: queryKeys.users.profile(),
    queryFn: async () => {
      try {
        const response = await FETCH_USER_PROFILE.GetUserProfile();

        if (response.user && token) {
          dispatch(
            setUserInfo({
              accessToken: token,
              userInfo: response.user,
            })
          );
        }

        return response;
      } catch (error) {
        handleError(error, "獲取用戶資料失敗");
        throw error;
      }
    },
    enabled: !!token,
    retry: 0,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 5,
    ...options,
  });
};

export const usePublicUserProfile = (userId: string, options = {}) => {
  return useQuery({
    queryKey: queryKeys.users.publicProfile(userId),
    queryFn: async () => {
      try {
        const response = await FETCH_USER_PROFILE.GetPublicUserProfile(userId);
        return response;
      } catch (error) {
        handleError(error, "獲取用戶資料失敗");
        throw error;
      }
    },
    enabled: !!userId,
    retry: 0,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 5,
    ...options,
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => 
      FETCH_USER_PROFILE.UpdateProfile(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.profile() });
      notification.success({ title: "更新成功" });
    },
    onError: (error) => {
      notification.error({ 
        title: "更新失敗",
        text: "請稍後再試"
      });
      console.error('Update profile error:', error);
    }
  });
};
