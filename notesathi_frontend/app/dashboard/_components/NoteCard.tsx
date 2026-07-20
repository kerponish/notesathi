"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import {
  ArrowRight,
  FileText,
  Heart,
  MessageCircle,
  MoreVertical,
  Pencil,
  Trash2,
} from "lucide-react";
import { resolveMediaUrl } from "@/lib/utils/media";
import { Note } from "@/lib/types/note";
import { handleDeleteNote } from "@/lib/actions/note-action";

export default function NoteCard({
  note,
  manageable = false,
}: {
  note: Note;
  manageable?: boolean;
}) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const onEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setMenuOpen(false);
    router.push(`/dashboard/notes/${note._id}/edit`);
  };

  const onDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setMenuOpen(false);
    setConfirmOpen(true);
  };

  const confirmDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDeleting(true);
    const result = await handleDeleteNote(note._id);
    setDeleting(false);

    if (!result.success) {
      toast.error(result.message || "Failed to delete note");
      return;
    }
    toast.success("Note deleted");
    setConfirmOpen(false);
    router.refresh();
  };

  return (
    <div className="relative">
      <Link
        href={`/dashboard/notes/${note._id}`}
        className="group flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white transition-shadow hover:shadow-md"
      >
        <div className="relative flex aspect-video items-center justify-center bg-slate-100">
          {note.thumbnail ? (
            <Image
              src={resolveMediaUrl(note.thumbnail)!}
              alt={note.title}
              fill
              sizes="(min-width: 1024px) 25vw, 50vw"
              className="object-cover"
            />
          ) : (
            <FileText className="h-10 w-10 text-violet-300" strokeWidth={1.25} />
          )}
          {note.contentFileType && (
            <span className="absolute right-2 top-2 rounded-md bg-slate-900/80 px-2 py-0.5 text-[10px] font-semibold uppercase text-white">
              {note.contentFileType === "pdf" ? "PDF" : "IMG"}
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col p-3">
          {note.subjectId?.name && (
            <p className="text-xs font-semibold uppercase tracking-wide text-violet-600">
              {note.subjectId.name}
            </p>
          )}
          <h3 className="mt-1 truncate text-sm font-semibold text-slate-900">
            {note.title}
          </h3>
          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-500">
            {note.description}
          </p>

          <div className="mt-auto flex flex-col gap-2.5 pt-3">
            <div className="flex items-center justify-between gap-2 border-t border-slate-100 pt-2.5">
              <p className="min-w-0 truncate text-xs text-slate-400">
                {note.createdBy?.fullname || "Unknown"}
              </p>
              <div className="flex shrink-0 items-center gap-3 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <Heart className="h-3.5 w-3.5" />
                  {note.likes?.length ?? 0}
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle className="h-3.5 w-3.5" />
                  {note.commentsCount ?? 0}
                </span>
              </div>
            </div>

            <span className="flex items-center justify-center gap-1.5 rounded-md bg-violet-50 py-1.5 text-xs font-semibold text-violet-700 transition-colors group-hover:bg-violet-100">
              Click to continue
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </Link>

      {manageable && (
        <div className="absolute right-2 top-2">
          <button
            type="button"
            aria-label="Note actions"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setMenuOpen((v) => !v);
            }}
            className="flex h-7 w-7 items-center justify-center rounded-md bg-white/90 text-slate-600 shadow-sm backdrop-blur transition-colors hover:bg-white hover:text-slate-900"
          >
            <MoreVertical className="h-4 w-4" />
          </button>

          {menuOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setMenuOpen(false);
                }}
              />
              <div className="absolute right-0 top-9 z-20 w-32 overflow-hidden rounded-md border border-slate-200 bg-white shadow-lg">
                <button
                  type="button"
                  onClick={onEdit}
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs font-medium text-slate-700 hover:bg-slate-50"
                >
                  <Pencil className="h-3.5 w-3.5" />
                  Edit
                </button>
                <button
                  type="button"
                  onClick={onDeleteClick}
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs font-medium text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {confirmOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setConfirmOpen(false);
          }}
        >
          <div
            className="w-full max-w-sm rounded-lg border border-slate-200 bg-white p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-base font-bold text-slate-900">Delete note</h2>
            <p className="mt-2 text-sm text-slate-500">
              Are you sure you want to delete &ldquo;{note.title}&rdquo;? This action
              cannot be undone.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setConfirmOpen(false);
                }}
                className="flex h-9 items-center rounded-md border border-slate-200 px-4 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                disabled={deleting}
                className="flex h-9 items-center rounded-md bg-red-600 px-4 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
