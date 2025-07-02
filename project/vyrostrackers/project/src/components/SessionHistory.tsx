import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Calendar, Trophy, Target, FileText } from 'lucide-react';
import { GameSession } from '../types';

interface SessionHistoryProps {
  sessions: GameSession[];
}

export function SessionHistory({ sessions }: SessionHistoryProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const sortedSessions = [...sessions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const recentSessions = sortedSessions.slice(0, 5);
  const displaySessions = isExpanded ? sortedSessions : recentSessions;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  if (sessions.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border-2 border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
          <FileText className="w-6 h-6 mr-2 text-blue-600 dark:text-blue-400" />
          Oturum Geçmişi
        </h3>
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
            <Calendar className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            Henüz kayıtlı oturum yok
          </p>
          <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
            Oyunlarınızı kaydetmeye başlayın!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border-2 border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center">
          <FileText className="w-6 h-6 mr-2 text-blue-600 dark:text-blue-400" />
          Oturum Geçmişi
        </h3>
        {sessions.length > 5 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20"
          >
            <span className="text-sm font-medium">
              {isExpanded ? 'Daha Az Göster' : `Tümünü Göster (${sessions.length})`}
            </span>
            {isExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        )}
      </div>
      
      <div className="space-y-4">
        {displaySessions.map((session) => (
          <div
            key={session.id}
            className="p-5 bg-gray-50 dark:bg-gray-700 rounded-xl border-2 border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-200 hover:shadow-md"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {formatDate(session.date)}
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1 bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full">
                  <Trophy className="w-4 h-4 text-green-600 dark:text-green-400" />
                  <span className="text-sm font-bold text-green-600 dark:text-green-400">
                    {session.wins}
                  </span>
                </div>
                <div className="flex items-center space-x-1 bg-red-100 dark:bg-red-900/30 px-3 py-1 rounded-full">
                  <Target className="w-4 h-4 text-red-600 dark:text-red-400" />
                  <span className="text-sm font-bold text-red-600 dark:text-red-400">
                    {session.losses}
                  </span>
                </div>
              </div>
            </div>
            {session.title && (
              <div className="text-sm text-gray-700 dark:text-gray-300 mb-2 font-medium">
                <span className="text-gray-500 dark:text-gray-400">Başlık:</span> {session.title}
              </div>
            )}
            {session.note && (
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <span className="text-gray-500 dark:text-gray-500">Not:</span> {session.note}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}