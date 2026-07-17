import { NoteSchema } from "../types/note_type";
import { z } from "zod";

export const CreateNoteDto = NoteSchema.pick({
  title: true,
  description: true,
  thumbnail: true,
  contentFile: true,
  contentFileType: true,
  category: true,
  subjectId: true,
  classLevel: true,
});

export type CreateNoteDto = z.infer<typeof CreateNoteDto>;

export const UpdateNoteDto = CreateNoteDto.partial();

export type UpdateNoteDto = z.infer<typeof UpdateNoteDto>;
