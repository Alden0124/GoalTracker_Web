import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { goalSchema } from "@/schemas/goalSchema";
import type { GoalFormData } from "@/components/user/profile/type";
import Input from "@/components/ui/Input";
import Dialog from "@/components/common/Dialog";

interface AddGoalDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: GoalFormData) => void;
}

const AddGoalDialog = ({ isOpen, onClose, onSubmit }: AddGoalDialogProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<GoalFormData>({
    resolver: zodResolver(goalSchema)
  });

  const handleFormSubmit = async (data: GoalFormData) => {
    await onSubmit(data);
    reset();
    onClose();
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="新增目標">
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <Input
          {...register("title")}
          label="目標標題"
          error={errors.title?.message}
        />
        
        <Input
          {...register("description")}
          label="目標描述"
          type="textarea"
          error={errors.description?.message}
        />

        <Input
          {...register("startDate")}
          label="開始日期"
          type="date"
          error={errors.startDate?.message}
        />

        <Input
          {...register("endDate")}
          label="預計完成日期"
          type="date"
          error={errors.endDate?.message}
        />

        <div className="flex justify-end gap-2">
          <button 
            type="button"
            onClick={onClose}
            className="btn-secondary"
          >
            取消
          </button>
          <button 
            type="submit"
            className="btn-primary"
            disabled={isSubmitting}
          >
            確認新增
          </button>
        </div>
      </form>
    </Dialog>
  );
};

export default AddGoalDialog;