"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { handleUpdateSettings } from "@/lib/actions/auth-action";

const LANGUAGES: { value: "en" | "ne"; label: string }[] = [
  { value: "en", label: "English" },
  { value: "ne", label: "Nepali (नेपाली)" },
];

export default function LanguageSelect({
  initialLanguage,
}: {
  initialLanguage: "en" | "ne";
}) {
  const [language, setLanguage] = useState(initialLanguage);
  const [pending, setPending] = useState(false);

  const onChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const next = e.target.value as "en" | "ne";
    const previous = language;
    setLanguage(next);
    setPending(true);

    const result = await handleUpdateSettings({ language: next });
    setPending(false);

    if (!result.success) {
      setLanguage(previous);
      toast.error(result.message || "Failed to update language");
    } else {
      toast.success("Language preference saved");
    }
  };

  return (
    <select
      value={language}
      onChange={onChange}
      disabled={pending}
      className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-violet-200 disabled:opacity-60"
    >
      {LANGUAGES.map((lang) => (
        <option key={lang.value} value={lang.value}>
          {lang.label}
        </option>
      ))}
    </select>
  );
}
