import { Users, ShieldCheck, UserCheck } from "lucide-react";

interface Props {
  users: any[];
}

export default function StatsCards({ users }: Props) {
  const totalUsers = users.length;
  const totalAdmins = users.filter((user) => user.role === "admin").length;
  const totalNormalUsers = users.filter((user) => user.role === "user").length;

  const cards = [
    {
      title: "Total Users",
      value: totalUsers,
      icon: Users,
      color: "from-[#246BFD] to-[#1D4ED8]",
    },
    {
      title: "Admins",
      value: totalAdmins,
      icon: ShieldCheck,
      color: "from-[#6D5EF9] to-[#4338CA]",
    },
    {
      title: "Users",
      value: totalNormalUsers,
      icon: UserCheck,
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
