import React from 'react';
import { Plus, Minus, Trash2 } from 'lucide-react';

interface CounterProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  color: 'blue' | 'green' | 'red' | 'purple' | 'yellow' | 'pink';
  onDelete?: () => void;
}

export function Counter({ label, value, onChange, color, onDelete }: CounterProps) {
  const colorClasses = {
    blue: {
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      border: 'border-blue-200 dark:border-blue-700',
      text: 'text-blue-700 dark:text-blue-300',
      button: 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700',
    },
    green: {
      bg: 'bg-green-50 dark:bg-green-900/20',
      border: 'border-green-200 dark:border-green-700',
      text: 'text-green-700 dark:text-green-300',
      button: 'bg-green-500 hover:bg-green-600 active:bg-green-700',
    },
    red: {
      bg: 'bg-red-50 dark:bg-red-900/20',
      border: 'border-red-200 dark:border-red-700',
      text: 'text-red-700 dark:text-red-300',
      button: 'bg-red-500 hover:bg-red-600 active:bg-red-700',
    },
    purple: {
      bg: 'bg-purple-50 dark:bg-purple-900/20',
      border: 'border-purple-200 dark:border-purple-700',
      text: 'text-purple-700 dark:text-purple-300',
      button: 'bg-purple-500 hover:bg-purple-600 active:bg-purple-700',
    },
    yellow: {
      bg: 'bg-yellow-50 dark:bg-yellow-900/20',
      border: 'border-yellow-200 dark:border-yellow-700',
      text: 'text-yellow-700 dark:text-yellow-300',
      button: 'bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700',
    },
    pink: {
      bg: 'bg-pink-50 dark:bg-pink-900/20',
      border: 'border-pink-200 dark:border-pink-700',
      text: 'text-pink-700 dark:text-pink-300',
      button: 'bg-pink-500 hover:bg-pink-600 active:bg-pink-700',
    },
  };

  const classes = colorClasses[color];

  const handleDecrease = () => {
    if (value > 0) {
      onChange(value - 1);
    }
  };

  const handleIncrease = () => {
    onChange(value + 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    
    // Boş input durumunda 0 yap
    if (inputValue === '') {
      onChange(0);
      return;
    }
    
    // Sayısal değer kontrolü
    const numericValue = parseInt(inputValue, 10);
    if (!isNaN(numericValue) && numericValue >= 0) {
      onChange(numericValue);
    }
  };

  return (
    <div className={`relative p-8 rounded-3xl border-2 ${classes.bg} ${classes.border} transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl`}>
      {/* Silme Butonu */}
      {onDelete && (
        <button
          onClick={onDelete}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200"
          title="Sayacı Sil"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      )}

      {/* Etiket */}
      <h3 className={`text-xl font-bold mb-8 text-center ${classes.text}`}>
        {label}
      </h3>

      {/* Sayaç Kontrolleri */}
      <div className="flex items-center justify-between space-x-4">
        <button
          onClick={handleDecrease}
          disabled={value <= 0}
          className={`p-4 rounded-2xl ${classes.button} text-white transition-all duration-200 hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg hover:shadow-xl`}
          title="Azalt"
        >
          <Minus className="w-6 h-6" />
        </button>
        
        <div className="flex-1 mx-4">
          <input
            type="number"
            value={value}
            onChange={handleInputChange}
            className={`w-full text-center text-4xl font-bold bg-transparent ${classes.text} focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-2xl py-3 min-w-0`}
            min="0"
            title="Değer girin"
          />
        </div>
        
        <button
          onClick={handleIncrease}
          className={`p-4 rounded-2xl ${classes.button} text-white transition-all duration-200 hover:scale-110 active:scale-95 shadow-lg hover:shadow-xl`}
          title="Artır"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}