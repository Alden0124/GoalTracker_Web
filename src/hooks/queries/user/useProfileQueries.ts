import { useAppSelector } from "@/hooks/common/useAppReduxs";
import { selectUserProFile } from "@/stores/slice/userReducer";
import { useParams } from "react-router-dom";
import { useCurrentUser, usePublicUserProfile } from "./useUserQueries";

export const useProfileData = () => {
  const { id: urlUserId } = useParams();
  const currentUserProfile = useAppSelector(selectUserProFile);
  
  // 判斷是否為當前用戶的個人頁面
  const isCurrentUser = !urlUserId || urlUserId === currentUserProfile.id;
  
  // 獲取當前用戶數據
  const currentUserQuery = useCurrentUser({
    enabled: isCurrentUser
  });

  // 獲取其他用戶數據
  const otherUserQuery = usePublicUserProfile(urlUserId || '', {
    enabled: !isCurrentUser && !!urlUserId
  });

  return {
    isCurrentUser,
    isLoading: isCurrentUser ? currentUserQuery.isLoading : otherUserQuery.isLoading,
    error: isCurrentUser ? currentUserQuery.error : otherUserQuery.error,
    data: isCurrentUser ? currentUserQuery.data : otherUserQuery.data,
    refetch: isCurrentUser ? currentUserQuery.refetch : otherUserQuery.refetch
  };
}; 