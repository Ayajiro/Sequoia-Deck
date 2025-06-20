import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  'zh-TW': {
    translation: {
      history: '記錄',
      placeholder: '請輸入任務...',
      go: '開始',
      pause: '暫停',
      resume: '繼續',
      stop: '停止',
      backHome: '回首頁',
      historyTitle: '歷史記錄',
    },
  },
  en: {
    translation: {
      history: 'History',
      placeholder: 'Do Something...',
      go: 'Go',
      pause: 'Pause',
      resume: 'Resume',
      stop: 'Stop',
      backHome: 'Back Home',
      historyTitle: 'History',
    },
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