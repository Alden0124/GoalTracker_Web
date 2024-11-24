import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema, type ProfileFormData } from "@/schemas/userSchema";
import Input from "@/components/ui/Input";
import { UserProfileResponse } from "@/components/user/profile/type";
// import { notification } from "@/utils/notification";
// import { FETCH_USER_PROFILE } from "@/services/api/userProfile";

interface ProfileEditFormProps {
  initialData: UserProfileResponse;
  onCancel: () => void;
  onSubmit: (data: ProfileFormData) => Promise<void>;
}

const ProfileEditForm = ({ initialData, onCancel, onSubmit }: ProfileEditFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: initialData.username || '',
      email: initialData.email || '',
    }
  });

  const handleFormSubmit = async (data: ProfileFormData) => {
    console.log('update profile data', data);
    // try {
    //   await FETCH_USER_PROFILE.UpdateProfile(data);
    //   notification.success({ title: "更新成功" });
    //   onSubmit(data);
    // } catch (error) {
    //   notification.error({ 
    //     title: "更新失敗",
    //     text: "請稍後再試"
    //   });
    // }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <Input
        {...register("username")}
        label="用戶名稱"
        error={errors.username?.message}
      />
      
      <Input
        {...register("email")}
        label="電子信箱"
        type="email"
        disabled
        error={errors.email?.message}
      />

      <div className="flex justify-end gap-2">
        <button 
          type="button"
          onClick={onCancel}
          className="btn-secondary"
          disabled={isSubmitting}
        >
          取消
        </button>
        <button 
          type="submit"
          className="btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? "更新中..." : "確認更新"}
        </button>
      </div>
    </form>
  );
};

export default ProfileEditForm;