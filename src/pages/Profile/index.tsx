import ProfileGoals from "@/components/Profile/ProfileGoals";
import ProfileInfo from "@/components/Profile/ProfileInfo";
import ProfileSkeleton from "@/components/Profile/ProfileInfo/skeleton/ProfileSkeleton";
import { useProfileData } from "@/hooks/profile/ProfileInfo/useProfile";
import { useEffect } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const { isCurrentUser, isLoading, error, data } = useProfileData();

  // 如果沒有數據，返回上一頁或首頁
  useEffect(() => {
    if (error || !data) {
      if (window.history.length > 1) {
        navigate(-1);
      } else {
        navigate("/");
      }
    }
  }, [error, data, navigate]);

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  if (error || !data) {
    return null;
  }

  return (
    <div className="bg-background-secondaryLight dark:bg-background-secondaryDark">
      <div className="flex flex-col items-center py-[20px] px-[10px] gap-[30px] max-w-[1200px] md:flex-row m-[0_auto] md:items-start">
        <ProfileInfo isCurrentUser={isCurrentUser} userData={data.user} />
        <ProfileGoals isCurrentUser={isCurrentUser} />
      </div>
    </div>
  );
};

export default Profile;
