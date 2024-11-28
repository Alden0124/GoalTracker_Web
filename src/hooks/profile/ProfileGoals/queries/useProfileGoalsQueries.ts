import { useMutation } from "@tanstack/react-query";
import { FETCH_GOAL } from "@/services/api/Profile/ProfileGoals";
import { GoalFormData } from "@/schemas/goalSchema";
import { queryKeys } from "./queryKeys";
import { useQueryClient } from "@tanstack/react-query";
import { notification } from "@/utils/notification";


// 創建目標
export const useCreateGoal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: GoalFormData) => FETCH_GOAL.CreateGoal(data),
    onSuccess: () => {
      // 更新目標列表
      queryClient.invalidateQueries({ queryKey: queryKeys.goals.createGoal() });
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
