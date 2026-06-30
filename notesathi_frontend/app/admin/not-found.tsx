import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
      <h1 className="mb-2 text-6xl font-bold text-[#246BFD]">404</h1>

      <h2 className="mb-3 text-3xl font-bold text-gray-800">Page Not Found</h2>

      <p className="mb-8 max-w-md text-gray-500">
        Sorry, the page you're looking for doesn't exist or has been moved.
      </p>

      <Link
        href="/admin"
        className="rounded-lg bg-[#246BFD] px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
      >
        Back to Dashboard
      </Link>
    </div>
  );
}
