"use client";

import Link from "next/link";
import { Bell, ChevronRight, Globe, KeyRound, User } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import NotificationToggle from "./NotificationToggle";
import LanguageSelect from "./LanguageSelect";

export default function SettingsView({ user }: { user: any }) {
  const { t } = useLanguage();

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">{t("settings.title")}</h1>
        <p className="mt-1 text-sm text-slate-500">{t("settings.subtitle")}</p>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white">
        <Link
          href="/dashboard/profile"
          className="flex items-center justify-between p-5 transition-colors hover:bg-slate-50"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
              <User className="h-4.5 w-4.5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">
                {t("settings.viewProfile")}
              </p>
              <p className="text-xs text-slate-400">{user.fullname}</p>
            </div>
          </div>
          <ChevronRight className="h-4 w-4 text-slate-300" />
        </Link>

        <div className="flex items-center justify-between border-t border-slate-200 p-5">
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

        <div className="flex items-center justify-between border-t border-slate-200 p-5">
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

        {user.provider !== "google" && (
          <Link
            href="/dashboard/password"
            className="flex items-center justify-between border-t border-slate-200 p-5 transition-colors hover:bg-slate-50"
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
        )}
      </div>
    </div>
  );
}
