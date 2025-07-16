'use client';

import React from 'react';
import { Squares2X2Icon, ArrowDownIcon } from '@heroicons/react/24/outline';

interface ViewModeToggleProps {
  mode: 'pagination' | 'infinite';
  onModeChange: (mode: 'pagination' | 'infinite') => void;
}


const ViewModeToggle: React.FC<ViewModeToggleProps> = ({ mode, onModeChange }) => {
  return (
    <div className="flex items-center space-x-2 bg-white/10 dark:bg-gray-800/50 rounded-xl p-1 backdrop-blur-sm">
      <button
        onClick={() => onModeChange('pagination')}
        className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
          mode === 'pagination'
            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/20'
        }`}
      >
        <Squares2X2Icon className="h-4 w-4" />
        <span>Pages</span>
      </button>
      
      <button
        onClick={() => onModeChange('infinite')}
        className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
          mode === 'infinite'
            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/20'
        }`}
      >
        <ArrowDownIcon className="h-4 w-4" />
        <span>Scroll</span>
      </button>
    </div>
  );
};

export default ViewModeToggle;
