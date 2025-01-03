import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from "./locales/en/langue1.json"
import fr from "./locales/fr/langue1.json" 
import es from "./locales/es/langue1.json"
i18n
  .use(initReactI18next) // This is important
  .init({
    lng: 'en', // Default language
    fallbackLng: 'en', // Fallback language
    resources: {
      en: { translation: en },
      fr: { translation: fr },
      es : {translation:es}
    },
    interpolation: {
      escapeValue: false, // React already escapes from XSS
    },
  });

export default i18n;
