import { useProfileData } from "@/hooks/profile/useProfile";
import ProfileInfo from "@/components/user/profile/ProfileInfo";
import ProfileGoals from "@/components/user/profile/ProfileGoals";

const Profile = () => {
  const { isCurrentUser, isLoading, error, data } = useProfileData();

  if (isLoading) {
    return <div>載入中...</div>;
  }

  if (error || !data) {
    return <div>無法載入用戶資料</div>;
  }

  return (
    <div className="md:min-h-[calc(100vh-64px)] bg-background-secondaryLight dark:bg-background-secondaryDark">
      <div className="flex flex-col items-center py-[20px] px-[10px] gap-[30px] max-w-[1200px] md:flex-row m-[0_auto] md:items-start">
        {/* 個人資料區塊 */}
        <ProfileInfo isCurrentUser={isCurrentUser} userData={data.user} />

        {/* 目標列表區塊 */}
        <ProfileGoals
          isCurrentUser={isCurrentUser}
          goals={data.user.goals || []}
        />
      </div>
    </div>
  );
};

export default Profile;
