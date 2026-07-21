import { FileText, Heart, MessageSquare } from "lucide-react";
import { Note } from "@/lib/types/note";

interface Props {
  notes: Note[];
}

export default function StatsCards({ notes }: Props) {
  const totalNotes = notes.length;
  const totalLikes = notes.reduce((sum, note) => sum + (note.likes?.length || 0), 0);
  const totalComments = notes.reduce((sum, note) => sum + (note.commentsCount || 0), 0);

  const cards = [
    {
      title: "Total Notes",
      value: totalNotes,
      icon: FileText,
      color: "from-[#246BFD] to-[#1D4ED8]",
    },
    {
      title: "Total Likes",
      value: totalLikes,
      icon: Heart,
      color: "from-[#6D5EF9] to-[#4338CA]",
    },
    {
      title: "Total Comments",
      value: totalComments,
      icon: MessageSquare,
      color: "from-[#06B6D4] to-[#0891B2]",
    },
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className={`group rounded-lg bg-gradient-to-r ${card.color} p-7 text-white shadow-sm transition-colors duration-300`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white/90">
                  {card.title}
                </p>

                <h2 className="mt-3 text-4xl font-bold tracking-tight">
                  {card.value}
                </h2>
              </div>

              <div className="rounded-lg bg-white/15 p-5 transition group-hover:bg-white/20">
                <Icon className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
