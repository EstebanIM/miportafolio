// Simple i18n configuration
export const locales = ['es', 'en'] as const;
export const defaultLocale = 'es' as const;

export type Locale = typeof locales[number];

// Import messages
import esMessages from '../messages/es.json';
import enMessages from '../messages/en.json';

export const messages = {
  es: esMessages,
  en: enMessages,
} as const;

export function getMessages(locale: Locale) {
  return messages[locale] || messages[defaultLocale];
}
