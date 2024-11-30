import {
  useDeleteComment,
  useGetReplies,
  useUpdateComment,
} from "@/hooks/profile/ProfileGoals/queries/useProfileGoalsQueries";
import { CommentFormData, commentSchema } from "@/schemas/commentSchema";
import { DEFAULT_COMMENTS_PARAMS } from "@/services/api/Profile/ProfileGoals/common";
import { Comment } from "@/services/api/Profile/ProfileGoals/type";
import { formatDate, formatTime } from "@/utils/dateFormat";
import { notification } from "@/utils/notification";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FiEdit2, FiMoreVertical, FiTrash2 } from "react-icons/fi";
import { IoSend } from "react-icons/io5";
import CommentAvater from "../../ProfileInfo/components/CommentAvater";

interface CommentItemProps {
  comment: Comment;
  goalId: string;
  activeTab: "progress" | "comment";
  isCurrentUser: boolean;
  onReplyClick: (commentId: string) => void;
}

const CommentItem = ({
  comment,
  goalId,
  activeTab,
  isCurrentUser,
  onReplyClick,
}: CommentItemProps) => {
  // 顯示選單
  const [showMenu, setShowMenu] = useState(false);
  // 編輯狀態
  const [isEditing, setIsEditing] = useState(false);
  // 編輯內容
  const [editContent, setEditContent] = useState(
    JSON.parse(comment.content).content
  );
  // 選單參考
  const menuRef = useRef<HTMLDivElement>(null);
  // 文字框參考
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [showReplies, setShowReplies] = useState(false);

  // 獲取回覆列表 API hooks
  const { data: repliesData, isLoading: isRepliesLoading } = useGetReplies(
    goalId,
    {
      ...DEFAULT_COMMENTS_PARAMS,
      parentId: comment._id,
      type: activeTab,
    },
    {
      enabled: showReplies,
    }
  );

  // 更新留言或回覆 API hooks
  const { mutate: updateComment } = useUpdateComment(goalId, {
    ...DEFAULT_COMMENTS_PARAMS,
    // parentId: comment._id,
    type: activeTab,
  });

  // 刪除留言或回覆 API hooks
  const { mutate: deleteComment } = useDeleteComment(goalId, {
    ...DEFAULT_COMMENTS_PARAMS,
    type: activeTab,
  });

  // 表單初始化&驗證
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema),
  });

  // 自動調整文字框高度
  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [isEditing, editContent]);

  // 點擊外部關閉選單
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 編輯點擊
  const handleEditClick = () => {
    setIsEditing(true);
    setShowMenu(false);
  };

  // 取消編輯
  const handleCancel = () => {
    setIsEditing(false);
    setEditContent(JSON.parse(comment.content).content);
  };

  // 提交編輯
  const handleEdit = () => {
    updateComment({
      commentId: comment._id,
      content: JSON.stringify({ content: editContent }),
    });
    setIsEditing(false);
  };

  // 刪除留言或回覆
  const handleDelete = async () => {
    // const confirm = window.confirm("確定要刪除這則留言嗎？");
    const confirm = await notification.confirm({
      title: "確定要刪除這則留言嗎？",
      target: "#portal-dialog > div", // 指向 dialog 內的容器元素
    });
    if (confirm.isConfirmed) {
      deleteComment(comment._id);
    }
    setShowMenu(false);
  };

  // 點擊回覆
  const handleReplyClick = () => {
    if (comment.replyCount > 0) {
      setShowReplies(!showReplies);
    }
    onReplyClick(comment._id);
  };

  return (
    <>
      <div>
        {/* 留言 */}
        <div className="border-t dark:border-gray-700 pt-3">
          <div className="flex gap-2">
            <CommentAvater avatar={comment.user.avatar} size={40} />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div className="w-full">
                  {isEditing ? (
                    <div>
                      <div className="relative">
                        <textarea
                          ref={textareaRef}
                          value={editContent}
                          onChange={(e) => setEditContent(e.target.value)}
                          className="w-full p-2 pr-12 border rounded-lg overflow-hidden resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-background-dark dark:border-gray-700 dark:text-foreground-dark"
                          rows={1}
                        />
                        <div className="absolute right-2 bottom-2 flex gap-2">
                          <button
                            onClick={handleCancel}
                            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                          >
                            取消
                          </button>
                          <button
                            onClick={handleEdit}
                            className="text-blue-500 hover:text-blue-600"
                          >
                            <IoSend className="text-xl" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-foreground-light dark:text-foreground-dark whitespace-pre-wrap">
                      {JSON.parse(comment.content).content}
                    </p>
                  )}

                  {!comment.parentId ? (
                    <div className="flex gap-2">
                      <p className="text-sm text-gray-500 break-keep">
                        {formatDate(comment.createdAt)}{" "}
                        {formatTime(comment.createdAt)}
                      </p>
                      <button
                        type="button"
                        onClick={handleReplyClick}
                        className="text-sm break-keep text-gray-500 hover:text-foreground-light/80 dark:hover:text-foreground-dark/80"
                      >
                        {comment.replyCount
                          ? `${comment.replyCount} 則回覆`
                          : "回覆"}
                      </button>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 break-keep">
                      {formatDate(comment.createdAt)}{" "}
                      {formatTime(comment.createdAt)}
                    </p>
                  )}
                </div>

                {/* 當前用戶且不是編輯狀態時顯示選單 */}
                {isCurrentUser && !isEditing && (
                  <div className="relative" ref={menuRef}>
                    <button
                      type="button"
                      onClick={() => setShowMenu(!showMenu)}
                      className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                    >
                      <FiMoreVertical className="text-gray-500" />
                    </button>

                    {showMenu && (
                      <div className="absolute right-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-10">
                        <button
                          onClick={handleEditClick}
                          className="flex items-center w-full px-4 py-2 text-sm gap-2 text-foreground-light/80 dark:text-foreground-dark/80 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <FiEdit2 />
                          編輯
                        </button>
                        <button
                          onClick={handleDelete}
                          className="flex items-center w-full px-4 py-2 text-sm gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-red-500"
                        >
                          <FiTrash2 />
                          刪除
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 顯示回覆列表 */}
        {showReplies && repliesData && (
          <div className="mt-2 ml-12">
            {repliesData.comments.map((reply) => (
              <CommentItem
                key={reply._id}
                comment={reply}
                goalId={goalId}
                activeTab={activeTab}
                isCurrentUser={isCurrentUser}
                onReplyClick={onReplyClick}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default CommentItem;
