import { z } from "zod";

export const AddCommentDto = z.object({
  text: z.string().min(1),
});

export type AddCommentDto = z.infer<typeof AddCommentDto>;
