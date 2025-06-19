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
      <a
        href="https://github.com/Ayajiro/Sequoia-Deck"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 text-gray-600 hover:text-black text-lg z-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-7 h-7"
        >
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.084-.729.084-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.835 2.807 1.305 3.495.998.108-.775.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.236-3.22-.135-.303-.54-1.523.104-3.176 0 0 1.008-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.29-1.552 3.297-1.23 3.297-1.23.645 1.653.24 2.873.12 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.807 5.625-5.48 5.92.43.37.823 1.096.823 2.21 0 1.595-.014 2.88-.014 3.27 0 .32.216.694.825.576C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
        </svg>
        <span>Sequoia Deck | TaskTimer by Ayajiro</span>
      </a>
    </div>
  );
}
