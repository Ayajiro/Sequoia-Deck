'use client';
import React, { useEffect, useState } from 'react';

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

  useEffect(() => {
    const data = localStorage.getItem('tasktimer-records');
    if (data) {
      const arr = JSON.parse(data) as RecordItem[];
      setRecords(arr.reverse());
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black">
      <div className="flex flex-col items-center w-full max-w-3xl relative">
        <button
          className="absolute top-0 left-0 px-6 py-2 bg-gray-200 text-black rounded-md font-semibold text-base hover:bg-gray-300 transition-colors duration-150"
          onClick={() => window.location.href = '/'}
        >
          回首頁
        </button>
        <h1 className="text-4xl font-bold mb-10 text-center">歷史記錄</h1>
        <div className="w-full flex justify-center">
          <div
            className="w-full max-w-3xl h-[480px] overflow-y-auto rounded-lg border border-gray-300 bg-white shadow flex justify-center custom-scrollbar"
            style={{scrollbarWidth: 'thin'}}
          >
            <table className="min-w-full relative" >
              <thead className="bg-gray-100 sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-3 text-left text-base font-semibold">Time</th>
                  <th className="px-6 py-3 text-left text-base font-semibold">Task</th>
                  <th className="px-6 py-3 text-left text-base font-semibold">花費時間</th>
                </tr>
              </thead>
              <tbody>
                {records.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="text-center py-8 text-gray-400">無資料</td>
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