import { Goal } from "@/components/user/profile/type";

export interface UserProfileResponse {
  message: string;
  user: {
    id: string;
    email?: string;
    avatar?: string;
    isEmailVerified: boolean;
    providers?: Array<'google' | 'line'>;
    goals?: Goal[];
  };
}