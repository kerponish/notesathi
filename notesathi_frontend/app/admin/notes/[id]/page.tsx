import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  BookOpen,
  Layers,
  User,
  Calendar,
  Heart,
  MessageSquare,
  ArrowLeft,
  Pencil,
  FileText,
} from "lucide-react";

import { handleGetNoteById } from "@/lib/actions/admin/note-action";
import { resolveMediaUrl } from "@/lib/utils/media";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function NoteDetailsPage({ params }: Props) {
  const { id } = await params;

  const result = await handleGetNoteById(id);

  if (!result.success) {
    notFound();
  }

  const note = result.data;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Note Details</h1>
          <p className="mt-2 text-gray-600">
            View complete information about this note.
          </p>
        </div>

        <Link
          href="/admin/notes"
          className="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-5 py-3 font-semibold text-gray-700 shadow-sm transition hover:bg-gray-100"
        >
          <ArrowLeft size={18} />
          Back
        </Link>
      </div>

      {/* Main Card */}
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        {/* Thumbnail banner */}
        <div className="relative flex h-56 items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-700">
          {note.thumbnail ? (
            <Image
              src={resolveMediaUrl(note.thumbnail)!}
              alt={note.title}
              fill
              className="object-cover"
            />
          ) : (
            <FileText size={56} className="text-white/70" />
          )}
        </div>

        <div className="p-10 pb-0">
          <h2 className="text-3xl font-bold text-gray-900">{note.title}</h2>
          <p className="mt-3 text-gray-600">{note.description}</p>
        </div>

        {/* Info */}
        <div className="grid gap-6 p-10 md:grid-cols-2">
          <div className="rounded-lg border bg-slate-50 p-6">
            <div className="mb-2 flex items-center gap-3">
              <BookOpen className="text-blue-600" />
              <span className="font-semibold text-gray-700">Subject</span>
            </div>
            <p className="text-lg text-gray-900">
              {note.subjectId?.name || "—"}
            </p>
          </div>

          <div className="rounded-lg border bg-slate-50 p-6">
            <div className="mb-2 flex items-center gap-3">
              <Layers className="text-indigo-600" />
              <span className="font-semibold text-gray-700">Class & Category</span>
            </div>
            <p className="text-lg text-gray-900">
              Class {note.classLevel} · {note.category}
            </p>
          </div>

          <div className="rounded-lg border bg-slate-50 p-6">
            <div className="mb-2 flex items-center gap-3">
              <User className="text-green-600" />
              <span className="font-semibold text-gray-700">Author</span>
            </div>
            <p className="text-lg text-gray-900">
              {note.createdBy?.fullname || "Unknown"}
            </p>
            <p className="text-sm text-gray-500">{note.createdBy?.email}</p>
          </div>

          <div className="rounded-lg border bg-slate-50 p-6">
            <div className="mb-2 flex items-center gap-3">
              <Calendar className="text-orange-600" />
              <span className="font-semibold text-gray-700">Created</span>
            </div>
            <p className="text-lg text-gray-900">
              {new Date(note.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div className="rounded-lg border bg-slate-50 p-6">
            <div className="mb-2 flex items-center gap-3">
              <Heart className="text-red-500" />
              <span className="font-semibold text-gray-700">Likes</span>
            </div>
            <p className="text-lg text-gray-900">{note.likes?.length ?? 0}</p>
          </div>

          <div className="rounded-lg border bg-slate-50 p-6">
            <div className="mb-2 flex items-center gap-3">
              <MessageSquare className="text-cyan-600" />
              <span className="font-semibold text-gray-700">Comments</span>
            </div>
            <p className="text-lg text-gray-900">{note.commentsCount ?? 0}</p>
          </div>
        </div>

        {note.contentFile && (
          <div className="px-10 pb-6">
            <a
              href={resolveMediaUrl(note.contentFile)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-100"
            >
              <FileText size={16} />
              View content file
            </a>
          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-end gap-4 border-t bg-gray-50 p-6">
          <Link
            href="/admin/notes"
            className="rounded-md border px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
          >
            Back
          </Link>

          <Link
            href={`/admin/notes/${note._id}/edit`}
            className="flex items-center gap-2 rounded-md bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            <Pencil size={18} />
            Edit Note
          </Link>
        </div>
      </div>
    </div>
  );
}
