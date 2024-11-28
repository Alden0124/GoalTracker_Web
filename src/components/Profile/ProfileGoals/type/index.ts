import { GoalFormData } from "@/schemas/goalSchema";

// 目標
export interface Goal {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate?: string;
  progress: number;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  userId: string;
  createdAt: string;
  updatedAt: string;
}

// 更新目標
export interface UpdateGoalRequest extends Partial<GoalFormData> {
  progress?: number;
  status?: Goal['status'];
}