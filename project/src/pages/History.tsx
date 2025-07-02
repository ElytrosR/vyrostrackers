import React, { useState } from 'react';
import { Trash2, Calendar, Trophy } from 'lucide-react';
import { useGameSessions } from '../hooks/useGameSessions';
import { formatDate } from '../utils/dateUtils';

export function History() {
  const { sessions, deleteSession, getCounterConfigs } = useGameSessions();
  const [filter, setFilter] = useState('');
  const counterConfigs = getCounterConfigs();

  const filteredSessions = sessions.filter(session =>
    session.title.toLowerCase().includes(filter.toLowerCase())
  );

  const sortedSessions = [...filteredSessions].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const handleDeleteSession = (sessionId: string) => {
    if (confirm('Bu oturumu silmek istediğinizden emin misiniz?')) {
      deleteSession(sessionId);
    }
  };

  const getCounterName = (counterId: string) => {
    const config = counterConfigs.find(c => c.id === counterId);
    return config?.name || counterId;
  };

  const getCounterColor = (counterId: string) => {
    const config = counterConfigs.find(c => c.id === counterId);
    return config?.color || 'blue';
  };

  const colorClasses = {
    blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300',
    green: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300',
    red: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300',
    purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300',
    yellow: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300',
    pink: 'bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-300',
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Başlık */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
          Oturum Geçmişi
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Oyun oturumlarınızı inceleyin ve yönetin
        </p>
      </div>

      {/* Filtre */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl border border-gray-200 dark:border-gray-700 mb-8">
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Oturumları başlığa göre arayın..."
          className="w-full p-4 text-lg border-2 border-gray-300 dark:border-gray-600 rounded-2xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
        />
      </div>

      {/* Oturum Listesi */}
      {sortedSessions.length === 0 ? (
        <div className="text-center py-16">
          <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Oturum Bulunamadı
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {filter ? 'Arama filtrenizi ayarlamayı deneyin' : 'Oyun oturumlarınızı takip etmeye başlayın!'}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {sortedSessions.map((session) => (
            <div
              key={session.id}
              className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    {session.title}
                  </h3>
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <Calendar className="w-5 h-5 mr-2" />
                    <span>{formatDate(session.date)}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteSession(session.id)}
                  className="p-3 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-200"
                  title="Oturumu Sil"
                >
                  <Trash2 className="w-6 h-6" />
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Object.entries(session.counters).map(([counterId, value]) => (
                  <div
                    key={counterId}
                    className={`p-4 rounded-2xl ${colorClasses[getCounterColor(counterId) as keyof typeof colorClasses]}`}
                  >
                    <div className="text-sm font-medium opacity-80 mb-1">
                      {getCounterName(counterId)}
                    </div>
                    <div className="text-2xl font-bold">
                      {value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}