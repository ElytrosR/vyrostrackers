import React from 'react';
import { TrendingUp, Target, Trophy, BarChart3 } from 'lucide-react';
import { Statistics } from '../types';

interface StatisticsPanelProps {
  statistics: Statistics;
}

export function StatisticsPanel({ statistics }: StatisticsPanelProps) {
  const stats = [
    {
      label: 'Toplam Galibiyet',
      value: statistics.totalWins,
      icon: Trophy,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
      borderColor: 'border-green-200 dark:border-green-700',
    },
    {
      label: 'Toplam Mağlubiyet',
      value: statistics.totalLosses,
      icon: Target,
      color: 'text-red-600 dark:text-red-400',
      bgColor: 'bg-red-100 dark:bg-red-900/30',
      borderColor: 'border-red-200 dark:border-red-700',
    },
    {
      label: 'Toplam Oyun',
      value: statistics.totalGames,
      icon: BarChart3,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
      borderColor: 'border-blue-200 dark:border-blue-700',
    },
    {
      label: 'Galibiyet Oranı',
      value: `%${statistics.winRate.toFixed(1)}`,
      icon: TrendingUp,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30',
      borderColor: 'border-purple-200 dark:border-purple-700',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className={`p-6 rounded-2xl ${stat.bgColor} border-2 ${stat.borderColor} transition-all duration-300 hover:scale-105 hover:shadow-lg`}
          >
            <div className="flex items-center justify-between mb-3">
              <Icon className={`w-8 h-8 ${stat.color}`} />
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              {stat.value}
            </div>
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {stat.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}