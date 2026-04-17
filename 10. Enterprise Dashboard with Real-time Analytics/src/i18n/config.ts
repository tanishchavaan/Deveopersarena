import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  lng: 'en',
  resources: {
    en: {
      translations: {
        dashboard: "Dashboard",
        analytics: "Analytics"
      }
    }
  },
  ns: ['translations'],
  defaultNS: 'translations'
});

export default i18n;
