import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Download, FileText, Sparkles } from "lucide-react";
import { getUserData } from "@/lib/cookies";
import { getNoteById } from "@/lib/api/notes";
import { getComments } from "@/lib/api/comments";
import { resolveMediaUrl } from "@/lib/utils/media";
import { timeAgo } from "@/lib/utils/time";
import Avatar from "@/app/_components/avatar";
import LikeButton from "./_components/LikeButton";
import CommentSection from "./_components/CommentSection";

export default async function NoteDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getUserData();

  let note;
  try {
    const result = await getNoteById(id);
    note = result?.data;
  } catch {
    note = null;
  }

  if (!note) {
    notFound();
  }

  let comments = [];
  try {
    const result = await getComments(id);
    comments = result?.data ?? [];
  } catch {
    comments = [];
  }

  const thumbnailUrl = resolveMediaUrl(note.thumbnail);
  const contentUrl = resolveMediaUrl(note.contentFile);
  const liked = note.likes?.includes(user?._id) ?? false;

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6">
      <Link
        href="/dashboard/browse"
        className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to notes
      </Link>

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
        <div className="relative flex h-56 items-center justify-center bg-violet-50 sm:h-72">
          {thumbnailUrl ? (
            <Image
              src={thumbnailUrl}
              alt={note.title}
              fill
              sizes="(min-width: 640px) 768px, 100vw"
              className="object-cover"
            />
          ) : (
            <FileText className="h-16 w-16 text-violet-300" strokeWidth={1.5} />
          )}
        </div>

        <div className="p-6">
          <div className="flex flex-wrap items-center gap-2">
            {note.subjectId?.name && (
              <span className="rounded-md bg-violet-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-violet-600">
                {note.subjectId.name}
              </span>
            )}
            <span className="rounded-md bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
              Class {note.classLevel}
            </span>
          </div>

          <h1 className="mt-3 text-2xl font-bold text-slate-900">{note.title}</h1>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            {note.description}
          </p>

          <div className="mt-5 flex items-center justify-between border-t border-slate-200 pt-5">
            <div className="flex items-center gap-3">
              <Avatar
                name={note.createdBy?.fullname}
                src={note.createdBy?.profilePicture}
                size={36}
                className="text-sm font-medium"
                fallbackClassName="bg-slate-900 text-white text-sm font-medium"
              />
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  {note.createdBy?.fullname || "Unknown"}
                </p>
                <p className="text-xs text-slate-400">{timeAgo(note.createdAt)}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <LikeButton
                noteId={note._id}
                initialLiked={liked}
                initialCount={note.likes?.length ?? 0}
              />
              {contentUrl && (
                <Link
                  href={contentUrl}
                  target="_blank"
                  className="flex h-10 items-center gap-2 rounded-lg bg-violet-600 px-4 text-sm font-medium text-white transition-colors hover:bg-violet-700"
                >
                  <Download className="h-4 w-4" />
                  View File
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between rounded-lg bg-violet-600 p-6 text-white">
        <div>
          <h2 className="text-base font-bold">Test what you've learned</h2>
          <p className="mt-1 text-sm text-violet-100">
            Take a 10-question quiz generated from this note.
          </p>
        </div>
        <Link
          href={`/dashboard/notes/${note._id}/quiz`}
          className="flex h-10 shrink-0 items-center gap-2 rounded-lg bg-white px-4 text-sm font-medium text-violet-700 transition-colors hover:bg-violet-50"
        >
          <Sparkles className="h-4 w-4" />
          Take Quiz
        </Link>
      </div>

      <CommentSection
        noteId={note._id}
        initialComments={comments}
        currentUser={{
          _id: user?._id,
          fullname: user?.fullname,
          email: user?.email,
          profilePicture: user?.profilePicture,
        }}
      />
    </div>
  );
}
