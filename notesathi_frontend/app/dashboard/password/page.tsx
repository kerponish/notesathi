import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import UpdatePasswordForm from "../_components/PasswordResetForm";

export default function Page() {
  return (
    <div className="flex flex-col gap-6">
      <Link
        href="/dashboard/settings"
        className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Settings
      </Link>
      <UpdatePasswordForm />
    </div>
  );
}
