import { GoalFormData } from "@/schemas/goalSchema";
import { FETCH_GOAL } from "@/services/api/Profile/ProfileGoals";
import {
  CreateCommentParams,
  GetCommentsQuery,
  GetUserGoalsParams,
  GoalStatus,
} from "@/services/api/Profile/ProfileGoals/type";
import { handleError } from "@/utils/errorHandler";
import { notification } from "@/utils/notification";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "./queryKeys";

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
      // 如有之前的資料，則回滾到之前的狀態
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

// 創建留言或回覆
export const useCreateComment = (
  goalId: string,
  userId: string,
  query: GetCommentsQuery
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: CreateCommentParams) =>
      FETCH_GOAL.CreateComment(goalId, params),
    onSuccess: (_, variables) => {
      // 重新獲取主留言列表
      queryClient.invalidateQueries({
        queryKey: queryKeys.goals.getComments(goalId, query),
      });
      // 重新獲取用戶的目標列表
      queryClient.invalidateQueries({
        queryKey: queryKeys.goals.getUserGoals(userId),
      });

      // 如果是回覆，同時重新獲取該留言的回覆列表
      if (variables.parentId) {
        queryClient.invalidateQueries({
          queryKey: queryKeys.goals.getReplies(goalId, {
            ...query,
            parentId: variables.parentId,
          }),
        });
      }
    },
  });
};

// 獲取留言列表
export const useGetComments = (goalId: string, query: GetCommentsQuery) => {
  return useQuery({
    queryKey: queryKeys.goals.getComments(goalId, query),
    queryFn: () => FETCH_GOAL.GetComments(goalId, query),
    enabled: !!goalId,
    staleTime: 0, // 立即將數據標記為過期
  });
};

// 獲取回覆列表
export const useGetReplies = (
  goalId: string,
  query: GetCommentsQuery,
  options?: { enabled?: boolean }
) => {
  return useQuery({
    queryKey: queryKeys.goals.getReplies(goalId, query),
    queryFn: () => FETCH_GOAL.GetComments(goalId, query),
    enabled: !!goalId && (options?.enabled ?? false), // 默認為 false，除非明確啟用
    staleTime: 0, // 立即將數據標記為過期
  });
};

// 更新留言或回覆
export const useUpdateComment = (goalId: string, query: GetCommentsQuery) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      commentId,
      content,
    }: {
      commentId: string;
      content: string;
    }) => FETCH_GOAL.UpdateComment(commentId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.goals.getComments(goalId, query),
      });
    },
    onError: (error: any) => {
      handleError(error, "留言或回覆更新失敗");
    },
  });
};

// 刪除留言或回覆
export const useDeleteComment = (
  goalId: string,
  userId: string,
  query: GetCommentsQuery
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ commentId }: { commentId: string; parentId?: string }) =>
      FETCH_GOAL.DeleteComment(commentId),
    onSuccess: (_, variables) => {
      // 重新獲取主留言列表
      queryClient.invalidateQueries({
        queryKey: queryKeys.goals.getComments(goalId, query),
      });

      // 重新獲取用戶的目標列表
      queryClient.invalidateQueries({
        queryKey: queryKeys.goals.getUserGoals(userId),
      });

      // 如果是回覆，重新獲取特定父留言的回覆列表
      if (variables.parentId) {
        queryClient.invalidateQueries({
          queryKey: queryKeys.goals.getReplies(goalId, {
            ...query,
            parentId: variables.parentId,
          }),
        });
      }
    },
    onError: (error: any) => {
      handleError(error, "留言或回覆刪除失敗");
    },
  });
};
