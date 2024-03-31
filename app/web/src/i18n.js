import i18n from "i18next";

import { initReactI18next } from "react-i18next";
import en from "../public/assets/translations/en.json"
import ru from "../public/assets/translations/ru.json"

const resources = {
  en: {
    translation: en,
  },
  ru: {
    translation: ru,
  }
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: JSON.parse(localStorage.getItem("language")),
    fallbackLng: "ru",
  })

export default i18n;