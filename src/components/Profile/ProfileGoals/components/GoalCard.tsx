import { useState } from 'react';
import { Goal } from '../type';
import { formatDate } from '@/utils/dateFormat';

interface GoalCardProps {
  goal: Goal;
  isCurrentUser: boolean;
}

const GoalCard = ({ goal, isCurrentUser }: GoalCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const statusMap = {
    pending: '待開始',
    in_progress: '進行中',
    completed: '已完成',
    cancelled: '已取消'
  };

  const statusColorMap = {
    pending: 'bg-gray-500',
    in_progress: 'bg-blue-500',
    completed: 'bg-green-500',
    cancelled: 'bg-red-500'
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold dark:text-white">{goal.title}</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            開始日期: {formatDate(goal.startDate)}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 rounded-full text-white text-sm ${statusColorMap[goal.status]}`}>
            {statusMap[goal.status]}
          </span>
          {isCurrentUser && (
            <button 
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? '收起' : '展開'}
            </button>
          )}
        </div>
      </div>

      {/* 進度條 */}
      <div className="mt-4">
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div 
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${goal.progress}%` }}
          />
        </div>
        <span className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          進度: {goal.progress}%
        </span>
      </div>

      {/* 展開後顯示的內容 */}
      {isExpanded && (
        <div className="mt-4 space-y-2">
          <p className="text-gray-600 dark:text-gray-300">{goal.description}</p>
          {goal.endDate && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              預計完成日期: {formatDate(goal.endDate)}
            </p>
          )}
          {isCurrentUser && (
            <div className="flex justify-end gap-2 mt-4">
              <button className="btn-secondary text-sm">編輯</button>
              <button className="btn-danger text-sm">刪除</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GoalCard;