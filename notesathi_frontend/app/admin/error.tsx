"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
      <h1 className="mb-2 text-4xl font-bold text-red-600">Oops!</h1>

      <p className="mb-6 text-gray-600">
        Something went wrong while loading this page.
      </p>

      <button
        onClick={reset}
        className="rounded-lg bg-[#246BFD] px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
      >
        Try Again
      </button>
    </div>
  );
}
