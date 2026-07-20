import Link from "next/link";
import ResetPasswordForm from "../_components/ResetPasswordForm";

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f5f2ff] p-6">
      <div className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-10 shadow-sm">
        <h1 className="text-3xl font-bold text-[#4638dd]">Notesathi</h1>

        <div className="mb-8 mt-8">
          <h2 className="text-2xl font-bold text-[#1B1B1F]">Reset password</h2>
          <p className="mt-2 text-gray-500">Choose a new password below.</p>
        </div>

        <ResetPasswordForm token={token ?? ""} />

        <p className="mt-8 text-center text-sm text-gray-500">
          Remembered it?{" "}
          <Link href="/login" className="font-semibold text-[#5B4DFF] hover:underline">
            Back to login
          </Link>
        </p>
      </div>
    </div>
  );
}
