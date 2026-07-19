"use client";

import Link from "next/link";
import Image from "next/image";
import { Bell, ChevronRight, Globe, KeyRound } from "lucide-react";
import { resolveMediaUrl } from "@/lib/utils/media";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import NotificationToggle from "./NotificationToggle";
import LanguageSelect from "./LanguageSelect";

export default function SettingsView({ user }: { user: any }) {
  const { t } = useLanguage();
  const avatarUrl = resolveMediaUrl(user.profilePicture);
  const initial = (user.fullname?.[0] || "U").toUpperCase();

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">{t("settings.title")}</h1>
        <p className="mt-1 text-sm text-slate-500">{t("settings.subtitle")}</p>
      </div>

      <div className="rounded-2xl border border-slate-100 bg-white">
        <div className="flex items-center justify-between p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
              <Bell className="h-4.5 w-4.5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">
                {t("settings.notifications")}
              </p>
              <p className="text-xs text-slate-400">
                {t("settings.notificationsDesc")}
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
              <p className="text-sm font-semibold text-slate-900">
                {t("settings.language")}
              </p>
              <p className="text-xs text-slate-400">{t("settings.languageDesc")}</p>
            </div>
          </div>
          <LanguageSelect />
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
                {t("settings.changePassword")}
              </p>
              <p className="text-xs text-slate-400">
                {t("settings.changePasswordDesc")}
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
            <p className="text-sm font-semibold text-slate-900">{user.fullname}</p>
            <p className="text-xs text-slate-400">{t("settings.viewProfile")}</p>
          </div>
        </div>
        <ChevronRight className="h-4 w-4 text-slate-300" />
      </Link>
    </div>
  );
}
