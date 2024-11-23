import { useState, useRef, useEffect } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { IoSend } from "react-icons/io5";
import Dialog from "../Dialog";
interface GoalProps {
  title: string;
  progress: number;
  description: string;
}

const Goal = ({ title, description }: GoalProps) => {
  const [activeTab, setActiveTab] = useState<"progress" | "comments">(
    "progress"
  );
  const [showMenu, setShowMenu] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const renderContent = (isDialog: boolean) => (
    <div className="space-y-4">
      {/* Tab 切換 */}
      <div className="flex bg-gray-50 dark:bg-gray-800 rounded-lg">
        <button
          className={`flex-1 py-2 text-center rounded-lg ${
            activeTab === "progress"
              ? "bg-blue-500 text-white"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("progress")}
        >
          進度記錄
        </button>
        <button
          className={`flex-1 py-2 text-center rounded-lg ${
            activeTab === "comments"
              ? "bg-blue-500 text-white"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("comments")}
        >
          留言
        </button>
      </div>

      {/* 記錄內容 - 只在 Dialog 中顯示 */}
      {isDialog && (
        <div className="space-y-4">
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
                        {activeTab === "progress" ? "本週已完成2次運動" : "加油！繼續保持"}
                      </p>
                      <p className="text-sm text-gray-500">2023-05-18 21:30</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      <div className="bg-white dark:bg-background-dark rounded-lg p-5 space-y-4">
        {/* 標題和描述 */}
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-medium text-foreground-light dark:text-foreground-dark">
              {title}
            </h3>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
            >
              <BsThreeDots className="text-xl text-gray-500" />
            </button>

            {/* 下拉選單 */}
            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border dark:border-gray-700 z-10">
                <div className="py-1">
                  <button
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-foreground-light dark:text-foreground-dark"
                    onClick={() => {
                      // 處理完成狀態
                      setShowMenu(false);
                    }}
                  >
                    標記為完成
                  </button>
                  <button
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-foreground-light dark:text-foreground-dark"
                    onClick={() => {
                      // 處理未完成狀態
                      setShowMenu(false);
                    }}
                  >
                    標記為未完成
                  </button>
                  <button
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-foreground-light dark:text-foreground-dark"
                    onClick={() => {
                      // 處理編輯功能
                      setShowMenu(false);
                    }}
                  >
                    編輯目標
                  </button>
                  <button
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-red-500"
                    onClick={() => {
                      // 處理刪除功能
                      setShowMenu(false);
                    }}
                  >
                    刪除目標
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* 在非 Dialog 時只顯示 Tab */}
        {!showDialog && renderContent(false)}

        {/* 底部操作欄 */}
        <div className="flex justify-between items-center pt-2 border-t dark:border-gray-700">
          <div className="flex gap-6">
            <button className="text-gray-500 hover:text-gray-700 flex items-center gap-1">
              <AiOutlineHeart className="text-lg" />
              <span>2</span>
            </button>
            <button 
              className="text-gray-500 hover:text-gray-700 flex items-center gap-1"
              onClick={() => {
                setShowDialog(true);
                setActiveTab("comments");
              }}
            >
              <FaRegComment className="text-lg" />
              <span>1 則留言</span>
            </button>
          </div>
        </div>
      </div>

      <Dialog 
        isOpen={showDialog} 
        onClose={() => setShowDialog(false)}
        title={title}
      >
        {renderContent(true)}
      </Dialog>
    </>
  );
};

export default Goal;
