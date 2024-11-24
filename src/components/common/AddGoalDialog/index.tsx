import { useState } from "react";
import Dialog from "../Dialog";

interface AddGoalDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: {
    title: string;
    description: string;
    startDate: string;
  }) => void;
}

const AddGoalDialog = ({ isOpen, onClose, onConfirm }: AddGoalDialogProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");

  const handleSubmit = () => {
    if (!title || !startDate) return;
    onConfirm({ title, description, startDate });
    onClose();
    // 清空表單
    setTitle("");
    setDescription("");
    setStartDate("");
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="新增目標">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground-light dark:text-foreground-dark mb-1">
            主標題
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-background-dark dark:border-gray-700 dark:text-foreground-dark"
            placeholder="請輸入目標主標題"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground-light dark:text-foreground-dark mb-1">
            副標題
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-background-dark dark:border-gray-700 dark:text-foreground-dark"
            placeholder="請輸入目標副標題"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground-light dark:text-foreground-dark mb-1">
            開始時間
          </label>
          <div 
            className="relative"
            onClick={() => {
              const dateInput = document.getElementById('startDate') as HTMLInputElement;
              if (dateInput) {
                dateInput.showPicker();
              }
            }}
          >
            <input
              id="startDate"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-background-dark dark:border-gray-700 dark:text-foreground-dark cursor-pointer [&::-webkit-calendar-picker-indicator]:dark:invert"
            />
            <div className="absolute inset-0" />
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            取消
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-sm text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:opacity-50"
            disabled={!title || !startDate}
          >
            確認新增
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default AddGoalDialog;
