"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, FileText, Settings } from "lucide-react";
import Logo from "@/app/_components/logo";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutGrid },
  { href: "/dashboard/notes", label: "My Notes", icon: FileText },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-slate-100 bg-white px-4 py-6 md:flex">
      <div className="px-2">
        <Logo />
        <p className="mt-0.5 pl-10 text-xs text-slate-400">Workspace</p>
      </div>

      <nav className="mt-8 flex flex-col gap-1">
        {navItems.map((item) => {
          const active =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : item.href === "/dashboard/settings"
                ? pathname.startsWith("/dashboard/settings") ||
                  pathname.startsWith("/dashboard/password")
                : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                active
                  ? "bg-violet-50 text-violet-700"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}

        <Link
          href="/dashboard/notes/new"
          className="mt-2 flex h-11 items-center justify-center gap-2 rounded-xl bg-violet-600 text-sm font-medium text-white transition-colors hover:bg-violet-700"
        >
          Create New Note
        </Link>
      </nav>
    </aside>
  );
}
