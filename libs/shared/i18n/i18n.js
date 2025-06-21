import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import ja from './locales/ja.json';
import zhTW from './locales/zh-TW.json';

export const resources = {
  'zh-TW': {
    translation: zhTW,
  },
  en: {
    translation: en,
  },
  ja: {
    translation: ja,
  },
};

// 取得 localStorage 的語言設定
function getSavedLanguage() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('i18n-lang') || undefined;
  }
  return undefined;
}

const defaultLng = getSavedLanguage() || 'zh-TW';

i18n.use(initReactI18next).init({
  resources,
  lng: defaultLng,
  fallbackLng: 'zh-TW',
  interpolation: {
    escapeValue: false,
  },
});

// 監聽語言切換，寫入 localStorage
if (typeof window !== 'undefined') {
  i18n.on('languageChanged', (lng) => {
    localStorage.setItem('i18n-lang', lng);
  });
}

export default i18n; 