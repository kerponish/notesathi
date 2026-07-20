"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { noteSchema, NoteFormData } from "../../../new/_components/schema";
import { handleUpdateNote } from "@/lib/actions/note-action";
import { Note } from "@/lib/types/note";
import { Subject } from "@/lib/types/subject";

const CLASS_LEVELS = ["1", "2", "3", "4", "5", "6", "7", "8"];

export default function EditNoteForm({
  note,
  subjects,
}: {
  note: Note;
  subjects: Subject[];
}) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NoteFormData>({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      title: note.title,
      description: note.description,
      subjectId: note.subjectId?._id ?? "",
      classLevel: note.classLevel as NoteFormData["classLevel"],
    },
  });

  const onSubmit = async (data: NoteFormData) => {
    const result = await handleUpdateNote(note._id, data);
    if (!result.success) {
      toast.error(result.message || "Failed to update note");
      return;
    }
    toast.success("Note updated!");
    router.push(`/dashboard/notes/${note._id}`);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl rounded-lg border border-slate-200 bg-white p-6"
    >
      <div>
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Title
        </label>
        <input
          {...register("title")}
          placeholder="e.g., Advanced Quantum Mechanics Lecture 04"
          className="mt-2 w-full rounded-lg bg-violet-50/60 px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-violet-200"
        />
        {errors.title && (
          <p className="mt-1 text-xs text-red-500">{errors.title.message}</p>
        )}
      </div>

      <div className="mt-5">
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Description
        </label>
        <textarea
          {...register("description")}
          rows={4}
          placeholder="Briefly summarize what these notes cover..."
          className="mt-2 w-full resize-none rounded-lg bg-violet-50/60 px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-violet-200"
        />
        {errors.description && (
          <p className="mt-1 text-xs text-red-500">{errors.description.message}</p>
        )}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Subject
          </label>
          <select
            {...register("subjectId")}
            defaultValue={note.subjectId?._id ?? ""}
            className="mt-2 w-full rounded-lg bg-violet-50/60 px-4 py-3 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-violet-200"
          >
            <option value="" disabled>
              Select Subject
            </option>
            {subjects.map((subject) => (
              <option key={subject._id} value={subject._id}>
                {subject.name}
              </option>
            ))}
          </select>
          {errors.subjectId && (
            <p className="mt-1 text-xs text-red-500">{errors.subjectId.message}</p>
          )}
        </div>

        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Class
          </label>
          <select
            {...register("classLevel")}
            defaultValue={note.classLevel}
            className="mt-2 w-full rounded-lg bg-violet-50/60 px-4 py-3 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-violet-200"
          >
            <option value="" disabled>
              Select Class
            </option>
            {CLASS_LEVELS.map((level) => (
              <option key={level} value={level}>
                Class {level}
              </option>
            ))}
          </select>
          {errors.classLevel && (
            <p className="mt-1 text-xs text-red-500">{errors.classLevel.message}</p>
          )}
        </div>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex h-11 items-center rounded-lg bg-violet-600 px-6 text-sm font-semibold text-white transition-colors hover:bg-violet-700 disabled:opacity-50"
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          disabled={isSubmitting}
          className="flex h-11 items-center rounded-lg border border-slate-200 px-6 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
