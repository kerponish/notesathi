"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
  const router = useRouter();
  const params = useSearchParams();

  const [search, setSearch] = useState(params.get("search") || "");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    const query = new URLSearchParams();

    if (search) {
      query.set("search", search);
    }

    query.set("page", "1");

    router.push(`/admin/users?${query.toString()}`);
  };

  return (
    <form onSubmit={submit}>
      <div className="relative">
        <Search size={18} className="absolute left-4 top-3 text-gray-400" />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search users..."
          className="w-80 rounded-lg border bg-white py-3 pl-11 pr-4 outline-none focus:border-blue-500"
        />
      </div>
    </form>
  );
}
