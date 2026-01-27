// i18n configuration for Lindisfarn website

export const locales = ['en', 'fr'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  fr: 'Français'
};

// URL mappings for translated slugs
export const routeTranslations: Record<string, Record<Locale, string>> = {
  '/': { en: '/', fr: '/fr/' },
  '/manifesto': { en: '/manifesto', fr: '/fr/manifeste' },
  '/privacy': { en: '/privacy', fr: '/fr/confidentialite' },
  '/terms': { en: '/terms', fr: '/fr/conditions' },
  '/thank-you': { en: '/thank-you', fr: '/fr/merci' }
};

// Get alternate URL for a given path
export function getAlternateUrl(currentPath: string, targetLocale: Locale): string {
  // Find the base route
  for (const [baseRoute, translations] of Object.entries(routeTranslations)) {
    if (Object.values(translations).includes(currentPath) || currentPath === baseRoute) {
      return translations[targetLocale];
    }
  }
  
  // Fallback: just add or remove /fr/ prefix
  if (targetLocale === 'fr' && !currentPath.startsWith('/fr/')) {
    return '/fr' + currentPath;
  }
  if (targetLocale === 'en' && currentPath.startsWith('/fr/')) {
    return currentPath.replace('/fr/', '/').replace('/fr', '/');
  }
  
  return currentPath;
}

// Detect locale from URL path
export function getLocaleFromPath(path: string): Locale {
  return path.startsWith('/fr/') || path === '/fr' ? 'fr' : 'en';
}
