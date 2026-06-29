import { z } from "zod";
import { UserSchema } from "../types/user_type";

// Create a DTO for creating a user
// export const CreateUserDTO = UserSchema.omit({ role: true });
export const CreateUserDTO = UserSchema.pick({
  fullname: true,
  email: true,
  password: true,
});
export type CreateUserDTO = z.infer<typeof CreateUserDTO>;

export const CreateUserDTOAdmin = UserSchema.pick({
  fullname: true,
  email: true,

  password: true,
  role: true,
});
export type CreateUserDTOAdmin = z.infer<typeof CreateUserDTOAdmin>;

// Login Dto
// 1. Create new schame
// export const LoginUserDTO = z.object({
//     email: z.email(),
//     password: z.string().min(6, "Password must be at least 6 characters long")
// });
// 2. Reuse existing schema
export const LoginUserDTO = UserSchema.pick({
  email: true,
  password: true,
});
export type LoginUserDTO = z.infer<typeof LoginUserDTO>;

export const UpdateUserDTO = UserSchema.partial();
export type UpdateUserDTO = z.infer<typeof UpdateUserDTO>;

export const UpdatePasswordDTO = z
  .object({
    currentPassword: z
      .string()
      .min(6, "Current password must be at least 6 characters long"),
    newPassword: z
      .string()
      .min(6, "New password must be at least 6 characters long"),
    confirmPassword: z
      .string()
      .min(6, "Confirm password must be at least 6 characters long"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "New password and confirm password must match",
    path: ["confirmPassword"],
  });
export type UpdatePasswordDTO = z.infer<typeof UpdatePasswordDTO>;
