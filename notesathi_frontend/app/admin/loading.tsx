export default function Loading() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-[#246BFD]" />

        <p className="text-sm font-medium text-gray-500">Loading...</p>
      </div>
    </div>
  );
}
