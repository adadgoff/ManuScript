import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import en from "../../../client/res/locales/en.json";
import ru from "../../../client/res/locales/ru.json";

export const languageResources = {
  en: {translation: en},
  ru: {translation: ru},
}

i18next.use(initReactI18next).init({
  fallbackNS: en,
  compatibilityJSON: "v3",
    lng: "en",
    fallbackLng: "en",
    resources: languageResources,
  }
)

export default i18next;
