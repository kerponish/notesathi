import Link from "next/link";
import ForgotPasswordForm from "../_components/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f5f2ff] p-6">
      <div className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-10 shadow-sm">
        <h1 className="text-3xl font-bold text-[#4638dd]">Notesathi</h1>

        <div className="mt-8 mb-8">
          <h2 className="text-2xl font-bold text-[#1B1B1F]">Forgot password?</h2>
          <p className="mt-2 text-gray-500">
            Enter your email and we&apos;ll send you a link to reset it.
          </p>
        </div>

        <ForgotPasswordForm />

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
