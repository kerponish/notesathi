import { UserSchema } from "../types/user_type";
import { z } from "zod";

export const CreateUserDto = UserSchema.pick({
  fullname: true,
  email: true,
  password: true,
  profilePicture: true,
}).extend({
  confirmPassword: z.string().min(6),
});

export type CreateUserDto = z.infer<typeof CreateUserDto>;

export const LoginUserDto = UserSchema.pick({
  email: true,
  password: true,
});

export type LoginUserDto = z.infer<typeof LoginUserDto>;

export const UpdateUserProfileDto = UserSchema.pick({
  fullname: true,
}).partial();

export type UpdateUserProfileDto = z.infer<typeof UpdateUserProfileDto>;

// NEW DTO
export const ChangePasswordDto = z.object({
  oldPassword: z.string().min(6),
  newPassword: z.string().min(6),
});

export type ChangePasswordDto = z.infer<typeof ChangePasswordDto>;
