'use client';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import '@i18n/i18n';

function formatTime(sec: number) {
  const h = String(Math.floor(sec / 3600)).padStart(2, '0');
  const m = String(Math.floor((sec % 3600) / 60)).padStart(2, '0');
  const s = String(sec % 60).padStart(2, '0');
  return `${h}:${m}:${s}`;
}

interface RecordItem {
  task: string;
  seconds: number;
  time: string;
}

export default function HistoryPage() {
  const [records, setRecords] = useState<RecordItem[]>([]);
  const { t, i18n } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (mounted) {
      const data = localStorage.getItem('kinomi-records');
      if (data) {
        setRecords(JSON.parse(data));
      }
    } else {
      setMounted(true);
    }
  }, [mounted]);

  if (!mounted) return null;

  const handleClearHistory = () => {
    if (window.confirm(t('confirmClearHistory'))) {
      localStorage.removeItem('kinomi-records');
      setRecords([]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-white text-black relative">
      <div className="absolute top-6 left-8 z-10 flex items-center gap-2">
        <span className="text-2xl font-bold tracking-wide select-none">{t('appTitle')}</span>
      </div>
      <div className="absolute top-8 right-8 flex gap-2">
        <button
          onClick={() => i18n.changeLanguage('zh-TW')}
          className={`px-4 py-2 rounded-full border transition-colors duration-150 font-semibold text-sm
            ${i18n.language === 'zh-TW' ? 'bg-black text-white border-black' : 'bg-white text-black border-gray-300 hover:bg-gray-100'}`}
        >
          繁體中文
        </button>
        <button
          onClick={() => i18n.changeLanguage('en')}
          className={`px-4 py-2 rounded-full border transition-colors duration-150 font-semibold text-sm
            ${i18n.language === 'en' ? 'bg-black text-white border-black' : 'bg-white text-black border-gray-300 hover:bg-gray-100'}`}
        >
          English
        </button>
        <button
          onClick={() => i18n.changeLanguage('ja')}
          className={`px-4 py-2 rounded-full border transition-colors duration-150 font-semibold text-sm
            ${i18n.language === 'ja' ? 'bg-black text-white border-black' : 'bg-white text-black border-gray-300 hover:bg-gray-100'}`}
        >
          日本語
        </button>
      </div>
      <div className="flex flex-col items-center w-full max-w-3xl pt-24 pb-24 px-4">
        <h1 className="text-4xl font-bold mb-10 text-center">{t('historyTitle')}</h1>
        <div className="w-full flex justify-center">
          <div
            className="w-full max-w-3xl h-[480px] overflow-y-auto rounded-lg border border-gray-300 bg-white shadow flex justify-center custom-scrollbar"
            style={{scrollbarWidth: 'thin'}}
          >
            <table className="min-w-full relative" >
              <thead className="bg-gray-100 sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-3 text-left text-base font-semibold">{t('tableTime')}</th>
                  <th className="px-6 py-3 text-left text-base font-semibold">{t('tableTask')}</th>
                  <th className="px-6 py-3 text-left text-base font-semibold">{t('tableDuration')}</th>
                </tr>
              </thead>
              <tbody>
                {records.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="text-center py-8 text-gray-400">{t('noRecords')}</td>
                  </tr>
                ) : (
                  records.map((rec, idx) => (
                    <tr key={idx} className="border-t border-gray-200">
                      <td className="px-6 py-4 whitespace-nowrap">{new Date(rec.time).toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-pre-line break-all">{rec.task}</td>
                      <td className="px-6 py-4">{formatTime(rec.seconds)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 左下角返回按鈕 */}
      <button
        className="fixed bottom-8 left-8 px-6 py-2 bg-gray-200 text-black rounded-md font-semibold text-base hover:bg-gray-300 transition-colors duration-150 z-20"
        onClick={() => window.location.href = '/'}
      >
        {t('backHome')}
      </button>

      {/* 右下角清除記錄按鈕 */}
      <button
        className="fixed bottom-8 right-8 px-6 py-2 bg-red-500 text-white rounded-md font-semibold text-base hover:bg-red-600 transition-colors duration-150 z-20"
        onClick={handleClearHistory}
      >
        {t('clearHistory')}
      </button>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 10px;
          background: #f3f4f6;
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #bdbdbd;
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #d1d5db #f3f4f6;
        }
      `}</style>
    </div>
  );
} 