"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import { useAuth } from "@/lib/context/AuthContext";
import Avatar from "@/app/_components/avatar";

const NAV_LINKS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/users", label: "Users" },
  { href: "/admin/notes", label: "Notes" },
  { href: "/admin/settings", label: "Settings" },
];

export default function Navbar() {
  const { logout, user } = useAuth();
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

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
      <div className="flex items-center gap-2 rounded-full bg-gray-100 p-1.5">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`rounded-full px-5 py-2 text-sm font-medium transition ${
              isActive(link.href)
                ? "bg-[#246BFD] text-white"
                : "text-gray-600 hover:text-[#246BFD]"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">
        <button
          onClick={logout}
          aria-label="Log out"
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

          <div className="leading-tight">
            <p className="text-xs text-gray-400">Hello!</p>
            <p className="text-sm font-semibold text-gray-800">
              {user?.fullname || "Admin"}
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
}
