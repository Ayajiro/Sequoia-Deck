'use client';
import React, { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

function formatTime(sec: number) {
  const h = String(Math.floor(sec / 3600)).padStart(2, '0');
  const m = String(Math.floor((sec % 3600) / 60)).padStart(2, '0');
  const s = String(sec % 60).padStart(2, '0');
  return `${h}:${m}:${s}`;
}

export default function TimerPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const task = searchParams.get('task') || '';
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  const handlePause = () => setRunning(false);
  const handleResume = () => setRunning(true);
  const handleStop = () => {
    if (task) {
      const record = { task, seconds, time: new Date().toISOString() };
      const prev = JSON.parse(localStorage.getItem('tasktimer-records') || '[]');
      prev.push(record);
      localStorage.setItem('tasktimer-records', JSON.stringify(prev));
    }
    router.push('/');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <div className="w-full flex justify-center mt-12">
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
            暫停
          </button>
        ) : (
          <button
            className="px-10 py-4 bg-white text-black rounded-md font-semibold text-lg hover:bg-gray-200 transition-colors duration-150"
            onClick={handleResume}
          >
            繼續
          </button>
        )}
        <button
          className="px-10 py-4 bg-red-600 text-white rounded-md font-semibold text-lg hover:bg-red-700 transition-colors duration-150"
          onClick={handleStop}
        >
          停止
        </button>
      </div>
    </div>
  );
} 