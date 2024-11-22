import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { FETCH_USER_PROFILE } from "@/services/api/userProfile";
import { useAppDispatch } from "@/hooks/common/useAppReduxs";
import { setUserInfo } from "@/stores/slice/userReducer";
import { GET_COOKIE } from "@/utils/cookies";

export const useUserProfile = () => {
  const dispatch = useAppDispatch();
  const token = GET_COOKIE();

  const handleFetchUserProfile = useCallback(async () => {
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
  }, [dispatch, token]);

  return useQuery({
    queryKey: ["userProfile", token],
    queryFn: handleFetchUserProfile,
    enabled: !!token,
    retry: 0,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 5,
  });
};
