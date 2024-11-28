export interface GetUserGoalsParams {
  page?: number;
  limit?: number;
  status?: string;
  sort?: string;
}

export interface GetUserGoalsResponse {
  goals: Goal[];
  pagination: {
    current: number;
    size: number;
    total: number;
  };
  message: string;
}

export interface Goal {
  _id: string;
  title: string;
  description: string;
  status: string;
  startDate: string;
  endDate: string;
  isPublic: boolean;
  likeCount: number;
  progressCommentCount: number;
  commentCount: number;
  user: {
      _id: string;
      username: string;
    avatar: string;
  };
  createdAt: string;
  updatedAt: string;
}
