import React, { createContext, useState } from "react";

export const LanguageContext = createContext();

export default function LanguageProvider({ children }) {
  /**
   * Modal Initial Context
   */
  const [lang, setLang] = useState("FR");

  function change_lang(newVal) {
    setLang(newVal);
  }

  return (
    <LanguageContext.Provider value={{ lang, change_lang }}>
      {children}
    </LanguageContext.Provider>
  );
}
