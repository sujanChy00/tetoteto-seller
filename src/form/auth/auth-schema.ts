import * as v from "valibot";

export const LoginSchema = v.object({
  email: v.pipe(v.string(), v.email("Invalid Email")),
  password: v.pipe(
    v.string("Password is required"),
    v.minLength(2, "Password is required"),
  ),
});

export const PasswordSchema = v.pipe(
  v.object({
    oldPassword: v.pipe(v.string(), v.minLength(1, "Old password is required")),
    newPassword: v.pipe(
      v.string(),
      v.regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Password must contain at least 8 characters, one uppercase, one number and one special character",
      ),
    ),
    confirmPassword: v.pipe(
      v.string(),
      v.minLength(1, "Confirm password is required"),
    ),
  }),
  v.forward(
    v.partialCheck(
      [["newPassword"], ["confirmPassword"]],
      (input) => input.newPassword === input.confirmPassword,
      "Passwords do not match",
    ),
    ["confirmPassword"],
  ),
);

export type PasswordFormData = v.InferInput<typeof PasswordSchema>;
export type LoginFormData = v.InferInput<typeof LoginSchema>;
