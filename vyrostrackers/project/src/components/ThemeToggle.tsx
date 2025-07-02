import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Theme } from '../types';

interface ThemeToggleProps {
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
}

export function ThemeToggle({ theme, onThemeChange }: ThemeToggleProps) {
  const handleToggle = () => {
    onThemeChange(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button
      onClick={handleToggle}
      className="p-3 rounded-xl bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-200 hover:scale-105 active:scale-95"
      aria-label="Tema değiştir"
      title={theme === 'light' ? 'Karanlık moda geç' : 'Açık moda geç'}
    >
      {theme === 'light' ? (
        <Moon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
      ) : (
        <Sun className="w-6 h-6 text-yellow-500" />
      )}
    </button>
  );
}