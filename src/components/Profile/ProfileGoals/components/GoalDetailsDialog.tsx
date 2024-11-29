import Dialog from "@/components/common/Dialog";
import { useMinimumLoadingTime } from "@/hooks/common/useMinimumLoadingTime";
import {
  useCreateComment,
  useGetComments,
} from "@/hooks/profile/ProfileGoals/queries/useProfileGoalsQueries";
import { CommentFormData, commentSchema } from "@/schemas/commentSchema";
import {
  CreateCommentParams,
  GetCommentsQuery,
} from "@/services/api/Profile/ProfileGoals/type";
import { formatDate, formatTime } from "@/utils/dateFormat";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { IoSend } from "react-icons/io5";
import CommentAvater from "../../ProfileInfo/components/CommentAvater";
import CommentSkeleton from "../skeleton/CommentSkeleton";

interface GoalDetailsDialogProps {
  activeTab: "progress" | "comment";
  isOpen: boolean;
  onClose: () => void;
  isPending?: boolean;
  goalId: string;
}

const GoalDetailsDialog = ({
  activeTab,
  isOpen,
  onClose,
  isPending = false,
  goalId,
}: GoalDetailsDialogProps) => {
  // 留言或回覆查詢配置
  const commentConfig: GetCommentsQuery = {
    page: 1,
    limit: 10,
    parentId: "",
    type: activeTab,
  };

  const { mutate: createComment } = useCreateComment(
    goalId || "",
    commentConfig
  );
  const { data: commentsData, isLoading } = useGetComments(
    goalId || "",
    commentConfig
  );

  // 使用自定義 hook 處理最小加載時間
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

  // 提交表單
  const handleFormSubmit = async (comment: CommentFormData) => {
    const params: CreateCommentParams = {
      content: JSON.stringify(comment),
      type: activeTab,
      parentId: "",
    };
    createComment(params);
    reset();
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="詳細資訊">
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        {/* 輸入框 */}
        <div className="relative">
          <textarea
            {...register("content")}
            placeholder={`新增${
              activeTab === "progress" ? "進度紀錄" : "留言"
            }...`}
            className={`w-full p-3 pr-12 border rounded-lg resize-none min-h-[80px] max-h-[500px] overflow-y-auto focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-background-dark dark:border-gray-700 ${
              errors.content ? "border-red-500" : ""
            }`}
          />
          <button
            type="submit"
            disabled={isPending}
            className="absolute right-3 bottom-3 text-blue-500 hover:text-blue-600 p-1 rounded-full hover:bg-blue-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="發送"
          >
            <IoSend className="text-xl" />
          </button>
          {errors.content && (
            <p className="text-red-500 text-sm mt-1">
              {errors.content.message}
            </p>
          )}
        </div>

        {/* 歷史記錄列表 */}
        <div className="space-y-3">
          {isShowingSkeleton ? (
            <>
              <CommentSkeleton />
              <CommentSkeleton />
              <CommentSkeleton />
            </>
          ) : (
            commentsData?.comments.map((comment) => (
              <div
                key={comment._id}
                className="border-t dark:border-gray-700 pt-3"
              >
                <div className="flex gap-2">
                  <CommentAvater avatar={comment.user.avatar} size={40} />
                  <div className="flex-1">
                    <div>
                      <p className="text-foreground-light dark:text-foreground-dark whitespace-pre-wrap">
                        {JSON.parse(comment.content).content}
                      </p>
                      <p className="text-sm text-gray-500">
                        {formatDate(comment.createdAt)}{" "}
                        {formatTime(comment.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </form>
    </Dialog>
  );
};

export default GoalDetailsDialog;
