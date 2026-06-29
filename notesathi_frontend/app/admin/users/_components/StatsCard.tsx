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
      color: "from-blue-500 to-blue-700",
    },
    {
      title: "Admins",
      value: totalAdmins,
      icon: ShieldCheck,
      color: "from-indigo-500 to-indigo-700",
    },
    {
      title: "Users",
      value: totalNormalUsers,
      icon: UserCheck,
      color: "from-cyan-500 to-cyan-700",
    },
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className={`rounded-2xl bg-gradient-to-r ${card.color} p-6 text-white shadow-lg transition hover:scale-[1.02]`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-80">{card.title}</p>

                <h2 className="mt-2 text-4xl font-bold">{card.value}</h2>
              </div>

              <div className="rounded-full bg-white/20 p-4">
                <Icon size={32} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
