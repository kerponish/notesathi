"use client";

import Link from "next/link";
import Image from "next/image";
import { Eye, Pencil, Trash2, FileText } from "lucide-react";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { handleDeleteNote } from "@/lib/actions/admin/note-action";
import { resolveMediaUrl } from "@/lib/utils/media";
import { Note } from "@/lib/types/note";
import DeleteNoteModal from "./DeleteNoteModal";

interface Props {
  notes: Note[];
}

export default function NotesTable({ notes }: Props) {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const [open, setOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const handleDelete = () => {
    if (!selectedNote) return;

    startTransition(async () => {
      const result = await handleDeleteNote(selectedNote._id);

      if (result.success) {
        toast.success("Note deleted successfully");

        setOpen(false);
        setSelectedNote(null);

        router.refresh();
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <>
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        <table className="w-full">
          <thead className="bg-[#246BFD] text-white">
            <tr>
              <th className="p-5 text-left">Note</th>
              <th>Subject</th>
              <th>Class</th>
              <th>Author</th>
              <th>Created</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {notes.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-gray-500">
                  No notes found.
                </td>
              </tr>
            ) : (
              notes.map((note) => (
                <tr
                  key={note._id}
                  className="border-b transition hover:bg-blue-50"
                >
                  {/* Note */}
                  <td className="p-5">
                    <div className="flex items-center gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-blue-50">
                        {note.thumbnail ? (
                          <Image
                            src={resolveMediaUrl(note.thumbnail)!}
                            alt={note.title}
                            width={44}
                            height={44}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <FileText size={20} className="text-[#246BFD]" />
                        )}
                      </div>

                      <div>
                        <p className="max-w-xs truncate font-semibold text-gray-800">
                          {note.title}
                        </p>

                        <p className="text-sm text-gray-500">{note.category}</p>
                      </div>
                    </div>
                  </td>

                  {/* Subject */}
                  <td className="text-gray-600">
                    {note.subjectId?.name || "—"}
                  </td>

                  {/* Class */}
                  <td>
                    <span className="rounded-md bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                      Class {note.classLevel}
                    </span>
                  </td>

                  {/* Author */}
                  <td className="text-gray-600">
                    {note.createdBy?.fullname || "Unknown"}
                  </td>

                  {/* Created */}
                  <td className="text-gray-600">
                    {new Date(note.createdAt).toLocaleDateString()}
                  </td>

                  {/* Actions */}
                  <td>
                    <div className="flex justify-center gap-3">
                      <Link
                        href={`/admin/notes/${note._id}`}
                        className="rounded-lg bg-blue-500 p-2 text-white transition hover:bg-blue-600"
                      >
                        <Eye size={18} />
                      </Link>

                      <Link
                        href={`/admin/notes/${note._id}/edit`}
                        className="rounded-lg bg-yellow-500 p-2 text-white transition hover:bg-yellow-600"
                      >
                        <Pencil size={18} />
                      </Link>

                      <button
                        onClick={() => {
                          setSelectedNote(note);
                          setOpen(true);
                        }}
                        className="rounded-lg bg-red-500 p-2 text-white transition hover:bg-red-600"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <DeleteNoteModal
        open={open}
        loading={isPending}
        note={selectedNote}
        onClose={() => {
          setOpen(false);
          setSelectedNote(null);
        }}
        onDelete={handleDelete}
      />
    </>
  );
}
