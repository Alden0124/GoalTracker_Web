import axiosInstance from "@/services/axiosInstance";
import { GoalFormData } from "@/schemas/goalSchema";
import { GetUserGoalsParams, GetUserGoalsResponse } from "./type";

export const FETCH_GOAL = {
  // 創建目標
  CreateGoal: (formData: GoalFormData) =>
    axiosInstance.post(`/goals/createGoal`, formData),

  // 獲取指定用戶的目標列表
  GetUserGoals: (
    userId: string,
    params: GetUserGoalsParams
  ): Promise<GetUserGoalsResponse> =>
    axiosInstance.get(`/goals/user/${userId}`, {
      params: {
        page: params.page,
        limit: params.limit,
        status: params.status,
        sort: params.sort
      }
    }),
};
