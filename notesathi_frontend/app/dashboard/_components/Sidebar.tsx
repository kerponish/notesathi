"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, FileText, User, Settings } from "lucide-react";
import Logo from "@/app/_components/logo";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const navItems = [
  { href: "/dashboard", labelKey: "sidebar.dashboard" as const, icon: LayoutGrid },
  { href: "/dashboard/notes", labelKey: "sidebar.myNotes" as const, icon: FileText },
  { href: "/dashboard/profile", labelKey: "sidebar.profile" as const, icon: User },
  { href: "/dashboard/settings", labelKey: "sidebar.settings" as const, icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { t } = useLanguage();

  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col overflow-y-auto border-r border-slate-200 bg-white px-4 py-6 md:flex">
      <div className="px-2">
        <Logo href="/dashboard" />
        <p className="mt-0.5 pl-10 text-xs text-slate-400">{t("sidebar.workspace")}</p>
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
              {t(item.labelKey)}
            </Link>
          );
        })}

        <Link
          href="/dashboard/notes/new"
          className="mt-2 flex h-11 items-center justify-center gap-2 rounded-md bg-violet-600 text-sm font-medium text-white transition-colors hover:bg-violet-700"
        >
          {t("sidebar.createNote")}
        </Link>
      </nav>
    </aside>
  );
}
