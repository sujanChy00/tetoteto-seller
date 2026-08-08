import { z } from "zod";

export const LoginSchema = z.object({
  email: z.email({ error: "Invalid Email" }),
  password: z.string({ error: "Password is required" }).min(2, {
    error: "Password is required",
  }),
});

export type LoginFormData = z.infer<typeof LoginSchema>;
