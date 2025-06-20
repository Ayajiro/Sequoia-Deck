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
      appTitle: 'Ippo',
      greeting1: '今天想完成什麼？',
      greeting2: '加油！你可以的！',
      greeting3: '從一個小目標開始吧！',
      tableTime: '時間',
      tableTask: '任務',
      tableDuration: '花費時間',
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
      appTitle: 'Ippo',
      greeting1: 'What do you want to accomplish today?',
      greeting2: 'You can do it!',
      greeting3: 'Start with a small goal!',
      tableTime: 'Time',
      tableTask: 'Task',
      tableDuration: 'Duration',
    },
  },
  ja: {
    translation: {
      history: '履歴',
      placeholder: 'タスクを入力してください...',
      go: '開始',
      pause: '一時停止',
      resume: '再開',
      stop: '停止',
      backHome: 'ホームに戻る',
      historyTitle: '履歴',
      appTitle: 'イッポ',
      greeting1: '今日は何を達成したいですか？',
      greeting2: '頑張って！あなたならできる！',
      greeting3: '小さな目標から始めましょう！',
      tableTime: '時間',
      tableTask: 'タスク',
      tableDuration: '所要時間',
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