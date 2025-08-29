'use client';

import { useState } from 'react';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import { usePathname } from 'next/navigation';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-extrabold tracking-tight text-purple-700 dark:text-purple-300"
        >
          ✨ TodoApp
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-3">
          <Link
            href="/"
            className={`btn-ghost ${
              pathname === '/' ? 'underline underline-offset-4' : ''
            }`}
          >
            Home
          </Link>
          <Link
            href="/new"
            className={`btn-primary ${
              pathname?.startsWith('/todos/new') ? 'ring-2 ring-white/70' : ''
            }`}
          >
            + Add Todo
          </Link>
          <ThemeToggle />
        </nav>

        {/* Mobile/Tablet Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-purple-700 dark:text-purple-300 focus:outline-none"
        >
          {menuOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile/Tablet Dropdown */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3 flex flex-col items-start glass">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className={`btn-ghost w-full ${
              pathname === '/' ? 'underline underline-offset-4' : ''
            }`}
          >
            Home
          </Link>
          <Link
            href="/new"
            onClick={() => setMenuOpen(false)}
            className={`btn-primary w-full text-center ${
              pathname?.startsWith('/todos/new') ? 'ring-2 ring-white/70' : ''
            }`}
          >
            + Add Todo
          </Link>
        </div>
      )}
    </header>
  );
}
