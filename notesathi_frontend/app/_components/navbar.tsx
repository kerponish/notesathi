"use client";
import Link from "next/link";
import { Search } from "lucide-react";
import Logo from "./logo";
import Avatar from "./avatar";
import { useAuth } from "@/lib/context/AuthContext";

const navLinks = [
  { href: "/login", label: "Browse" },
  { href: "/login", label: "Community" },
  { href: "/login", label: "Resources" },
];

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Logo />

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-slate-600 transition-colors hover:text-slate-900"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {!user && (
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 sm:block"
            >
              Login
            </Link>
            <Link
              href="/login"
              className="flex h-9 items-center rounded-md bg-violet-600 px-4 text-sm font-medium text-white transition-colors hover:bg-violet-700"
            >
              Get Started
            </Link>
          </div>
        )}

        {user && (
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="flex h-9 items-center gap-2 rounded-md bg-violet-600 px-4 text-sm font-medium text-white transition-colors hover:bg-violet-700"
            >
              Upload
            </Link>
            <button
              aria-label="Search"
              className="hidden h-9 w-9 items-center justify-center rounded-md text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 sm:flex"
            >
              <Search className="h-4 w-4" />
            </button>
            <Link href="/dashboard" aria-label="Dashboard">
              <Avatar
                name={user.fullname}
                email={user.email}
                src={user.profilePicture}
                size={36}
                className="text-sm font-medium"
                fallbackClassName="bg-slate-900 text-white text-sm font-medium"
              />
            </Link>
            <button
              onClick={logout}
              className="hidden text-sm font-medium text-slate-500 transition-colors hover:text-slate-900 sm:block"
            >
              Logout
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}
