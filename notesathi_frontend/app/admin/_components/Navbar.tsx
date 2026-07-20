"use client";

import Link from "next/link";
import { Search, LogOut } from "lucide-react";
import { useAuth } from "@/lib/context/AuthContext";
import Avatar from "@/app/_components/avatar";

export default function Navbar() {
  const { logout, user } = useAuth();

  return (
    <nav className="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b border-gray-200 bg-white px-8">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[#246BFD] text-base font-bold text-white">
          N
        </div>

        <h1 className="text-lg font-bold tracking-tight text-gray-900">
          Notesathi <span className="font-medium text-gray-400">Admin</span>
        </h1>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-8">
        <Link
          href="/admin/users"
          className="text-sm font-medium text-gray-700 transition hover:text-[#246BFD]"
        >
          Users
        </Link>

        <Link
          href="/admin/notes"
          className="text-sm font-medium text-gray-700 transition hover:text-[#246BFD]"
        >
          Notes
        </Link>

        <Link
          href="/admin/settings"
          className="text-sm font-medium text-gray-700 transition hover:text-[#246BFD]"
        >
          Setting
        </Link>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">
        <button className="text-gray-500 transition hover:text-[#246BFD]">
          <Search size={18} />
        </button>

        <button
          onClick={logout}
          className="text-gray-500 transition hover:text-red-500"
        >
          <LogOut size={18} />
        </button>

        <div className="flex items-center gap-3 border-l border-gray-200 pl-5">
          <Avatar
            name={user?.fullname || "Admin"}
            src={user?.profilePicture}
            size={36}
            className="text-sm font-semibold"
            fallbackClassName="bg-gray-900 text-white text-sm font-semibold"
          />

          <span className="text-sm font-medium text-gray-800">
            {user?.fullname || "Admin"}
          </span>
        </div>
      </div>
    </nav>
  );
}
