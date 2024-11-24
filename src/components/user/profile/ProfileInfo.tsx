import Wrapper from "@/components/common/Wrapper";
import { useState } from "react";
import { UserProfileResponse } from "@/components/user/profile/type";
import ProfileAvatar from "@/components/user/profile/ProfileAvatar";
import ProfileEditDialog from "@/components/user/profile/ProfileEditDialog";

interface ProfileInfoProps {
  isCurrentUser: boolean;
  userData: UserProfileResponse;
}

const ProfileInfo = ({ isCurrentUser, userData }: ProfileInfoProps) => {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const { avatar, username, email } = userData;

  return (
    <Wrapper className="md:w-[40%] md:min-h-[550px]">
      <div className="flex flex-col justify-center items-center gap-[10px]">
        {/* 頭像顯示 */}
        <ProfileAvatar avatar={avatar} />
   
        {/* 用戶信息 */}
        <div className="text-center">
          <h2 className="text-xl font-bold">{username}</h2>
          {isCurrentUser && <p className="text-gray-500">{email}</p>}
        </div>

        {/* 編輯按鈕只在當前用戶的頁面顯示 */}
        {isCurrentUser && (
          <button 
            className="btn-primary mt-4"
            onClick={() => setShowEditDialog(true)}
          >
            編輯個人資料
          </button>
        )}
      </div>

      {/* 編輯個人資料彈窗 */}
      <ProfileEditDialog
        isOpen={showEditDialog}
        onClose={() => setShowEditDialog(false)}
        initialData={userData}
      />
    </Wrapper>
  );
};

export default ProfileInfo;