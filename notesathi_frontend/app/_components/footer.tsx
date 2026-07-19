"use client";

import Link from "next/link";
import { Globe, Mail, Share2 } from "lucide-react";
import Logo from "./logo";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { TranslationKey } from "@/lib/i18n/translations";

const columns: {
  titleKey: TranslationKey;
  links: { labelKey: TranslationKey; href: string }[];
}[] = [
  {
    titleKey: "footer.product",
    links: [
      { labelKey: "footer.browseNotes", href: "/login" },
      { labelKey: "footer.uploadNotes", href: "/login" },
      { labelKey: "footer.community", href: "/login" },
    ],
  },
  {
    titleKey: "footer.company",
    links: [
      { labelKey: "footer.about", href: "/" },
      { labelKey: "footer.contact", href: "mailto:hello@notesathi.com" },
    ],
  },
  {
    titleKey: "footer.legal",
    links: [
      { labelKey: "footer.privacyPolicy", href: "/privacy" },
      { labelKey: "footer.termsOfService", href: "/terms" },
    ],
  },
];

export default function Footer({ compact = false }: { compact?: boolean }) {
  const { t } = useLanguage();

  if (compact) {
    return (
      <footer className="border-t border-slate-100 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 py-4 text-xs text-slate-400 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Notesathi. {t("footer.rights")}</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="transition-colors hover:text-slate-600">
              {t("footer.privacy")}
            </Link>
            <Link href="/terms" className="transition-colors hover:text-slate-600">
              {t("footer.terms")}
            </Link>
            <Link href="mailto:hello@notesathi.com" aria-label="Email" className="transition-colors hover:text-violet-600">
              <Mail className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="border-t border-slate-100 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <Logo />
            <p className="mt-3 max-w-55 text-sm text-slate-500">
              {t("footer.tagline")}
            </p>
            <div className="mt-4 flex items-center gap-3 text-slate-400">
              <Link href="mailto:hello@notesathi.com" aria-label="Email" className="transition-colors hover:text-violet-600">
                <Mail className="h-4 w-4" />
              </Link>
              <Link href="#" aria-label="Website" className="transition-colors hover:text-violet-600">
                <Globe className="h-4 w-4" />
              </Link>
              <Link href="#" aria-label="Share" className="transition-colors hover:text-violet-600">
                <Share2 className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.titleKey}>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                {t(col.titleKey)}
              </p>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.labelKey}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-600 transition-colors hover:text-slate-900"
                    >
                      {t(link.labelKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-slate-100 pt-8 sm:flex-row sm:items-center">
          <p className="text-xs text-slate-400">
            &copy; {new Date().getFullYear()} Notesathi. {t("footer.rights")}
          </p>
          <p className="text-xs text-slate-400">{t("footer.madeFor")}</p>
        </div>
      </div>
    </footer>
  );
}
