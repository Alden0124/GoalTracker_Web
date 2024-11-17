import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/ui/Input";
import { signInSchema, type SignInFormData } from "@/schemas/auth.schema";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaLine } from "react-icons/fa";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    mode: "onSubmit",
  });

  const onSubmit = (data: SignInFormData) => {
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
        登入 GoalTracker
      </h1>
      <p
        className={`text-sm text-foreground-light/40 dark:text-foreground-dark mt-[10px]`}
      >
        登入或建立帳號以開始使用
      </p>

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
          autoComplete="current-password"
          error={errors.password?.message}
        />

        <button type="submit" className="btn-primary w-full hover:opacity-90">
          登入
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

        <button
          type="button"
          className="w-full border text-center text-[16px] rounded-[5px] hover:bg-[gray]/10 dark:text-foreground-dark dark:border-gray-600 p-[6px] flex items-center justify-center gap-2"
        >
          <FcGoogle size={24} />
          使用 Google 登入
        </button>
        <button
          type="button"
          className="w-full border text-center text-[16px] rounded-[5px] hover:bg-[gray]/10 dark:text-foreground-dark dark:border-gray-600 p-[6px] flex items-center justify-center gap-2"
        >
          <FaFacebook 
            size={24} 
            className="text-[#1877F2] dark:text-[#4267B2]" 
          />
          使用 Facebook 登入
        </button>
        <button
          type="button"
          className="w-full border text-center text-[16px] rounded-[5px] hover:bg-[gray]/10 dark:text-foreground-dark dark:border-gray-600 p-[6px] flex items-center justify-center gap-2"
        >
          <FaLine 
            size={24} 
            className="text-[#06C755] dark:text-[#00B900]" 
          />
          使用 LINE 登入
        </button>

        <Link
          to={"/forget"}
          className={`block text-center text-[blue]/60 dark:text-[#58c4dc]`}
        >
          忘記密碼?
        </Link>

        <div>
          <p
            className={`text-center text-foreground-light/50 dark:text-foreground-dark`}
          >
            還沒有帳號?
            <Link
              to={"/signUp"}
              className={`pl-[4px] text-[blue]/60 dark:text-[#58c4dc]`}
            >
              立即註冊
            </Link>
          </p>
        </div>
      </form>
    </main>
  );
};

export default SignIn;
