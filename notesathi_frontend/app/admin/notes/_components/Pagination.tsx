"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function Pagination({ meta }: { meta: any }) {
  const router = useRouter();
  const params = useSearchParams();

  if (!meta) return null;

  const page = meta.page;
  const totalPages = meta.totalPages;

  const go = (p: number) => {
    const query = new URLSearchParams(params.toString());

    query.set("page", p.toString());

    router.push(`/admin/notes?${query.toString()}`);
  };

  return (
    <div className="mt-8 flex items-center justify-end gap-2">
      <button
        disabled={page <= 1}
        onClick={() => go(page - 1)}
        className="rounded-md border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
      >
        Previous
      </button>

      <span className="rounded-md bg-[#246BFD] px-4 py-2 text-sm font-medium text-white">{page}</span>

      <button
        disabled={page >= totalPages}
        onClick={() => go(page + 1)}
        className="rounded-md border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
