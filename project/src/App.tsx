import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTheme } from './hooks/useTheme';
import { Home } from './pages/Home';
import { Tracker } from './pages/Tracker';
import { History } from './pages/History';
import { Summary } from './pages/Summary';
import { Navigation } from './components/Navigation';

function App() {
  const { theme } = useTheme();

  // Tema değişikliklerini DOM'a uygula
  useEffect(() => {
    console.log('App tema güncellemesi:', theme);
    const root = document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 transition-all duration-500">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tracker" element={<Tracker />} />
          <Route path="/history" element={<History />} />
          <Route path="/summary" element={<Summary />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;