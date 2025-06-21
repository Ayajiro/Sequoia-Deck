import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

export const resources = {
  'zh-TW': {
    translation: {
      history: '記錄',
      placeholder: '請輸入任務名稱...',
      go: '開始',
      pause: '暫停',
      resume: '繼續',
      stop: '停止',
      backHome: '回到首頁',
      historyTitle: '歷史紀錄',
      appTitle: '一步',
      greeting1: '你好，要做什麼？',
      greeting2: '今天的任務是？',
      greeting3: '一步一腳印',
      timerTitle: '正在專注於',
      taskLabel: '任務',
      tableTime: '時間',
      tableTask: '任務',
      tableDuration: '持續時間',
      noRecords: '沒有紀錄',
      clearHistory: '清除紀錄',
      confirmClearHistory: '確定要清除所有紀錄嗎？'
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
      noRecords: 'No records found',
      clearHistory: 'Clear History'
    },
  },
  ja: {
    translation: {
      history: '履歴',
      placeholder: 'タスク名を入力してください...',
      go: '進む',
      pause: '一時停止',
      resume: '再開',
      stop: '停止',
      backHome: 'ホームページに戻る',
      historyTitle: '歴史記録',
      appTitle: '一歩',
      greeting1: 'こんにちは、何を始めますか？',
      greeting2: '今日のタスクは何ですか？',
      greeting3: '一歩ずつ、始めましょう',
      timerTitle: '現在、集中しています',
      taskLabel: 'タスク',
      tableTime: '時間',
      tableTask: 'タスク',
      tableDuration: '期間',
      noRecords: '記録はありません',
      clearHistory: '記録を消去',
      confirmClearHistory: '本当にすべての記録を消去しますか？'
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