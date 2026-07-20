import { Heart, MessageSquare, Share2 } from "lucide-react";

export default function ProfileStats({
  comments,
  likes,
  shared,
}: {
  comments: number;
  likes: number;
  shared: number;
}) {
  const stats = [
    { label: "Comments", value: comments, icon: MessageSquare },
    { label: "Likes", value: likes, icon: Heart },
    { label: "Shared", value: shared, icon: Share2 },
  ];

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5">
      <div className="flex items-center gap-2">
        <Share2 className="h-4 w-4 text-violet-600" />
        <h2 className="text-base font-bold text-slate-900">
          Total Likes and Shares
        </h2>
      </div>

      <div className="mt-4 flex flex-col gap-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex items-center gap-3 rounded-lg border-l-2 border-violet-600 bg-slate-50 px-4 py-3"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-100 text-violet-600">
              <stat.icon className="h-4 w-4" />
            </div>
            <div>
              <p className="text-lg font-bold leading-none text-slate-900">
                {stat.value}
              </p>
              <p className="mt-1 text-xs uppercase tracking-wide text-slate-400">
                {stat.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
