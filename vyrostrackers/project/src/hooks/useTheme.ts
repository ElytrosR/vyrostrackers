import { useState, useEffect } from 'react';

export type Theme = 'light' | 'dark';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const saved = localStorage.getItem('vyros-theme');
      if (saved === 'light' || saved === 'dark') {
        return saved as Theme;
      }
      // Sistem tercihini kontrol et
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
      return 'light';
    } catch (error) {
      console.error('Tema yüklenirken hata:', error);
      return 'light';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('vyros-theme', theme);
      console.log('Tema kaydedildi:', theme);
      
      // DOM'a tema sınıfını uygula
      const root = document.documentElement;
      if (theme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    } catch (error) {
      console.error('Tema kaydedilirken hata:', error);
    }
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    console.log('Tema değiştiriliyor:', theme, '->', newTheme);
    setTheme(newTheme);
  };

  return { theme, toggleTheme };
}