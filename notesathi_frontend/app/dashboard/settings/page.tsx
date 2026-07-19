import Link from "next/link";
import Image from "next/image";
import { Bell, ChevronRight, Globe, KeyRound } from "lucide-react";
import { handleUserDetails } from "@/lib/actions/auth-action";
import { resolveMediaUrl } from "@/lib/utils/media";
import NotificationToggle from "./_components/NotificationToggle";
import LanguageSelect from "./_components/LanguageSelect";

export default async function SettingsPage() {
  const userDetails = await handleUserDetails();
  if (!userDetails.success) {
    throw new Error(userDetails.message || "Failed to fetch user details");
  }
  const user = userDetails.data;
  const avatarUrl = resolveMediaUrl(user.profilePicture);
  const initial = (user.fullname?.[0] || "U").toUpperCase();

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Settings</h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage your account preferences.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-100 bg-white">
        <div className="flex items-center justify-between p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
              <Bell className="h-4.5 w-4.5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">
                Notifications
              </p>
              <p className="text-xs text-slate-400">
                Get notified about likes, comments, and activity on your notes.
              </p>
            </div>
          </div>
          <NotificationToggle initialEnabled={user.notificationsEnabled ?? true} />
        </div>

        <div className="flex items-center justify-between border-t border-slate-100 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
              <Globe className="h-4.5 w-4.5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">Language</p>
              <p className="text-xs text-slate-400">
                Choose your preferred display language.
              </p>
            </div>
          </div>
          <LanguageSelect initialLanguage={user.language ?? "en"} />
        </div>

        <Link
          href="/dashboard/password"
          className="flex items-center justify-between border-t border-slate-100 p-5 transition-colors hover:bg-slate-50"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
              <KeyRound className="h-4.5 w-4.5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">
                Change Password
              </p>
              <p className="text-xs text-slate-400">
                Update the password used to sign in.
              </p>
            </div>
          </div>
          <ChevronRight className="h-4 w-4 text-slate-300" />
        </Link>
      </div>

      <Link
        href="/dashboard/profile"
        className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-5 transition-colors hover:bg-slate-50"
      >
        <div className="flex items-center gap-3">
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt={user.fullname}
              width={40}
              height={40}
              className="h-10 w-10 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-medium text-white">
              {initial}
            </div>
          )}
          <div>
            <p className="text-sm font-semibold text-slate-900">
              {user.fullname}
            </p>
            <p className="text-xs text-slate-400">View your profile</p>
          </div>
        </div>
        <ChevronRight className="h-4 w-4 text-slate-300" />
      </Link>
    </div>
  );
}
