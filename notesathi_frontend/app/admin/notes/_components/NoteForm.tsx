"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";

import { noteSchema, NoteFormData } from "./schema";
import { handleCreateNote } from "@/lib/actions/admin/note-action";
import { Subject } from "@/lib/types/subject";
import FileDropzone from "@/app/dashboard/notes/new/_components/FileDropzone";

const CLASS_LEVELS = ["1", "2", "3", "4", "5", "6", "7", "8"];

export default function NoteForm({ subjects }: { subjects: Subject[] }) {
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
      title: "",
      description: "",
      category: "",
      subjectId: "",
      classLevel: undefined,
    },
  });

  const inputClass =
    "w-full rounded-md border border-gray-300 px-4 py-3 text-slate-900 font-medium placeholder:text-slate-400 placeholder:font-normal outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  const onSubmit = async (data: NoteFormData) => {
    if (!contentFile) {
      toast.error("Please attach a content file for this note");
      return;
    }

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("subjectId", data.subjectId);
    formData.append("classLevel", data.classLevel);
    formData.append("contentFile", contentFile);
    if (thumbnail) formData.append("thumbnail", thumbnail);

    setIsSubmitting(true);
    const result = await handleCreateNote(formData);

    if (result.success) {
      toast.success("Note created successfully");
      router.push("/admin/notes");
      router.refresh();
    } else {
      toast.error(result.message);
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-6 md:grid-cols-2"
    >
      {/* Title */}
      <div className="md:col-span-2">
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          Title
        </label>
        <input
          {...register("title")}
          placeholder="e.g., Advanced Quantum Mechanics Lecture 04"
          className={inputClass}
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>

      {/* Description */}
      <div className="md:col-span-2">
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          Description
        </label>
        <textarea
          {...register("description")}
          rows={4}
          placeholder="Briefly summarize what these notes cover..."
          className={`${inputClass} resize-none`}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      {/* Category */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          Category
        </label>
        <input
          {...register("category")}
          placeholder="e.g., Physics"
          className={inputClass}
        />
        {errors.category && (
          <p className="mt-1 text-sm text-red-500">{errors.category.message}</p>
        )}
      </div>

      {/* Subject */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          Subject
        </label>
        <select
          {...register("subjectId")}
          defaultValue=""
          className={`${inputClass} appearance-none`}
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
          <p className="mt-1 text-sm text-red-500">{errors.subjectId.message}</p>
        )}
      </div>

      {/* Class */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          Class
        </label>
        <select
          {...register("classLevel")}
          defaultValue=""
          className={`${inputClass} appearance-none`}
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
          <p className="mt-1 text-sm text-red-500">{errors.classLevel.message}</p>
        )}
      </div>

      {/* Content file */}
      <div className="md:col-span-2">
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          Content File
        </label>
        <FileDropzone
          label="Drag & drop the note file here"
          hint="PDF, DOCX, or high-res images (Max 50MB)"
          accept=".pdf,.doc,.docx,image/*"
          maxSizeMB={50}
          file={contentFile}
          onFileSelect={setContentFile}
        />
      </div>

      {/* Thumbnail */}
      <div className="md:col-span-2">
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          Thumbnail (optional)
        </label>
        <FileDropzone
          label="Drag & drop a thumbnail here"
          hint="PNG or JPG (Max 5MB)"
          accept="image/*"
          maxSizeMB={5}
          file={thumbnail}
          onFileSelect={setThumbnail}
        />
      </div>

      {/* Buttons */}
      <div className="mt-4 flex justify-end gap-4 md:col-span-2">
        <button
          type="button"
          onClick={() => router.push("/admin/notes")}
          className="rounded-md border border-gray-300 px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-100"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center gap-2 rounded-md bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting && <Loader2 size={16} className="animate-spin" />}
          {isSubmitting ? "Creating..." : "Create Note"}
        </button>
      </div>
    </form>
  );
}
