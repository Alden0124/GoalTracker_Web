export interface UserProfileResponse {
  message: string;
  user: {
    id: string;
    email?: string;
    avatar?: string;
    isEmailVerified: boolean;
    providers?: Array<'google' | 'line'>;
  };
}