import { Goal } from "@/components/user/profile/type";
import { FollowList } from "@/components/user/profile/type";
export interface UserProfileResponse {
  followers: any;
  message: string;
  user: {
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
    isFollowing?: boolean;
    followersCount?: number;
    followingCount?: number;
    followers?: FollowList[];
    following?: FollowList[];
  };
}
