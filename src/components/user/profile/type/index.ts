

// 更新個人資料
export interface UpdateProfileRequest {
  username: string;
  email: string;
}

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

export interface GoalFormData {
  title: string;
  description: string;
  startDate: string;
  endDate?: string;
}

// 創建目標
export interface CreateGoalRequest extends GoalFormData {}

// 更新目標
export interface UpdateGoalRequest extends Partial<GoalFormData> {
  progress?: number;
  status?: Goal['status'];
}

// 粉絲/追蹤列表
export interface FollowList {
  id: string;
  username: string;
  avatar: string;
}