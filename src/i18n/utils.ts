// Translation utility functions

import en from './translations/en.json';
import fr from './translations/fr.json';
import { type Locale, defaultLocale } from './config';

const translations: Record<Locale, typeof en> = { en, fr };

/**
 * Get a translated string by key path (e.g., 'nav.home')
 */
export function t(key: string, locale: Locale = defaultLocale): string {
  const keys = key.split('.');
  let value: any = translations[locale];
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      // Fallback to English if key not found
      value = translations['en'];
      for (const k2 of keys) {
        if (value && typeof value === 'object' && k2 in value) {
          value = value[k2];
        } else {
          return key; // Return key if not found at all
        }
      }
      return value;
    }
  }
  
  return typeof value === 'string' ? value : key;
}

/**
 * Get all translations for a locale
 */
export function getTranslations(locale: Locale = defaultLocale) {
  return translations[locale];
}
