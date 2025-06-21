'use client';
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from 'react-i18next';
import '../i18n';

function formatTime(sec: number) {
  const h = String(Math.floor(sec / 3600)).padStart(2, '0');
  const m = String(Math.floor((sec % 3600) / 60)).padStart(2, '0');
  const s = String(sec % 60).padStart(2, '0');
  return `${h}:${m}:${s}`;
}

export default function TimerPage() {
  const router = useRouter();
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { t, i18n } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const [task, setTask] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      const searchParams = new URLSearchParams(window.location.search);
      setTask(searchParams.get('task') || '');
    }
  }, [mounted]);

  useEffect(() => {
    if (!running) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  useEffect(() => {
    if (mounted && seconds > 0 && seconds % 5 === 0) {
      const prev = JSON.parse(localStorage.getItem('ippo-records') || '[]');
      const now = new Date();
      prev.unshift({ task: task, time: 5, date: now.toISOString() });
      localStorage.setItem('ippo-records', JSON.stringify(prev));
    }
  }, [seconds, mounted, task]);

  const handlePause = () => setRunning(false);
  const handleResume = () => setRunning(true);
  const handleStop = () => {
    if (task) {
      const record = { task, seconds, time: new Date().toISOString() };
      const prev = JSON.parse(localStorage.getItem('ippo-records') || '[]');
      prev.push(record);
      localStorage.setItem('ippo-records', JSON.stringify(prev));
    }
    router.push('/');
  };

  const isReady = mounted && task !== null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <div className="absolute top-6 left-8 z-10 flex items-center gap-2">
        <span className="text-2xl font-bold tracking-wide select-none text-white">{t('appTitle')}</span>
      </div>
      {isReady ? (
        <>
          <div className="w-full flex justify-between mt-12 px-8">
            <div></div>
            <div className="flex gap-2">
              <button
                onClick={() => i18n.changeLanguage('zh-TW')}
                className={`px-4 py-2 rounded-full border transition-colors duration-150 font-semibold text-sm
                  ${i18n.language === 'zh-TW' ? 'bg-white text-black border-white' : 'bg-black text-white border-gray-300 hover:bg-gray-800'}`}
              >
                繁體中文
              </button>
              <button
                onClick={() => i18n.changeLanguage('en')}
                className={`px-4 py-2 rounded-full border transition-colors duration-150 font-semibold text-sm
                  ${i18n.language === 'en' ? 'bg-white text-black border-white' : 'bg-black text-white border-gray-300 hover:bg-gray-800'}`}
              >
                English
              </button>
              <button
                onClick={() => i18n.changeLanguage('ja')}
                className={`px-4 py-2 rounded-full border transition-colors duration-150 font-semibold text-sm
                  ${i18n.language === 'ja' ? 'bg-white text-black border-white' : 'bg-black text-white border-gray-300 hover:bg-gray-800'}`}
              >
                日本語
              </button>
            </div>
          </div>
          <div className="w-full flex justify-center mt-4">
            <h2 className="text-3xl font-semibold text-center break-all max-w-2xl">{task}</h2>
          </div>
          <div className="flex-1 flex flex-col justify-center items-center w-full">
            <span className="text-[120px] font-bold select-none tracking-widest">{formatTime(seconds)}</span>
          </div>
          <div className="flex gap-8 mb-16">
            {running ? (
              <button
                className="px-10 py-4 bg-white text-black rounded-md font-semibold text-lg hover:bg-gray-200 transition-colors duration-150"
                onClick={handlePause}
              >
                {t('pause')}
              </button>
            ) : (
              <button
                className="px-10 py-4 bg-white text-black rounded-md font-semibold text-lg hover:bg-gray-200 transition-colors duration-150"
                onClick={handleResume}
              >
                {t('resume')}
              </button>
            )}
            <button
              className="px-10 py-4 bg-red-600 text-white rounded-md font-semibold text-lg hover:bg-red-700 transition-colors duration-150"
              onClick={handleStop}
            >
              {t('stop')}
            </button>
          </div>
        </>
      ) : (
        <div className="text-lg text-gray-400">載入中...</div>
      )}
    </div>
  );
} 