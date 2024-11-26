import Dialog from "@/components/common/Dialog";
import { IoPersonOutline } from "react-icons/io5";
import { FollowList } from "./type";
import FollowListDialogSkeleton from "./skeleton/FollowListDialogSkeleton";
interface FollowListDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  followers: FollowList[];
  isLoading: boolean;
}

const FollowListDialog = ({
  isOpen,
  onClose,
  title,
  followers,
  isLoading,
}: FollowListDialogProps) => {
  return (
    <Dialog isOpen={isOpen} onClose={onClose} title={title}>
      {isLoading ? (
        <FollowListDialogSkeleton />
      ) : followers.length > 0 ? (
        <div className="space-y-4">
          {followers.map((follower) => (
            <div key={follower.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={follower.avatar || "/default-avatar.png"}
                  alt={follower.username}
                  className="w-10 h-10 rounded-full"
                />
                <span className="font-medium">{follower.username}</span>
              </div>
              <button className="text-blue-500 hover:text-blue-600">
                移除
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-10 text-gray-500">
          <IoPersonOutline className="text-4xl mb-2" />
          <p>目前還沒有{title}</p>
        </div>
      )}
    </Dialog>
  );
};

export default FollowListDialog;
