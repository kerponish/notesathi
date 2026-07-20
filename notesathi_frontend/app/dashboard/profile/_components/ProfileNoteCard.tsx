import Link from "next/link";
import { FileText, Heart, MessageCircle } from "lucide-react";
import { Note } from "@/lib/types/note";
import { timeAgo } from "@/lib/utils/time";

export default function ProfileNoteCard({ note }: { note: Note }) {
  return (
    <Link
      href={`/dashboard/notes/${note._id}`}
      className="flex flex-col rounded-lg border border-slate-200 bg-white p-4 transition-shadow hover:shadow-sm"
    >
      <div className="flex items-start justify-between">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-100 text-violet-600">
          <FileText className="h-4 w-4" />
        </div>
        {note.contentFileType && (
          <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase text-slate-500">
            {note.contentFileType === "pdf" ? "PDF" : "IMG"}
          </span>
        )}
      </div>

      <h3 className="mt-3 line-clamp-2 text-sm font-semibold text-slate-900">
        {note.title}
      </h3>
      <p className="mt-1 line-clamp-2 text-xs text-slate-500">
        {note.description}
      </p>

      <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-3 text-xs text-slate-400">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <Heart className="h-3.5 w-3.5" />
            {note.likes?.length ?? 0}
          </span>
          <span className="flex items-center gap-1">
            <MessageCircle className="h-3.5 w-3.5" />
            {note.commentsCount ?? 0}
          </span>
        </div>
        <span>{timeAgo(note.createdAt)}</span>
      </div>
    </Link>
  );
}
