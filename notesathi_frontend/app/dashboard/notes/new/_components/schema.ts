import { z } from "zod";

export const noteSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  subjectId: z.string().min(1, "Please select a subject"),
  classLevel: z.enum(["1", "2", "3", "4", "5", "6", "7", "8"], {
    message: "Please select a class",
  }),
});
export type NoteFormData = z.infer<typeof noteSchema>;
