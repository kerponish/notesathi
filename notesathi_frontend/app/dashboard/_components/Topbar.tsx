"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bell, LogOut, Search } from "lucide-react";
import { toast } from "react-toastify";
import { useAuth } from "@/lib/context/AuthContext";

export default function Topbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/dashboard/browse?q=${encodeURIComponent(q)}` : "/dashboard/browse");
  };

  const initial = (user?.fullname?.[0] || user?.email?.[0] || "U").toUpperCase();

  return (
    <header className="flex h-16 items-center gap-4 border-b border-slate-100 bg-white px-6">
      <form onSubmit={handleSearch} className="relative hidden max-w-sm flex-1 sm:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="search"
          placeholder="Search notes, community, resources..."
          className="h-10 w-full rounded-lg bg-slate-50 pl-9 pr-3 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-violet-200"
        />
      </form>

      <nav className="ml-auto hidden items-center gap-6 lg:flex">
        <Link
          href="/dashboard/browse"
          className="text-sm text-slate-600 transition-colors hover:text-slate-900"
        >
          Browse
        </Link>
        <button
          onClick={() => toast.info("Community is coming soon!")}
          className="text-sm text-slate-600 transition-colors hover:text-slate-900"
        >
          Community
        </button>
        <button
          onClick={() => toast.info("Resources is coming soon!")}
          className="text-sm text-slate-600 transition-colors hover:text-slate-900"
        >
          Resources
        </button>
      </nav>

      <div className="ml-auto flex items-center gap-3 lg:ml-0">
        <Link
          href="/dashboard/notes/new"
          className="hidden h-9 items-center rounded-full bg-violet-600 px-4 text-sm font-medium text-white transition-colors hover:bg-violet-700 sm:flex"
        >
          Upload
        </Link>
        <button
          aria-label="Notifications"
          onClick={() => toast.info("You're all caught up — no new notifications.")}
          className="flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
        >
          <Bell className="h-4 w-4" />
        </button>
        <Link
          href="/dashboard/profile"
          aria-label="Profile"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-sm font-medium text-white"
        >
          {initial}
        </Link>
        <button
          aria-label="Logout"
          onClick={() => logout()}
          className="flex h-9 w-9 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-900"
        >
          <LogOut className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}
