import { z } from "zod";

export const signUpSchema = z
  .object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
    });

export const loginSchema = z.object({
    username: z.string().min(1, "Username can't be empty"),
    password: z.string().min(1, "Password can't be empty"),
    });

export type SignUpForm = z.infer<typeof signUpSchema>;
export type LoginForm = z.infer<typeof loginSchema>;