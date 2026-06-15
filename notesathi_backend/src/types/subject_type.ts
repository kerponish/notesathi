import { z } from "zod";

export const SubjectSchema = z.object({
  name: z.string().min(1, "Subject name is required"),

  description: z.string().optional(),
});

export type SubjectType = z.infer<typeof SubjectSchema>;
