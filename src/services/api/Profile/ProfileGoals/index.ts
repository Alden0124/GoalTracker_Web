import axiosInstance from "@/services/axiosInstance";
import { GoalFormData } from "@/schemas/goalSchema";

export const FETCH_GOAL = {
  CreateGoal: (formData: GoalFormData) =>
    axiosInstance.post(`/goals/createGoal`, formData),
};
