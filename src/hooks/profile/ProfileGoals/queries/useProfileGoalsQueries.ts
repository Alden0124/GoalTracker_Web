import { useMutation, useQuery } from "@tanstack/react-query";
import { FETCH_GOAL } from "@/services/api/Profile/ProfileGoals";
import { GoalFormData } from "@/schemas/goalSchema";
import { queryKeys } from "./queryKeys";
import { useQueryClient } from "@tanstack/react-query";
import { notification } from "@/utils/notification";
import {
  GetUserGoalsParams,
  GoalStatus,
} from "@/services/api/Profile/ProfileGoals/type";
import { handleError } from "@/utils/errorHandler";

interface UpdateGoalData extends GoalFormData {
  status?: GoalStatus;
}

// 創建目標
export const useCreateGoal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: GoalFormData) => FETCH_GOAL.CreateGoal(data),
    onSuccess: () => {
      // 使用 getUserGoals 的 queryKey 來使查詢失效
      queryClient.invalidateQueries({
        queryKey: queryKeys.goals.getUserGoals(),
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

// 刪除目標
export const useDeleteGoal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (goalId: string) => FETCH_GOAL.DeleteGoal(goalId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.goals.getUserGoals(),
      });
      notification.success({ title: "目標刪除成功" });
    },
    onError: (error: any) => {
      handleError(error, "刪除目標失敗");
    },
  });
};

// 更新目標
export const useUpdateGoal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ goalId, data }: { goalId: string; data: UpdateGoalData }) =>
      FETCH_GOAL.UpdateGoal(goalId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.goals.getUserGoals(),
      });
      notification.success({ title: "目標更新成功" });
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

// 新增點讚 mutation
export const useLikeGoal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    // 修改 mutationFn 接收狀態參數
    mutationFn: ({ goalId, isLiked }: { goalId: string; isLiked: boolean }) =>
      FETCH_GOAL.LikeGoal(goalId, isLiked),

    onMutate: async ({ goalId, isLiked }) => {
      await queryClient.cancelQueries({
        queryKey: queryKeys.goals.getUserGoals(),
      });

      const previousGoals = queryClient.getQueryData(
        queryKeys.goals.getUserGoals()
      );

      queryClient.setQueryData(queryKeys.goals.getUserGoals(), (old: any) => {
        if (!old || !old.data) return old;

        return {
          ...old,
          data: {
            ...old.data,
            goals: old.data.goals.map((goal: any) =>
              goal._id === goalId
                ? {
                    ...goal,
                    likeCount: isLiked
                      ? goal.likeCount + 1
                      : goal.likeCount - 1,
                    isLiked: isLiked,
                  }
                : goal
            ),
          },
        };
      });

      return { previousGoals };
    },

    // onError: 當請求失敗時執行
    onError: (err, goalId, context) => {
      // 如果有之前的資料，則回滾到之前的狀態
      if (context?.previousGoals) {
        queryClient.setQueryData(
          queryKeys.goals.getUserGoals(),
          context.previousGoals
        );
      }
      // 顯示錯誤訊息
      handleError(err, "點讚失敗");
    },

    // onSettled: 無論成功失敗都會執行
    onSettled: () => {
      // 重新獲取最新資料，確保與後端同步
      queryClient.invalidateQueries({
        queryKey: queryKeys.goals.getUserGoals(),
      });
    },
  });
};
