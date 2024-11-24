export interface UserProfileResponse {
  id: string;
  username?: string;
  email?: string;
  avatar?: string;
  location?: string;
  occupation?: string;
  education?: string;
  isEmailVerified: boolean;
  providers?: Array<"google" | "line">;
  goals?: Goal[];
}

export interface UpdateProfileRequest {
  username: string;
  email: string;
}

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

export interface CreateGoalRequest extends GoalFormData {}

export interface UpdateGoalRequest extends Partial<GoalFormData> {
  progress?: number;
  status?: Goal['status'];
}