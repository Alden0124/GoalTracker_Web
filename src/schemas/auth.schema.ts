import { z } from "zod";

// 共用的表單驗證規則
const formRules = {
  email: z.string().min(1, "電子郵件為必填").email("請輸入有效的電子郵件格式"),
  Password: z
    .string()
    .min(8, "密碼至少需要8個字元")
    .max(12, "密碼不能超過12個字元")
    .regex(/[A-Z]/, "密碼必須包含至少一個大寫字母")
    .regex(/[a-z]/, "密碼必須包含至少一個小寫字母"),
} as const;

// 登入表單驗證
export const signInSchema = z.object({
  email: formRules.email,
  password: formRules.Password,
});

// 註冊表單驗證
export const signUpSchema = z
  .object({
    email: formRules.email,
    password: formRules.Password,
    confirmPassword: z.string().min(1, "請確認密碼"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "密碼不一致",
    path: ["confirmPassword"],
  });

// 忘記密碼表單驗證
export const forgetSchema = z.object({
  email: formRules.email,
});

export type SignInFormData = z.infer<typeof signInSchema>;
export type SignUpFormData = z.infer<typeof signUpSchema>;
export type ForgetFormData = z.infer<typeof forgetSchema>;
