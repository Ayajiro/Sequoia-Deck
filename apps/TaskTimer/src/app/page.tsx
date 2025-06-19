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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black">
      <h1 className="text-[100px] font-bold text-center select-none">TaskTimer</h1>
      <div className="flex mt-12 w-full max-w-md">
        <input
          ref={inputRef}
          type="text"
          placeholder="Do Somthing..."
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
