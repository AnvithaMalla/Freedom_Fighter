import React, { createContext, useContext, useState, useEffect } from 'react';
import teData from '../i18n/te.json';
import enData from '../i18n/en.json';

const translations = {
  te: teData,
  en: enData,
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  // Default to Telugu ('te') as requested
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('gfa_language');
    return saved === 'en' ? 'en' : 'te';
  });

  useEffect(() => {
    localStorage.setItem('gfa_language', language);
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'te' ? 'en' : 'te'));
  };

  const setLang = (lang) => {
    if (lang === 'te' || lang === 'en') {
      setLanguage(lang);
    }
  };

  // Translation helper function supporting nested keys e.g. t('masthead.title')
  const t = (path, fallback = '') => {
    const keys = path.split('.');
    let current = translations[language] || translations.te;

    for (const key of keys) {
      if (current && current[key] !== undefined) {
        current = current[key];
      } else {
        // Fallback to Telugu or fallback string
        let fallbackVal = translations.te;
        for (const fKey of keys) {
          if (fallbackVal && fallbackVal[fKey] !== undefined) {
            fallbackVal = fallbackVal[fKey];
          } else {
            return fallback || path;
          }
        }
        return fallbackVal || fallback || path;
      }
    }

    return current;
  };

  const isTelugu = language === 'te';

  return (
    <LanguageContext.Provider value={{ language, setLanguage: setLang, toggleLanguage, t, isTelugu }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
