import { IoSend } from "react-icons/io5";
import { Goal as GoalType } from "@/services/api/Profile/ProfileGoals/type";

interface GoalDetailsDialogProps {
  activeTab: "progress" | "comments";
  setActiveTab: (tab: "progress" | "comments") => void;
  goal: GoalType;
}

const GoalDetailsDialog = ({ activeTab, setActiveTab, goal }: GoalDetailsDialogProps) => {
  return (
    <div className="space-y-4">
      {/* Tab 切換 */}
      <div className="flex bg-gray-50 dark:bg-gray-800 rounded-lg">
        <button
          className={`flex-1 py-2 text-center rounded-lg ${
            activeTab === "progress"
              ? "bg-blue-500 text-white"
              : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          }`}
          onClick={() => setActiveTab("progress")}
        >
          進度記錄
        </button>
        <button
          className={`flex-1 py-2 text-center rounded-lg ${
            activeTab === "comments"
              ? "bg-blue-500 text-white"
              : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          }`}
          onClick={() => setActiveTab("comments")}
        >
          留言
        </button>
      </div>

      {/* 輸入框 */}
      <div className="relative">
        <textarea
          placeholder={`新增${activeTab === "progress" ? "進度紀錄" : "留言"}...`}
          className="w-full p-3 pr-12 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-background-dark dark:border-gray-700"
          rows={4}
        />
        <button
          className="absolute right-3 bottom-3 text-blue-500 hover:text-blue-600 p-1 rounded-full hover:bg-blue-50 dark:hover:bg-gray-700"
          aria-label="發送"
        >
          <IoSend className="text-xl" />
        </button>
      </div>

      {/* 歷史記錄列表 */}
      <div className="space-y-3">
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="border-t dark:border-gray-700 pt-3">
            <div className="flex gap-2">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex-shrink-0" />
              <div className="flex-1">
                <div>
                  <p className="text-foreground-light dark:text-foreground-dark">
                    {activeTab === "progress"
                      ? "本週已完成2次運動"
                      : "加油！繼續保持"}
                  </p>
                  <p className="text-sm text-gray-500">2023-05-18 21:30</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GoalDetailsDialog; 