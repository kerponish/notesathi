"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { toast } from "react-toastify";
import { handleToggleLike } from "@/lib/actions/note-action";

export default function LikeButton({
  noteId,
  initialLiked,
  initialCount,
}: {
  noteId: string;
  initialLiked: boolean;
  initialCount: number;
}) {
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);
  const [pending, setPending] = useState(false);

  const onClick = async () => {
    if (pending) return;
    const nextLiked = !liked;
    setLiked(nextLiked);
    setCount((c) => c + (nextLiked ? 1 : -1));
    setPending(true);

    const result = await handleToggleLike(noteId);
    setPending(false);

    if (!result.success) {
      setLiked(!nextLiked);
      setCount((c) => c + (nextLiked ? -1 : 1));
      toast.error(result.message || "Failed to update like");
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={pending}
      className={`flex h-10 items-center gap-2 rounded-lg border px-4 text-sm font-medium transition-colors disabled:opacity-60 ${
        liked
          ? "border-violet-200 bg-violet-50 text-violet-700"
          : "border-slate-200 text-slate-700 hover:bg-slate-50"
      }`}
    >
      <Heart className={`h-4 w-4 ${liked ? "fill-current" : ""}`} />
      {count}
    </button>
  );
}
