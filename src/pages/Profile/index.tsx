import { useProfileData } from "@/hooks/profile/ProfileInfo/useProfile";
import ProfileInfo from "@/components/Profile/ProfileInfo";
import ProfileGoals from "@/components/Profile/ProfileGoals";
import { useNavigate } from "react-router-dom";
import "react-loading-skeleton/dist/skeleton.css";
import ProfileSkeleton from "@/components/Profile/ProfileInfo/skeleton/ProfileSkeleton";

const Profile = () => {
  const navigate = useNavigate();
  const { isCurrentUser, isLoading, error, data } = useProfileData();

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  if (error || !data) {
    navigate(-1);
    return null;
  }

  return (
    <div className=" bg-background-secondaryLight dark:bg-background-secondaryDark">
      <div className=" flex flex-col items-center py-[20px] px-[10px] gap-[30px] max-w-[1200px] md:flex-row m-[0_auto] md:items-start">
        {/* 個人資料區塊 */}
        <ProfileInfo isCurrentUser={isCurrentUser} userData={data.user} />

        {/* 目標列表區塊 */}
        <ProfileGoals
          isCurrentUser={isCurrentUser}
        />
      </div>
    </div>
  );
};

export default Profile;
