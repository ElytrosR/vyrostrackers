import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Trophy, BarChart3, History } from 'lucide-react';

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Ana Bölüm */}
        <div className="mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-600 rounded-3xl mb-8 shadow-2xl">
            <Trophy className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Vyros Tracker
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Oyun performansınızı hassas takip ile yükseltin. Galibiyetler, mağlubiyetler ve özel metrikleri ciddi oyuncular için tasarlanmış şık, modern arayüzle izleyin.
          </p>
        </div>

        {/* Aksiyon Butonları */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <button
            onClick={() => navigate('/tracker')}
            className="group relative p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-200 dark:border-gray-700"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-600 rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            <Play className="w-12 h-12 text-purple-600 dark:text-purple-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Oturum Başlat</h3>
            <p className="text-gray-600 dark:text-gray-400">Oyun performansınızı takip etmeye başlayın</p>
          </button>

          <button
            onClick={() => navigate('/summary')}
            className="group relative p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-200 dark:border-gray-700"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            <BarChart3 className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">İstatistikleri Görüntüle</h3>
            <p className="text-gray-600 dark:text-gray-400">Performans analizlerinizi inceleyin</p>
          </button>
        </div>

        {/* Özellikler */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-white/50 dark:bg-gray-800/50 rounded-2xl backdrop-blur-sm border border-gray-200 dark:border-gray-700">
            <Trophy className="w-8 h-8 text-purple-600 dark:text-purple-400 mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Özel Sayaçlar</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Kendi performans metriklerinizi oluşturun ve adlandırın</p>
          </div>
          <div className="p-6 bg-white/50 dark:bg-gray-800/50 rounded-2xl backdrop-blur-sm border border-gray-200 dark:border-gray-700">
            <History className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Oturum Geçmişi</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Geçmiş oyun oturumlarınızı inceleyin ve yönetin</p>
          </div>
          <div className="p-6 bg-white/50 dark:bg-gray-800/50 rounded-2xl backdrop-blur-sm border border-gray-200 dark:border-gray-700">
            <BarChart3 className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Performans Analizi</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Trendleri takip edin ve oyununuzu geliştirin</p>
          </div>
        </div>
      </div>
    </div>
  );
}