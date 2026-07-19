"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useAuth } from "@/lib/context/AuthContext";
import { Language, translations, TranslationKey } from "./translations";

interface LanguageContextProps {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(
  undefined,
);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [language, setLanguage] = useState<Language>("en");

  // sync from the user's saved preference once auth finishes loading,
  // without clobbering a change the user just made locally in Settings.
  useEffect(() => {
    if (user?.language === "en" || user?.language === "ne") {
      setLanguage(user.language);
    }
  }, [user?.language]);

  const t = (key: TranslationKey) => {
    return translations[language]?.[key] ?? translations.en[key] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
