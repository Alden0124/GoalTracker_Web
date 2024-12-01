import Dialog from "@/components/common/Dialog";
import { useAppSelector } from "@/hooks/common/useAppReduxs";
import {
  useCreateComment,
  useGetComments,
} from "@/hooks/profile/ProfileGoals/queries/useProfileGoalsQueries";
import { CommentFormData, commentSchema } from "@/schemas/commentSchema";
import { DEFAULT_COMMENTS_PARAMS } from "@/services/api/Profile/ProfileGoals/common";
import { CreateCommentParams } from "@/services/api/Profile/ProfileGoals/type";
import { selectUserProFile } from "@/stores/slice/userReducer";
import { zodResolver } from "@hookform/resolvers/zod";
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
  const userInfo = useAppSelector(selectUserProFile);

  // 新增留言或回覆 API hooks
  const { mutate: createComment, isPending: isCreatingComment } =
    useCreateComment(goalId || "", userInfo.id, {
      ...DEFAULT_COMMENTS_PARAMS,
      type: activeTab,
    });

  // 留言或回覆查詢 API hooks
  const { data: commentsData, isPending: isGetComments } = useGetComments(
    goalId || "",
    {
      ...DEFAULT_COMMENTS_PARAMS,
      type: activeTab,
    }
  );

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

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={`${activeTab === "progress" ? "進度紀錄" : "留言"}`}
      footer={
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="flex-shrink-0 mx-[20px]"
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
      }
      className="!z-0"
    >
      <div className="space-y-4 flex flex-col h-[80vh]">
        {/* 留言列表 */}
        <div className="flex-1">
          <div className="space-y-3">
            {isGetComments ? (
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
