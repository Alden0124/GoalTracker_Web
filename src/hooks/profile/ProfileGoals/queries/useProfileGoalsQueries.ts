import { useMutation, useQuery } from "@tanstack/react-query";
import { FETCH_GOAL } from "@/services/api/Profile/ProfileGoals";
import { GoalFormData } from "@/schemas/goalSchema";
import { queryKeys } from "./queryKeys";
import { useQueryClient } from "@tanstack/react-query";
import { notification } from "@/utils/notification";
import { GetUserGoalsParams } from "@/services/api/Profile/ProfileGoals/type";

// 創建目標
export const useCreateGoal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: GoalFormData) => FETCH_GOAL.CreateGoal(data),
    onSuccess: () => {
      // 使用 getUserGoals 的 queryKey 來使查詢失效
      queryClient.invalidateQueries({ 
        queryKey: queryKeys.goals.getUserGoals() 
      });
      
      notification.success({ title: "目標新增成功" });
    },
    onError: (error: any) => {
      notification.error({
        title: "目標新增失敗",
        text: error.errorMessage || "請稍後再試",
      });
      console.error("Create goal error:", error);
    },
  });
};

// 獲取指定用戶的目標列表
export const useGetUserGoals = (userId: string, params: GetUserGoalsParams) => {
  return useQuery({
    // 確保 queryKey 與 invalidateQueries 中使用的相同
    queryKey: queryKeys.goals.getUserGoals(userId),
    queryFn: () => FETCH_GOAL.GetUserGoals(userId, params),
    enabled: !!userId,  
  });
};
