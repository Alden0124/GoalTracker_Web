import Wrapper from "@/components/common/Wrapper";
import { useState } from "react";
import { UserProfileResponse } from "@/components/user/profile/type";
import ProfileAvatar from "@/components/user/profile/ProfileAvatar";
import ProfileEditDialog from "@/components/user/profile/ProfileEditDialog";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineWork } from "react-icons/md";
import { IoSchoolOutline } from "react-icons/io5";
import renderInfoItem from "./renderInfoItem";
import { GET_COOKIE } from "@/utils/cookies";

interface ProfileInfoProps {
  isCurrentUser: boolean;
  userData: UserProfileResponse;
}

const ProfileInfo = ({ isCurrentUser, userData }: ProfileInfoProps) => {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const { avatar, username, occupation, location, education } = userData;
  const token = GET_COOKIE();

  const canEdit = isCurrentUser && Boolean(token);

  return (
    <Wrapper className="md:px-[50px] md:w-[35%] md:min-h-[550px]">
      {/* 頭像和用戶名區域 */}
      <div className="flex flex-col items-center pb-6">
        <ProfileAvatar avatar={avatar} size={120} />
        <h2 className="mt-4 text-xl font-bold text-foreground-light dark:text-foreground-dark">
          {username}
        </h2>
      </div>

      {/* 操作按鈕區域 */}
      {!isCurrentUser && (
        <div className="flex gap-2 py-4">
          <button className="flex-1 btn-primary">關注</button>
          <button className="flex-1 btn-secondary">發送訊息</button>
        </div>
      )}

      {/* 編輯按鈕 */}
      {canEdit && (
        <div className="flex justify-center">
          <button
            className="w-[200px] btn-secondary"
            onClick={() => setShowEditDialog(true)}
          >
            編輯個人資料
          </button>
        </div>
      )}

      {/* 用戶資訊區域 */}
      <div className="py-10 space-y-5 border-b border-gray-200 dark:border-gray-600">
        {/* 地點 */}
        {renderInfoItem(
          <IoLocationOutline className="text-xl" />,
          location,
          "新增居住地",
          canEdit
        )}

        {/* 職業 */}
        {renderInfoItem(
          <MdOutlineWork className="text-xl" />,
          occupation,
          "新增職稱",
          canEdit
        )}

        {/* 學歷 */}
        {renderInfoItem(
          <IoSchoolOutline className="text-xl" />,
          education,
          "新增學歷",
          canEdit
        )}
      </div>

      {/* 統計數據區域 */}
      <div className="flex justify-around py-4">
        <div className="text-center">
          <div className="text-[30px] font-bold text-foreground-light dark:text-foreground-dark">
            0
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300">粉絲數</div>
        </div>
        <div className="text-center">
          <div className="text-[30px] font-bold text-foreground-light dark:text-foreground-dark">
            0
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300">追蹤者</div>
        </div>
      </div>

      {/* 編輯個人資料彈窗 */}
      {canEdit && (
        <ProfileEditDialog
          isOpen={showEditDialog}
          onClose={() => setShowEditDialog(false)}
          initialData={userData}
        />
      )}
    </Wrapper>
  );
};

export default ProfileInfo;
