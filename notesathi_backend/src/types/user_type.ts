import { z } from "zod";

export const UserSchema = z.object({
  fullname: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["admin", "user"]).default("user"),
});

export type UserType = z.infer<typeof UserSchema>;
