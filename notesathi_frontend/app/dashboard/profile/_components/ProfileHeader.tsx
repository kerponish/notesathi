"use client";

import Image from "next/image";
import Link from "next/link";
import { Pencil, Share2 } from "lucide-react";
import { toast } from "react-toastify";
import { resolveMediaUrl } from "@/lib/utils/media";

export default function ProfileHeader({
  fullname,
  profilePicture,
}: {
  fullname: string;
  profilePicture?: string;
}) {
  const avatarUrl = resolveMediaUrl(profilePicture);
  const initial = (fullname?.[0] || "U").toUpperCase();

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (navigator.share) {
        await navigator.share({ title: `${fullname} on Notesathi`, url });
      } else {
        await navigator.clipboard.writeText(url);
        toast.success("Profile link copied!");
      }
    } catch {
      // user cancelled the share sheet — no-op
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt={fullname}
            width={72}
            height={72}
            className="h-18 w-18 rounded-2xl object-cover"
          />
        ) : (
          <div className="flex h-18 w-18 items-center justify-center rounded-2xl bg-slate-900 text-2xl font-semibold text-white">
            {initial}
          </div>
        )}
        <h1 className="text-2xl font-bold text-slate-900">{fullname}</h1>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={handleShare}
          className="flex h-10 items-center gap-2 rounded-lg border border-slate-200 px-4 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
        >
          <Share2 className="h-4 w-4" />
          Share
        </button>
        <Link
          href="/dashboard/profile/edit"
          className="flex h-10 items-center gap-2 rounded-lg bg-violet-600 px-4 text-sm font-medium text-white transition-colors hover:bg-violet-700"
        >
          <Pencil className="h-4 w-4" />
          Edit Profile
        </Link>
      </div>
    </div>
  );
}
