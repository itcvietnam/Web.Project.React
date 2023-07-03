import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
    en: {
      translation: {
        "home": "Home Page",
        "content": {
          "key": "Key String"
        }
      }
    },
    vi: {
      translation: {
        "home": "Trang Chủ"
      }
    }
};

const translation = i18n.use(initReactI18next)
    .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false
    }
});

export default translation;