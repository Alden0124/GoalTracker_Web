import Dialog from "@/components/common/Dialog";
import { useMinimumLoadingTime } from "@/hooks/common/useMinimumLoadingTime";
import {
  useCreateComment,
  useGetComments,
} from "@/hooks/profile/ProfileGoals/queries/useProfileGoalsQueries";
import { CommentFormData, commentSchema } from "@/schemas/commentSchema";
import { DEFAULT_COMMENTS_PARAMS } from "@/services/api/Profile/ProfileGoals/common";
import { CreateCommentParams } from "@/services/api/Profile/ProfileGoals/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoSend } from "react-icons/io5";
import CommentSkeleton from "../skeleton/CommentSkeleton";
import CommentItem from "./CommentItem";

interface GoalDetailsDialogProps {
  activeTab: "progress" | "comment";
  isOpen: boolean;
  onClose: () => void;
  goalId: string;
  isCurrentUser: boolean;
}

const GoalDetailsDialog = ({
  activeTab,
  isOpen,
  onClose,
  goalId,
  isCurrentUser,
}: GoalDetailsDialogProps) => {
  // 添加回覆相關狀態
  const [isReplying, setIsReplying] = useState(false);
  const [activeCommentId, setActiveCommentId] = useState<string>("");

  // 新增留言或回覆 API hooks
  const { mutate: createComment } = useCreateComment(goalId || "", {
    ...DEFAULT_COMMENTS_PARAMS,
    type: activeTab,
  });

  // 留言或回覆查詢 API hooks
  const { data: commentsData, isLoading } = useGetComments(goalId || "", {
    ...DEFAULT_COMMENTS_PARAMS,
    type: activeTab,
  });

  // 是否顯示骨架
  const isShowingSkeleton = useMinimumLoadingTime(isLoading);

  // 表單初始化&驗證
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema),
  });

  // 提交主留言
  const handleFormSubmit = async (commentContent: CommentFormData) => {
    const params: CreateCommentParams = {
      content: JSON.stringify(commentContent),
      type: activeTab,
    };
    createComment(params);
    reset();
  };

  // 提交回覆
  const onReplySubmit = handleSubmit((data) => {
    const params: CreateCommentParams = {
      content: JSON.stringify(data),
      type: activeTab,
      parentId: activeCommentId,
    };
    createComment(params);
    reset();
    setIsReplying(false);
    setActiveCommentId("");
  });

  // 處理回覆點擊
  const handleReplyClick = (commentId: string) => {
    setIsReplying(true);
    setActiveCommentId(commentId);
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="詳細資訊"
      className="!z-0"
      footer={
        isReplying && (
          <div className="w-[95%] mx-auto">
            <form onSubmit={onReplySubmit}>
              <div className="relative">
                <textarea
                  {...register("content")}
                  placeholder="回覆..."
                  className="w-full p-3 pr-12 border rounded-lg resize-none min-h-[60px] text-foreground-light/80 dark:text-foreground-dark/80 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-background-dark dark:border-gray-700"
                />
                <button
                  type="submit"
                  className="absolute right-3 bottom-3 text-blue-500 hover:text-blue-600 p-1 rounded-full hover:bg-blue-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="發送回覆"
                >
                  <IoSend className="text-xl" />
                </button>
              </div>
              {errors.content && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.content.message}
                </p>
              )}
            </form>
          </div>
        )
      }
    >
      <div className="space-y-4 flex flex-col h-[80vh]">
        {/* 主留言輸入框 */}
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="flex-shrink-0"
        >
          <div className="relative">
            <textarea
              {...register("content")}
              placeholder={`新增${
                activeTab === "progress" ? "進度紀錄" : "留言"
              }...`}
              className={`w-full p-3 pr-12 border rounded-lg resize-none text-foreground-light dark:text-foreground-dark min-h-[80px] max-h-[500px] overflow-y-auto focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-background-dark dark:border-gray-700 ${
                errors.content ? "border-red-500" : ""
              }`}
            />
            <button
              type="submit"
              className="absolute right-3 bottom-3 text-blue-500 hover:text-blue-600 p-1 rounded-full hover:bg-blue-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="發送"
            >
              <IoSend className="text-xl" />
            </button>
          </div>
          {errors.content && (
            <p className="text-red-500 text-sm mt-1">
              {errors.content.message}
            </p>
          )}
        </form>

        {/* 留言列表 */}
        <div className="flex-1 overflow-y-auto">
          <div className="space-y-3">
            {isShowingSkeleton ? (
              <>
                <CommentSkeleton />
                <CommentSkeleton />
                <CommentSkeleton />
              </>
            ) : (
              commentsData?.comments.map((comment) => (
                <div key={comment._id}>
                  <CommentItem
                    comment={comment}
                    goalId={goalId}
                    activeTab={activeTab}
                    isCurrentUser={isCurrentUser}
                    onReplyClick={handleReplyClick}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default GoalDetailsDialog;
