import React from 'react';
import { TrendingUp, Trophy, Target, BarChart3, Calendar } from 'lucide-react';
import { useGameSessions } from '../hooks/useGameSessions';

export function Summary() {
  const { sessions, getCounterConfigs } = useGameSessions();
  const counterConfigs = getCounterConfigs();

  // İstatistikleri hesapla
  const totalSessions = sessions.length;
  const totalCounters = counterConfigs.length;

  // Her sayaç için toplamları hesapla
  const counterTotals = counterConfigs.map(config => {
    const total = sessions.reduce((sum, session) => {
      return sum + (session.counters[config.id] || 0);
    }, 0);
    return { ...config, total };
  });

  // Ortalamaları hesapla
  const counterAverages = counterTotals.map(counter => ({
    ...counter,
    average: totalSessions > 0 ? (counter.total / totalSessions).toFixed(1) : '0.0'
  }));

  // Son aktivite (son 7 gün)
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  
  const recentSessions = sessions.filter(session => 
    new Date(session.date) >= sevenDaysAgo
  );

  const colorClasses = {
    blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-700',
    green: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-200 dark:border-green-700',
    red: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border-red-200 dark:border-red-700',
    purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 border-purple-200 dark:border-purple-700',
    yellow: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 border-yellow-200 dark:border-yellow-700',
    pink: 'bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-300 border-pink-200 dark:border-pink-700',
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Başlık */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
          Performans Özeti
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Oyun performansınızı ve trendlerinizi analiz edin
        </p>
      </div>

      {/* Genel İstatistikler */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <Calendar className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            {totalSessions}
          </div>
          <div className="text-gray-600 dark:text-gray-400">
            Toplam Oturum
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <BarChart3 className="w-8 h-8 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            {totalCounters}
          </div>
          <div className="text-gray-600 dark:text-gray-400">
            Aktif Sayaç
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            {recentSessions.length}
          </div>
          <div className="text-gray-600 dark:text-gray-400">
            Oturum (7 gün)
          </div>
        </div>
      </div>

      {/* Sayaç İstatistikleri */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-gray-700 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8 flex items-center">
          <Trophy className="w-8 h-8 mr-3 text-purple-600 dark:text-purple-400" />
          Sayaç İstatistikleri
        </h2>

        {counterAverages.length === 0 ? (
          <div className="text-center py-12">
            <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Henüz sayaç yapılandırılmamış
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {counterAverages.map((counter) => (
              <div
                key={counter.id}
                className={`p-6 rounded-2xl border-2 ${colorClasses[counter.color as keyof typeof colorClasses]}`}
              >
                <h3 className="text-lg font-bold mb-4">
                  {counter.name}
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm opacity-80">Toplam:</span>
                    <span className="text-2xl font-bold">{counter.total}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm opacity-80">Ortalama:</span>
                    <span className="text-xl font-semibold">{counter.average}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Son Aktivite */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8 flex items-center">
          <TrendingUp className="w-8 h-8 mr-3 text-blue-600 dark:text-blue-400" />
          Son Aktivite (Son 7 Gün)
        </h2>

        {recentSessions.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Son aktivite yok
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {recentSessions.slice(0, 5).map((session) => (
              <div
                key={session.id}
                className="p-6 bg-gray-50 dark:bg-gray-700 rounded-2xl border border-gray-200 dark:border-gray-600"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {session.title}
                  </h3>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {new Date(session.date).toLocaleDateString('tr-TR')}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(session.counters).map(([counterId, value]) => {
                    const config = counterConfigs.find(c => c.id === counterId);
                    if (!config) return null;
                    
                    return (
                      <span
                        key={counterId}
                        className={`px-3 py-1 rounded-full text-sm font-medium ${colorClasses[config.color as keyof typeof colorClasses]}`}
                      >
                        {config.name}: {value}
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}