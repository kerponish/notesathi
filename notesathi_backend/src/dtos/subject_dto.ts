import { SubjectSchema } from "../types/subject_type";
import { z } from "zod";

export const CreateSubjectDto = SubjectSchema;

export type CreateSubjectDto = z.infer<typeof CreateSubjectDto>;

export const UpdateSubjectDto = SubjectSchema.partial();

export type UpdateSubjectDto = z.infer<typeof UpdateSubjectDto>;
