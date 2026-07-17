import { z } from "zod";

export const NoteSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  thumbnail: z.string().optional(),
  contentFile: z.string().optional(),
  contentFileType: z.enum(["image", "pdf"]).optional(),
  category: z.string().min(1),

  subjectId: z.string(),
  classLevel: z.enum(["1", "2", "3", "4", "5", "6", "7", "8"]),

  createdBy: z.string(),
});

export type NoteType = z.infer<typeof NoteSchema>;
