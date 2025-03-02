import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";

i18n
  .use(HttpApi) // Load translations from JSON files
  .use(LanguageDetector) // Detect browser language
  .use(initReactI18next) // Integrate with React
  .init({
    supportedLngs: ["en", "fr", "ar"], // Supported languages
    fallbackLng: "en", // Default language
    debug: true, // Show debug info in the console
    detection: {
      order: ["localStorage", "cookie", "navigator"], // Language detection order
      caches: ["localStorage", "cookie"], // Store the selected language
    },
    interpolation: {
      escapeValue: false, // Not needed for React
    },
    backend: {
      loadPath: "/locales/{{lng}}/translation.json", // Path to JSON translation files
    },
  });

export default i18n;
