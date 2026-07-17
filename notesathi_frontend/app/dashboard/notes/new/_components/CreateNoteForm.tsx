"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { noteSchema, NoteFormData } from "./schema";
import FileDropzone from "./FileDropzone";
import { handleCreateNote } from "@/lib/actions/note-action";
import { Subject } from "@/lib/types/subject";

const CLASS_LEVELS = ["1", "2", "3", "4", "5", "6", "7", "8"];

export default function CreateNoteForm({ subjects }: { subjects: Subject[] }) {
  const router = useRouter();
  const [contentFile, setContentFile] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NoteFormData>({
    resolver: zodResolver(noteSchema),
    defaultValues: { title: "", description: "", subjectId: "", classLevel: undefined },
  });

  const onSubmit = async (data: NoteFormData) => {
    if (!contentFile) {
      toast.error("Please attach a file for your notes");
      return;
    }

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("subjectId", data.subjectId);
    formData.append("classLevel", data.classLevel);
    formData.append("category", "General");
    formData.append("contentFile", contentFile);
    if (thumbnail) formData.append("thumbnail", thumbnail);

    setSubmitting(true);
    try {
      const result = await handleCreateNote(formData);
      if (!result.success) {
        throw new Error(result.message);
      }
      toast.success("Note published!");
      router.push("/dashboard/notes");
    } catch (error: any) {
      toast.error(error?.message || "Failed to publish note");
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-2xl border border-slate-100 bg-white p-6">
        <h2 className="text-lg font-bold text-slate-900">Note Details</h2>

        <div className="mt-5">
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
              defaultValue=""
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
              defaultValue=""
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
      </div>

      <div className="flex flex-col gap-6">
        <div className="rounded-2xl border border-slate-100 bg-white p-6">
          <h2 className="text-lg font-bold text-slate-900">File Upload</h2>

          <div className="mt-5">
            <FileDropzone
              label="Drag & drop your notes here"
              hint="PDF, DOCX, or high-res images (Max 50MB)"
              accept=".pdf,.doc,.docx,image/*"
              maxSizeMB={50}
              file={contentFile}
              onFileSelect={setContentFile}
            />
          </div>

          <div className="mt-5">
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Thumbnail
            </label>
            <div className="mt-2">
              <FileDropzone
                label="Drag & drop a thumbnail here"
                hint="PNG or JPG (Max 5MB)"
                accept="image/*"
                maxSizeMB={5}
                file={thumbnail}
                onFileSelect={setThumbnail}
              />
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <button
              type="submit"
              disabled={submitting}
              className="flex h-11 flex-1 items-center justify-center rounded-lg bg-violet-600 text-sm font-semibold text-white transition-colors hover:bg-violet-700 disabled:opacity-50"
            >
              {submitting ? "Publishing..." : "Publish Note"}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              disabled={submitting}
              className="flex h-11 items-center rounded-lg border border-slate-200 px-6 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </div>

        <div className="rounded-2xl bg-violet-600 p-6 text-white">
          <h3 className="text-base font-bold">Quality Check</h3>
          <p className="mt-2 text-sm text-violet-100">
            Ensure your notes are clear, well-formatted, and original.
            High-quality notes get more downloads!
          </p>
        </div>
      </div>
    </form>
  );
}
