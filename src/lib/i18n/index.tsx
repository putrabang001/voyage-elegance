'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import en from '@/content/en.json';
import fr from '@/content/fr.json';
import id from '@/content/id.json';

export type Language = 'en' | 'fr' | 'id';

export const languages: { code: Language; name: string; flag: string }[] = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩' },
];

const translations: Record<Language, typeof en> = { en, fr, id };

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

function getNestedValue(obj: Record<string, unknown>, path: string): string {
  const keys = path.split('.');
  let result: unknown = obj;

  for (const key of keys) {
    if (result && typeof result === 'object' && key in result) {
      result = (result as Record<string, unknown>)[key];
    } else {
      return path; // Return the key if not found
    }
  }

  return typeof result === 'string' ? result : path;
}

function detectBrowserLanguage(): Language {
  if (typeof window === 'undefined') return 'en';

  const browserLang = navigator.language.toLowerCase();

  if (browserLang.startsWith('fr')) return 'fr';
  if (browserLang.startsWith('id')) return 'id';

  return 'en';
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Check localStorage first
    const stored = localStorage.getItem('language') as Language | null;
    if (stored && translations[stored]) {
      setLanguageState(stored);
    } else {
      // Detect browser language
      const detected = detectBrowserLanguage();
      setLanguageState(detected);
      localStorage.setItem('language', detected);
    }
    setIsInitialized(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    if (!isInitialized) return key;
    return getNestedValue(translations[language] as unknown as Record<string, unknown>, key);
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}

// Utility function for getting localized content from database
export function getLocalizedField<T extends Record<string, string>>(
  fields: T,
  language: Language,
  suffix: 'En' | 'Fr' | 'Id' = 'En'
): string {
  const key = suffix === 'En' ? 'en' : suffix === 'Fr' ? 'fr' : 'id';
  const langSuffix = suffix.charAt(0).toUpperCase() + suffix.slice(1).toLowerCase();
  return fields[`${langSuffix.charAt(0).toUpperCase()}${langSuffix.slice(1).toLowerCase()}`] || '';
}

// Helper to parse JSON fields stored in database
export function parseJsonField<T>(value: string | null, defaultValue: T): T {
  if (!value) return defaultValue;
  try {
    return JSON.parse(value) as T;
  } catch {
    return defaultValue;
  }
}
