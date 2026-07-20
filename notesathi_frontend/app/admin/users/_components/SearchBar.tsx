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

    if (search.trim()) {
      query.set("search", search);
    }

    query.set("page", "1");

    router.push(`/admin/users?${query.toString()}`);
  };

  return (
    <form onSubmit={submit}>
      <div className="relative">
        <Search
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
        />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search users..."
          className="
            w-80 rounded-md
            border border-gray-200
            bg-white
            py-3 pl-12 pr-4
            text-[15px] font-medium text-gray-800
            placeholder:text-gray-400
            transition-all duration-200
            focus:border-[#246BFD]
            focus:ring-2
            focus:ring-blue-100
            focus:outline-none
          "
        />
      </div>
    </form>
  );
}
