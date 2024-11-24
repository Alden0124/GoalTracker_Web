import { z } from "zod";

export const profileSchema = z.object({
  username: z.string()
    .min(2, "姓名至少需要 2 個字元")
    .max(20, "姓名不能超過 20 個字元"),
  location: z.string()
    .min(2, "居住地至少需要 2 個字元")
    .max(50, "居住地不能超過 50 個字元")
    .optional(),
  occupation: z.string()
    .min(2, "職稱至少需要 2 個字元")
    .max(50, "職稱不能超過 50 個字元")
    .optional(),
  education: z.string()
    .min(2, "學歷至少需要 2 個字元")
    .max(50, "學歷不能超過 50 個字元")
    .optional()
});

export type ProfileFormData = z.infer<typeof profileSchema>;