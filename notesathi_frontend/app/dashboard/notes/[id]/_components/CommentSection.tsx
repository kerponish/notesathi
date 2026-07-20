"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { toast } from "react-toastify";
import { handleAddComment } from "@/lib/actions/comment-action";
import { Comment } from "@/lib/types/comment";
import { timeAgo } from "@/lib/utils/time";
import Avatar from "@/app/_components/avatar";

export default function CommentSection({
  noteId,
  initialComments,
  currentUser,
}: {
  noteId: string;
  initialComments: Comment[];
  currentUser: { _id: string; fullname: string; email: string; profilePicture?: string };
}) {
  const [comments, setComments] = useState(initialComments);
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;

    setSubmitting(true);
    const result = await handleAddComment(noteId, trimmed);
    setSubmitting(false);

    if (!result.success) {
      toast.error(result.message || "Failed to add comment");
      return;
    }

    setComments((prev) => [
      { ...result.data, userId: currentUser },
      ...prev,
    ]);
    setText("");
  };

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6">
      <h2 className="text-base font-bold text-slate-900">
        Comments ({comments.length})
      </h2>

      <form onSubmit={onSubmit} className="mt-4 flex items-start gap-3">
        <Avatar
          name={currentUser.fullname}
          email={currentUser.email}
          src={currentUser.profilePicture}
          size={36}
          className="text-sm font-medium"
          fallbackClassName="bg-slate-900 text-white text-sm font-medium"
        />
        <div className="flex flex-1 items-center gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a comment..."
            className="h-10 flex-1 rounded-lg bg-slate-50 px-4 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-violet-200"
          />
          <button
            type="submit"
            disabled={submitting || !text.trim()}
            aria-label="Post comment"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-violet-600 text-white transition-colors hover:bg-violet-700 disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </form>

      <div className="mt-6 flex flex-col gap-5">
        {comments.length === 0 && (
          <p className="text-sm text-slate-400">
            No comments yet. Be the first to say something.
          </p>
        )}
        {comments.map((comment) => (
          <div key={comment._id} className="flex items-start gap-3">
            <Avatar
              name={comment.userId?.fullname}
              email={comment.userId?.email}
              src={comment.userId?.profilePicture}
              size={36}
              className="text-sm font-medium"
              fallbackClassName="bg-violet-100 text-violet-700 text-sm font-medium"
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-slate-900">
                  {comment.userId?.fullname || "Unknown"}
                </p>
                <p className="text-xs text-slate-400">{timeAgo(comment.createdAt)}</p>
              </div>
              <p className="mt-0.5 text-sm text-slate-600">{comment.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
