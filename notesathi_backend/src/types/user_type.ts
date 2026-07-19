import { z } from "zod";

export const UserSchema = z.object({
  fullname: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  profilePicture: z.string().optional(),
  role: z.enum(["admin", "user"]).default("user"),
  provider: z.enum(["local", "google"]).optional(),
  googleId: z.string().optional(),
  // no zod .default() here on purpose: UpdateUserDTO = UserSchema.partial()
  // reuses this schema, and a .default() would inject the default value into
  // every partial update that omits the field, silently overwriting whatever
  // was previously saved. Mongoose's own schema defaults (user_model.ts)
  // still apply when a new user document is first created.
  notificationsEnabled: z.boolean().optional(),
  language: z.enum(["en", "ne"]).optional(),
});

export type UserType = z.infer<typeof UserSchema>;
