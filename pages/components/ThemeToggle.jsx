'use client';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [dark, setDark] = useState(null);

  // On mount, check saved theme or system preference
  useEffect(() => {
    const saved = localStorage.getItem('darkMode');
    const prefers = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDark(saved ? saved === 'true' : prefers);
  }, []);

  // Apply/remove dark mode class to <html>
  useEffect(() => {
    if (dark === null) return;

    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    localStorage.setItem('darkMode', String(dark));
  }, [dark]);

  if (dark === null) return null;

  return (
    <button
      onClick={() => setDark(d => !d)}
      aria-label="Toggle theme"
      className="px-4 py-2 rounded-md font-semibold transition-colors duration-300
                 bg-gray-200 dark:bg-gray-800 dark:text-white text-black"
    >
      {dark ? '🌙 Dark Mode' : '☀️ Light Mode'}
    </button>
  );
}
