// 欄位驗證
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, type SignUpFormData } from "@/schemas/auth.schema";
// 組件
import Input from "@/components/ui/Input";

const ResetPassword = () => {

  const {
    register,
    // handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: "onSubmit",
  });






  return (
    <main className="w-full min-h-[calc(100vh-64px)] flex flex-col justify-center items-center dark:bg-background-dark">
      <h1 className="text-center  text-2xl dark:text-foreground-dark">
        變更密碼
      </h1>

      <form
        className="w-full max-w-sm mt-8 space-y-4 px-4"
        noValidate
      >
        <Input
          {...register("password")}
          id="password"
          type="password"
          label="密碼"
          placeholder="密碼"
          autoComplete="new-password"
          error={errors.password?.message}
        />

        <Input
          {...register("confirmPassword")}
          id="confirmPassword"
          type="password"
          label="確認密碼"
          placeholder="請再次輸入密碼"
          autoComplete="new-password"
          error={errors.confirmPassword?.message}
        />

        <button type="submit" className="btn-primary w-full hover:opacity-90">
          確定變更密碼
        </button>
      </form>
    </main>
  );
};

export default ResetPassword;
