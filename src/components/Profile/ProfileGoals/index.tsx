import { useState } from "react";
import { useParams } from "react-router-dom";
import Wrapper from "@/components/common/Wrapper";
import GoalFormDialog from "@/components/Profile/ProfileGoals/components/GoalFormDialog";
import { GoalFormData } from "@/schemas/goalSchema";
import {
  useCreateGoal,
  useGetUserGoals,
} from "@/hooks/profile/ProfileGoals/queries/useProfileGoalsQueries";
import { GetUserGoalsParams } from "@/services/api/Profile/ProfileGoals/type";
import GoalList from "./components/GoalList";

interface ProfileGoalsProps {
  isCurrentUser: boolean;
}

const ProfileGoals = ({ isCurrentUser }: ProfileGoalsProps) => {
  const [showGoalDialog, setShowGoalDialog] = useState(false);
  const { mutate: createGoal, isPending: isCreatePending } = useCreateGoal();
  const { id: userId } = useParams();

  // 設置分頁參數
  const params: GetUserGoalsParams = {
    page: 1,
    limit: 10,
    sort: "-createdAt",
    status: "",
  };

  // 獲取用戶的目標列表
  const { data: userGoals, isLoading } = useGetUserGoals(userId || "", params);

  // 新增目標
  const handleSubmit = (data: GoalFormData) => {
    createGoal(data);
  };

  return (
    <Wrapper className="md:w-[60%] !min-h-[600px] bg-transparent !p-0 border-none">
      <div className="h-full flex flex-col gap-4">
        {/* 標題區域 */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl text-foreground-light dark:text-foreground-dark font-bold">
            目標列表
          </h2>
          {/* 新增目標按鈕只在當前用戶的頁面顯示 */}
          {isCurrentUser && (
            <button
              className="btn-primary"
              onClick={() => setShowGoalDialog(true)}
            >
              新增目標
            </button>
          )}
        </div>

        {/* 目標列表 */}
        <div className="h-full space-y-4">
          {userGoals && userGoals?.goals.length > 0 ? (
            <GoalList goals={userGoals.goals} isCurrentUser={isCurrentUser} />
          ) : (
            <div className="h-full flex flex-col items-center justify-center py-8 text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <p className="text-lg font-medium">目前還沒有設定任何目標</p>
              {isCurrentUser && (
                <p className="mt-2">
                  點擊上方「新增目標」按鈕開始設定你的目標吧！
                </p>
              )}
            </div>
          )}
        </div>

        {/* 新增目標對話框 */}
        <GoalFormDialog
          isOpen={showGoalDialog}
          isPending={isCreatePending}
          onClose={() => setShowGoalDialog(false)}
          onSubmit={handleSubmit}
        />
      </div>
    </Wrapper>
  );
};

export default ProfileGoals;
