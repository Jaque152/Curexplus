"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { dictionaries, Language } from "@/lib/dictionaries";

type LanguageContextType = {
  lang: Language;
  setLang: (lang: Language) => void;
  t: typeof dictionaries["es"];
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>("es");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("curexplus-lang") as Language;
    if (stored === "es" || stored === "en") {
      setLang(stored);
    }
  }, []);

  const handleSetLang = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem("curexplus-lang", newLang);
  };

  // SIEMPRE retornamos el Provider. 
  // Ocultamos temporalmente los hijos con CSS solo un instante para evitar el 
  // "flash" de texto en español si el usuario tenía guardado "en" en su localStorage.
  return (
    <LanguageContext.Provider value={{ lang, setLang: handleSetLang, t: dictionaries[lang] }}>
      <div style={{ visibility: mounted ? "visible" : "hidden" }}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage debe usarse dentro de un LanguageProvider");
  }
  return context;
}