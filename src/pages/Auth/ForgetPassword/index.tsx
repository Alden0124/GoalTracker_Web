import { Link } from "react-router-dom";
// 欄位驗證
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgetSchema, type ForgetFormData } from "@/schemas/auth.schema";
// 組件
import Input from "@/components/ui/Input";
// icon
import { FaArrowLeft } from "react-icons/fa";

const Forget = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgetFormData>({
    resolver: zodResolver(forgetSchema),
    mode: "onSubmit",
  });

  const onSubmit = (data: ForgetFormData) => {
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
        忘記密碼
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

        <button type="submit" className="btn-primary w-full hover:opacity-90">
          寄送Email驗證碼
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
          <Link
            to={"/signIn"}
            className="group text-center text-foreground-light/50 dark:text-foreground-dark hover:text-gray-700 dark:hover:text-gray-300 flex items-center justify-center gap-2"
          >
            <FaArrowLeft
              size={14}
              className=" transition-transform duration-300 group-hover:-translate-x-[4px]"
            />
            返回登入頁面
          </Link>
        </div>
      </form>
    </main>
  );
};

export default Forget;
