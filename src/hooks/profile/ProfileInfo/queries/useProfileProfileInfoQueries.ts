import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FETCH_USER_PROFILE } from "@/services/api/Profile/ProfileInfo";
import { useAppDispatch } from "@/hooks/common/useAppReduxs";
import { setUserInfo } from "@/stores/slice/userReducer";
import { GET_COOKIE } from "@/utils/cookies";
import { queryKeys } from "./queryKeys";
import { notification } from "@/utils/notification";

// 獲取當前用戶資料
export const useCurrentUser = (options = {}) => {
  const dispatch = useAppDispatch();
  const token = GET_COOKIE();

  return useQuery({
    queryKey: queryKeys.users.profile(),
    queryFn: async () => {
      if (!token) {
        throw new Error("No token found");
      }

      try {
        const response = await FETCH_USER_PROFILE.GetUserProfile();

        if (response.user) {
          dispatch(
            setUserInfo({
              accessToken: token,
              userInfo: response.user,
            })
          );
        }

        return response;
      } catch (error) {
        throw error;
      }
    },
    enabled: Boolean(token),
    retry: 0,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 5,
    ...options,
  });
};

// 公開用戶資料
export const usePublicUserProfile = (userId: string, options = {}) => {
  return useQuery({
    queryKey: queryKeys.users.publicProfile(userId),
    queryFn: async () => {
      try {
        const response = await FETCH_USER_PROFILE.GetPublicUserProfile(userId);
        return response;
      } catch (error) {
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

// 更新用戶資料
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
        text: "請稍後再試",
      });
      console.error("Update profile error:", error);
    },
  });
};

// 追蹤用戶
export const useFollowUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => FETCH_USER_PROFILE.FollowUser(userId),
    onSuccess: (_, userId) => {
      // 更新當前用戶資料
      queryClient.invalidateQueries({ queryKey: queryKeys.users.profile() });
      // 更新目標用戶的公開資料
      queryClient.invalidateQueries({
        queryKey: queryKeys.users.publicProfile(userId),
      });
      notification.success({ title: "追蹤成功" });
    },
    onError: (error: any) => {
      notification.error({
        title: "追蹤失敗",
        text: error.errorMessage || "請稍後再試",
      });
      console.error("Follow user error:", error);
    },
  });
};

// 取消追蹤用戶
export const useUnfollowUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => FETCH_USER_PROFILE.UnfollowUser(userId),
    onSuccess: (_, userId) => {
      // 更新當前用戶資料
      queryClient.invalidateQueries({ queryKey: queryKeys.users.profile() });
      // 更新目標用戶的公開資料
      queryClient.invalidateQueries({
        queryKey: queryKeys.users.publicProfile(userId),
      });
      notification.success({ title: "取消追蹤成功" });
    },
    onError: (error) => {
      notification.error({ title: "取消追蹤失敗", text: "請稍後再試" });
      console.error("Unfollow user error:", error);
    },
  });
};

/**
 * 獲取粉絲列表，每次調用時都會重新獲取數據
 */
export const useGetFollowers = (userId: string, isOpen: boolean, options = {}) => {
  return useQuery({
    queryKey: [queryKeys.users.followers(userId), isOpen],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const response = await FETCH_USER_PROFILE.GetFollowers(userId);
      return response.followers;
    },
    enabled: !!userId && isOpen,
    retry: 0,
    gcTime: 1000 * 60 * 5,
    staleTime: 0,
    ...options,
  });
};

/**
 * 獲取追蹤者列表，每次調用時都會重新獲取數據
 */
export const useGetFollowing = (userId: string, isOpen: boolean, options = {}) => {
  return useQuery({
    queryKey: [queryKeys.users.following(userId), isOpen],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const response = await FETCH_USER_PROFILE.GetFollowing(userId);
      return response.following;
    },
    enabled: !!userId && isOpen,
    retry: 0,
    gcTime: 1000 * 60 * 5,
    staleTime: 0,
    ...options,
  });
};