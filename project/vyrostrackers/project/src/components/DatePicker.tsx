import React from 'react';
import { Calendar } from 'lucide-react';

interface DatePickerProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
}

export function DatePicker({ selectedDate, onDateChange }: DatePickerProps) {
  const formatDateForDisplay = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl border-2 border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-200">
        <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0" />
        <div className="flex-1">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => onDateChange(e.target.value)}
            className="w-full bg-transparent text-gray-900 dark:text-gray-100 focus:outline-none text-lg font-medium cursor-pointer"
          />
        </div>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
        {formatDateForDisplay(selectedDate)}
      </p>
    </div>
  );
}