import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/ui/Input";
import { signUpSchema, type SignUpFormData } from "@/schemas/auth.schema";
import { Link } from "react-router-dom";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: "onSubmit",
  });

  const onSubmit = (data: SignUpFormData) => {
    console.log(data);
    // 處理登入邏輯
  };

  const onError = (errors: any) => {
    console.log("表單錯誤:", errors);
    // 錯誤會自動顯示在對應的 Input 元件下方
  };

  return (
    <main className="w-full min-h-[calc(100vh-64px)] flex flex-col justify-center items-center dark:bg-background-dark">
      <h1 className="text-center  text-2xl dark:text-foreground-dark">
        註冊 GoalTracker
      </h1>
   

      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="w-full max-w-sm mt-8 space-y-4 px-4"
        noValidate
      >
        <Input
          {...register("email")}
          id="email"
          type="email"
          label="電子信箱"
          placeholder="電子郵件"
          autoComplete="email"
          error={errors.email?.message}
        />

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
          創建帳號
        </button>

        <div className={`w-full flex items-center justify-center`}>
          <div className="border-b w-[50%]"></div>
          <p
            className={`text-sm break-keep text-foreground-light/50 dark:text-foreground-dark`}
          >
            或
          </p>
          <div className={`border-b w-[50%]`}></div>
        </div>

        <div>
          <p
            className={`text-center text-foreground-light/50 dark:text-foreground-dark`}
          >
            已經有帳號?
            <Link
              to={"/signIn"}
              className={`pl-[4px] text-[blue]/60 dark:text-[#58c4dc]`}
            >
              登入
            </Link>
          </p>
        </div>
      </form>
    </main>
  );
};

export default SignUp;
