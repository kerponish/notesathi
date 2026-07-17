import Link from "next/link";
import Image from "next/image";
import { FileText, Heart, MessageCircle } from "lucide-react";
import { resolveMediaUrl } from "@/lib/utils/media";
import { Note } from "@/lib/types/note";

export default function NoteCard({ note }: { note: Note }) {
  return (
    <Link
      href={`/dashboard/notes/${note._id}`}
      className="block overflow-hidden rounded-2xl border border-slate-100 bg-white transition-shadow hover:shadow-sm"
    >
      <div className="relative flex h-32 items-center justify-center bg-violet-50">
        {note.thumbnail ? (
          <Image
            src={resolveMediaUrl(note.thumbnail)!}
            alt={note.title}
            fill
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="object-cover"
          />
        ) : (
          <FileText className="h-10 w-10 text-violet-300" strokeWidth={1.5} />
        )}
        {note.contentFileType && (
          <span className="absolute right-2 top-2 rounded-md bg-slate-900/80 px-2 py-0.5 text-[10px] font-semibold uppercase text-white">
            {note.contentFileType === "pdf" ? "PDF" : "IMG"}
          </span>
        )}
      </div>

      <div className="p-4">
        {note.subjectId?.name && (
          <p className="text-xs font-semibold uppercase tracking-wide text-violet-600">
            {note.subjectId.name}
          </p>
        )}
        <h3 className="mt-1 truncate text-sm font-semibold text-slate-900">
          {note.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-xs text-slate-500">
          {note.description}
        </p>

        <div className="mt-3 flex items-center justify-between">
          <p className="truncate text-xs text-slate-400">
            {note.createdBy?.fullname || "Unknown"}
          </p>
          <div className="flex items-center gap-3 text-xs text-slate-400">
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
      </div>
    </Link>
  );
}
