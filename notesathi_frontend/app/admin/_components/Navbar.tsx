"use client";

import Link from "next/link";
import { Search, LogOut } from "lucide-react";
import { useAuth } from "@/lib/context/AuthContext";

export default function Navbar() {
  const { logout, user } = useAuth();

  return (
    <nav className="mx-auto mt-6 flex h-16 w-[95%] items-center justify-between rounded-full border border-gray-200 bg-white px-8 shadow-sm">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#246BFD] text-base font-bold text-white">
          N
        </div>

        <h1 className="text-xl font-extrabold tracking-wide text-gray-900">
          NOTESATHI
        </h1>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-8">
        <Link
          href="/admin/users"
          className="rounded-full bg-[#246BFD] px-8 py-2.5 text-sm font-semibold text-white shadow transition hover:bg-blue-700"
        >
          Users
        </Link>

        <Link
          href="/admin/notes"
          className="text-[15px] font-medium text-gray-700 transition hover:text-[#246BFD]"
        >
          Notes
        </Link>

        <Link
          href="/admin/settings"
          className="text-[15px] font-medium text-gray-700 transition hover:text-[#246BFD]"
        >
          Setting
        </Link>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">
        <button className="text-gray-600 transition hover:text-[#246BFD]">
          <Search size={20} />
        </button>

        <button
          onClick={logout}
          className="text-gray-600 transition hover:text-red-500"
        >
          <LogOut size={20} />
        </button>

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#246BFD] text-sm font-bold text-white">
            {user?.fullname?.charAt(0).toUpperCase() || "A"}
          </div>

          <span className="text-sm font-semibold text-gray-800">
            {user?.fullname || "Admin"}
          </span>
        </div>
      </div>
    </nav>
  );
}
