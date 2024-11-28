import { Goal as GoalType } from "@/services/api/Profile/ProfileGoals/type";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { goalSchema, GoalFormData } from "@/schemas/goalSchema";
import Input from "@/components/ui/Input";
import { useUpdateGoal } from "@/hooks/profile/ProfileGoals/queries/useProfileGoalsQueries";

interface UpdateGoalDialogProps {
  goal: GoalType;
  onClose: () => void;
}

const UpdateGoalDialog = ({ goal, onClose }: UpdateGoalDialogProps) => {
  const { mutate: updateGoal } = useUpdateGoal();
  
  const formatDateForInput = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GoalFormData>({
    resolver: zodResolver(goalSchema),
    defaultValues: {
      title: goal?.title || '',
      description: goal?.description || '',
      startDate: formatDateForInput(goal?.startDate || ''),
      endDate: formatDateForInput(goal?.endDate || ''),
      isPublic: goal?.isPublic || false,
    }
  });

  const onSubmit = (data: GoalFormData) => {
    if (goal?._id) {
      updateGoal({
        goalId: goal._id,
        data: { ...data, status: goal.status }
      });
      onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
      <div className="flex flex-col items-start gap-2">
        <label className="text-black/70 dark:text-foreground-dark">
          公開
        </label>
        <input
          type="checkbox"
          {...register("isPublic")}
        />
      </div>
      <div className="flex justify-end">
        <button type="submit" className="btn-primary">
          更新目標
        </button>
      </div>
    </form>
  );
};

export default UpdateGoalDialog;
