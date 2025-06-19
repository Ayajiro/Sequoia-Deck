'use client';
import { useRouter } from 'next/navigation';
import React, { useRef } from 'react';

export default function Index() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleGo = () => {
    const value = inputRef.current?.value.trim() || '';
    if (value) {
      router.push(`/timer?task=${encodeURIComponent(value)}`);
    }
  };

  const handleHistory = () => {
    router.push('/history');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black relative">
      <button
        className="absolute top-8 left-8 px-6 py-2 bg-gray-200 text-black rounded-md font-semibold text-base hover:bg-gray-300 transition-colors duration-150"
        onClick={handleHistory}
      >
        記錄
      </button>
      <h1 className="text-[100px] font-bold text-center select-none">TaskTimer</h1>
      <div className="flex mt-12 w-full max-w-md">
        <input
          ref={inputRef}
          type="text"
          placeholder="Do Something..."
          className="flex-1 px-6 py-4 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-black text-lg bg-white placeholder-gray-400"
          onKeyDown={e => { if (e.key === 'Enter') handleGo(); }}
        />
        <button
          className="px-8 py-4 bg-black text-white rounded-r-md font-semibold text-lg hover:bg-gray-800 transition-colors duration-150"
          onClick={handleGo}
        >
          Go
        </button>
      </div>
    </div>
  );
}
