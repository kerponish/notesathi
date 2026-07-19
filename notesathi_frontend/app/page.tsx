"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, Sparkles, Star, Users } from "lucide-react";
import Navbar from "./_components/navbar";
import Footer from "./_components/footer";
import logo from "./assets/notesathilogo.png";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { TranslationKey } from "@/lib/i18n/translations";

const testimonials: {
  name: string;
  quoteKey: TranslationKey;
  roleKey: TranslationKey;
}[] = [
  { name: "Aarav K.", quoteKey: "testimonial1.quote", roleKey: "testimonial1.role" },
  { name: "Sujata R.", quoteKey: "testimonial2.quote", roleKey: "testimonial2.role" },
  { name: "Bijaya T.", quoteKey: "testimonial3.quote", roleKey: "testimonial3.role" },
];

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans">
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-6 pb-20 pt-16 sm:pt-24">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700">
                <Sparkles className="h-3.5 w-3.5" />
                {t("landing.badge")}
              </span>
              <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl">
                {t("landing.heroTitle")}{" "}
                <span className="text-violet-600">{t("landing.heroBrand")}</span>
              </h1>
              <p className="mt-5 max-w-md text-base text-slate-600">
                {t("landing.heroSubtitle")}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/login"
                  className="flex h-11 items-center rounded-full bg-violet-600 px-6 text-sm font-medium text-white transition-colors hover:bg-violet-700"
                >
                  {t("landing.getStarted")}
                </Link>
                <Link
                  href="/login"
                  className="flex h-11 items-center rounded-full border border-slate-200 px-6 text-sm font-medium text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50"
                >
                  {t("landing.browseNotes")}
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="relative flex aspect-4/3 items-center justify-center overflow-hidden rounded-3xl bg-linear-to-br from-violet-500 to-indigo-600">
                <div className="flex h-40 w-40 items-center justify-center rounded-3xl bg-white/95 p-6 shadow-xl">
                  <Image src={logo} alt="Notesathi" className="h-full w-full object-contain" />
                </div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.25),transparent_55%)]" />
              </div>
              <div className="absolute -bottom-6 -left-6 flex items-center gap-3 rounded-2xl border border-slate-100 bg-white px-5 py-4 shadow-lg">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-50 text-violet-600">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {t("landing.studentsCount")}
                  </p>
                  <p className="text-xs text-slate-500">{t("landing.studentsSubtext")}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="bg-slate-50 py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mx-auto max-w-xl text-center">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                {t("landing.featuresTitle")}
              </h2>
              <p className="mt-3 text-sm text-slate-500">
                {t("landing.featuresSubtitle")}
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-100 bg-white p-8">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                  <Users className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-slate-900">
                  {t("landing.collabTitle")}
                </h3>
                <p className="mt-2 text-sm text-slate-500">
                  {t("landing.collabDesc")}
                </p>
              </div>

              <div className="rounded-2xl bg-violet-600 p-8 text-white">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
                  <Search className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold">{t("landing.searchTitle")}</h3>
                <p className="mt-2 text-sm text-violet-100">
                  {t("landing.searchDesc")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="community" className="py-20">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-center text-2xl font-bold text-slate-900 sm:text-3xl">
              {t("landing.trustedTitle")}
            </h2>

            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              {testimonials.map((item) => (
                <div
                  key={item.name}
                  className="rounded-2xl border border-slate-100 bg-white p-6"
                >
                  <div className="flex gap-0.5 text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="mt-4 text-sm text-slate-600">&quot;{t(item.quoteKey)}&quot;</p>
                  <div className="mt-5 flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-100 text-sm font-semibold text-violet-700">
                      {item.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {item.name}
                      </p>
                      <p className="text-xs text-slate-500">{t(item.roleKey)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 pb-20">
          <div className="mx-auto max-w-6xl rounded-3xl bg-violet-600 px-8 py-16 text-center">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              {t("landing.ctaTitle")}
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-violet-100">
              {t("landing.ctaSubtitle")}
            </p>
            <Link
              href="/signup"
              className="mt-8 inline-flex h-11 items-center rounded-full bg-white px-6 text-sm font-medium text-violet-700 transition-colors hover:bg-violet-50"
            >
              {t("landing.ctaButton")}
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
