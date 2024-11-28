import { useState } from "react";
import Wrapper from "@/components/common/Wrapper";
import AddGoalDialog from "@/components/Profile/ProfileGoals/components/AddGoalDialog";
import GoalCard from "@/components/Profile/ProfileGoals/components/GoalCard";
import { GoalFormData } from "@/schemas/goalSchema";
import { Goal } from "./type";
import { useCreateGoal } from "@/hooks/profile/ProfileGoals/queries/useProfileGoalsQueries";


interface ProfileGoalsProps {
  isCurrentUser: boolean;
  goals: Goal[];
}

const ProfileGoals = ({ isCurrentUser, goals }: ProfileGoalsProps) => {
  const [showAddGoalDialog, setShowAddGoalDialog] = useState(false);
  // const { mutate: createGoal } = useCreateGoal();

  const handleAddGoal = (data: GoalFormData) => {
    // 處理新增目標邏輯
    setShowAddGoalDialog(false);
    console.log("GoalFormData", data);
    // createGoal(data);
  };

  return (
    <Wrapper className="md:w-[60%] md:min-h-[550px]">
      <div className="flex flex-col gap-4">
        {/* 標題區域 */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl text-foreground-light dark:text-foreground-dark font-bold">
            目標列表
          </h2>
          {/* 新增目標按鈕只在當前用戶的頁面顯示 */}
          {isCurrentUser && (
            <button
              className="btn-primary"
              onClick={() => setShowAddGoalDialog(true)}
            >
              新增目標
            </button>
          )}
        </div>

        {/* 目標列表 */}
        <div className="space-y-4">
          {goals.map((goal) => (
            <GoalCard key={goal.id} goal={goal} isCurrentUser={isCurrentUser} />
          ))}
        </div>

        {/* 新增目標對話框 */}
        <AddGoalDialog
          isOpen={showAddGoalDialog}
          onClose={() => setShowAddGoalDialog(false)}
          onSubmit={handleAddGoal}
        />
      </div>
    </Wrapper>
  );
};

export default ProfileGoals;
