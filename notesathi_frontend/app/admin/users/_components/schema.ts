import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const base = {
  fullname: z
    .string("Must be a valid string")
    .min(8, { message: "Minimum 8 characters" }),
  email: z.email({ message: "Invalid email address" }),
  role: z.enum(["user", "admin"]),
};

// create posts JSON (no image — matches CreateUserDTO), requires a password
export const createUserSchema = z.object({
  ...base,
  password: z
    .string("Must be a valid string")
    .min(6, { message: "Minimum 6 characters" }),
});
export type CreateUserFormData = z.infer<typeof createUserSchema>;

// edit mirrors update-profile: multipart with optional image, no password
export const editUserSchema = z.object({
  fullname: z.string().min(3),

  email: z.email(),

  role: z.enum(["user", "admin"]),

  image: z
    .instanceof(File)
    .optional()
    .refine((file) => !file || file.size <= MAX_FILE_SIZE)
    .refine((file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type)),
});
export type EditUserFormData = z.infer<typeof editUserSchema>;
