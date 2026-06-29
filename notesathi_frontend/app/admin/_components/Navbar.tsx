"use client";

import Link from "next/link";
import { Search, LogOut, Users, FileText, Settings } from "lucide-react";

import { useAuth } from "@/lib/context/AuthContext";

export default function Navbar() {
  const { logout, user } = useAuth();

  return (
    <nav className="mx-auto mt-6 flex h-16 w-[95%] items-center justify-between rounded-full bg-white px-8 shadow">
      {/* Logo */}

      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white font-bold">
          N
        </div>

        <h1 className="font-bold text-lg">NOTESATHI</h1>
      </div>

      {/* Navigation */}

      <div className="flex items-center gap-10">
        <Link
          href="/admin/users"
          className="rounded-full bg-blue-600 px-8 py-2 text-white"
        >
          Users
        </Link>

        <Link href="/admin/notes" className="text-gray-600 hover:text-blue-600">
          Notes
        </Link>

        <Link
          href="/admin/settings"
          className="text-gray-600 hover:text-blue-600"
        >
          Setting
        </Link>
      </div>

      {/* Right */}

      <div className="flex items-center gap-5">
        <button>
          <Search size={20} />
        </button>

        <button onClick={logout}>
          <LogOut size={20} />
        </button>

        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-blue-500"></div>

          <span className="font-medium">{user?.fullname || "Admin"}</span>
        </div>
      </div>
    </nav>
  );
}
