// src/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      welcome: 'Welcome to the Symptom Checker',
      describeSymptoms: 'Describe your symptoms',
      analyzeSymptoms: 'Analyze Symptoms',
      // Add more keys as needed
    },
  },
  kn: {
    translation: {
      welcome: 'ಲಕ್ಷಣ ತಪಾಸಕಕ್ಕೆ ಸ್ವಾಗತ',
      describeSymptoms: 'ನಿಮ್ಮ ಲಕ್ಷಣಗಳನ್ನು ವಿವರಿಸಿ',
      analyzeSymptoms: 'ಲಕ್ಷಣಗಳನ್ನು ವಿಶ್ಲೇಷಿಸಿ',
      // Add more keys as needed
    },
  },
  // Add more languages here
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    detection: {
      order: ['navigator', 'localStorage', 'htmlTag'],
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
