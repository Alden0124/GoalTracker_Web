import { useState } from "react";
import { Goal } from "@/services/api/Profile/ProfileGoals/type";
import { formatDate } from "@/utils/dateFormat";

interface GoalCardProps {
  goal: Goal;
  isCurrentUser: boolean;
}

const GoalCard = ({ goal, isCurrentUser }: GoalCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const statusMap = {
    pending: "待開始",
    in_progress: "進行中",
    completed: "已完成",
    cancelled: "已取消",
  };

  const statusColorMap = {
    pending: "bg-gray-500",
    in_progress: "bg-blue-500",
    completed: "bg-green-500",
    cancelled: "bg-red-500",
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-medium dark:text-white">{goal.title}</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            保持身體健康
          </p>
        </div>
        <button className="ml-4 text-gray-400 hover:text-gray-600">...</button>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <span className="text-gray-500 dark:text-gray-400 text-sm">
          開始時間：{formatDate(goal.startDate)}
        </span>
      </div>

      {/* 按鈕區域 - 改為並排 */}
      <div className="flex gap-4 mb-4">
        <button className="flex-1 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors">
          進度記錄
        </button>
        <button className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors">
          留言
        </button>
      </div>

      <div className="flex items-center">
        <div className="flex items-center">
          <span className="text-gray-400 mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          <span className="text-gray-500">2</span>
        </div>
        <div className="flex items-center ml-4">
          <span className="text-gray-400 mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          <span className="text-gray-500">1 則留言</span>
        </div>
      </div>
    </div>
  );
};

export default GoalCard;
