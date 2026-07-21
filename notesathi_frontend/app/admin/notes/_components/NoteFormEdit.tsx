"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Image from "next/image";
import { Loader2, X, FileText } from "lucide-react";

import { noteSchema, NoteFormData } from "./schema";
import { handleUpdateNote } from "@/lib/actions/admin/note-action";
import { Subject } from "@/lib/types/subject";
import { Note } from "@/lib/types/note";
import { resolveMediaUrl } from "@/lib/utils/media";
import FileDropzone from "@/app/dashboard/notes/new/_components/FileDropzone";

const CLASS_LEVELS = ["1", "2", "3", "4", "5", "6", "7", "8"];

interface Props {
  note: Note;
  subjects: Subject[];
}

export default function NoteFormEdit({ note, subjects }: Props) {
  const router = useRouter();

  const [contentFile, setContentFile] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NoteFormData>({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      title: note.title,
      description: note.description,
      category: note.category,
      subjectId: note.subjectId?._id || "",
      classLevel: note.classLevel as NoteFormData["classLevel"],
    },
  });

  const inputClass =
    "w-full rounded-md border px-5 py-3.5 text-slate-700 outline-none transition focus:border-[#246BFD] focus:ring-2 focus:ring-blue-50 border-slate-300";

  const onSubmit = async (data: NoteFormData) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("subjectId", data.subjectId);
    formData.append("classLevel", data.classLevel);
    if (contentFile) formData.append("contentFile", contentFile);
    if (thumbnail) formData.append("thumbnail", thumbnail);

    setIsSubmitting(true);
    const result = await handleUpdateNote(note._id, formData);

    if (result.success) {
      toast.success("Note updated successfully");
      router.push("/admin/notes");
      router.refresh();
    } else {
      toast.error(result.message);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-3xl rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
      {/* Header */}
      <div className="mb-8 flex items-center gap-4 border-b border-slate-100 pb-6">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-[#246BFD]">
          <FileText size={24} />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-slate-800">Edit Note</h2>
          <p className="text-sm text-slate-500">Update details for {note.title}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Title */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Title
          </label>
          <input
            {...register("title")}
            className={`${inputClass} ${errors.title ? "border-red-300" : ""}`}
            placeholder="Note title"
          />
          {errors.title && (
            <p className="mt-1.5 text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Description
          </label>
          <textarea
            {...register("description")}
            rows={4}
            className={`${inputClass} resize-none ${errors.description ? "border-red-300" : ""}`}
            placeholder="Note description"
          />
          {errors.description && (
            <p className="mt-1.5 text-sm text-red-500">{errors.description.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Category */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Category
            </label>
            <input
              {...register("category")}
              className={`${inputClass} ${errors.category ? "border-red-300" : ""}`}
              placeholder="e.g., Physics"
            />
            {errors.category && (
              <p className="mt-1.5 text-sm text-red-500">{errors.category.message}</p>
            )}
          </div>

          {/* Class */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Class
            </label>
            <select
              {...register("classLevel")}
              className={`${inputClass} appearance-none`}
            >
              {CLASS_LEVELS.map((level) => (
                <option key={level} value={level}>
                  Class {level}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Subject */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Subject
          </label>
          <select
            {...register("subjectId")}
            className={`${inputClass} appearance-none ${errors.subjectId ? "border-red-300" : ""}`}
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
            <p className="mt-1.5 text-sm text-red-500">{errors.subjectId.message}</p>
          )}
        </div>

        {/* Content file */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Content File
          </label>
          {note.contentFile && !contentFile && (
            <a
              href={resolveMediaUrl(note.contentFile)}
              target="_blank"
              rel="noreferrer"
              className="mb-2 flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-600 hover:bg-slate-100"
            >
              <FileText size={16} />
              View current file
            </a>
          )}
          <FileDropzone
            label="Drag & drop to replace the note file"
            hint="Leave empty to keep the current file"
            accept=".pdf,.doc,.docx,image/*"
            maxSizeMB={50}
            file={contentFile}
            onFileSelect={setContentFile}
          />
        </div>

        {/* Thumbnail */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Thumbnail
          </label>
          {note.thumbnail && !thumbnail && (
            <div className="mb-2 flex items-center gap-3 rounded-md border border-slate-200 bg-slate-50 p-3">
              <Image
                src={resolveMediaUrl(note.thumbnail)!}
                alt={note.title}
                width={48}
                height={48}
                className="rounded-md object-cover"
              />
              <span className="text-sm text-slate-500">Current thumbnail</span>
            </div>
          )}
          <FileDropzone
            label="Drag & drop to replace the thumbnail"
            hint="Leave empty to keep the current thumbnail"
            accept="image/*"
            maxSizeMB={5}
            file={thumbnail}
            onFileSelect={setThumbnail}
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => router.push("/admin/notes")}
            className="flex items-center gap-2 rounded-md border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <X size={16} />
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 rounded-md bg-[#246BFD] px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting && <Loader2 size={16} className="animate-spin" />}
            {isSubmitting ? "Updating..." : "Update Note"}
          </button>
        </div>
      </form>
    </div>
  );
}
