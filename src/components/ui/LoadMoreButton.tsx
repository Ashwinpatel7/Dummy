'use client';

import React from 'react';
import Button from '@/components/ui/Button';
import { ArrowDownIcon } from '@heroicons/react/24/outline';

interface LoadMoreButtonProps {
  onLoadMore: () => void;
  isLoading: boolean;
  hasMore: boolean;
  totalDisplayed: number;
  totalItems: number;
}

const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({
  onLoadMore,
  isLoading,
  hasMore,
  totalDisplayed,
  totalItems
}) => {
  if (!hasMore) {
    return (
      <div className="text-center py-8">
        <div className="glass backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border border-white/20 dark:border-slate-700/50 rounded-2xl shadow-xl p-6 inline-block">
          <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="font-medium">
              All {totalItems} employees loaded
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center py-8">
      <div className="glass backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border border-white/20 dark:border-slate-700/50 rounded-2xl shadow-xl p-6 inline-block">
        <div className="flex flex-col items-center space-y-4">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Showing <span className="font-semibold text-blue-600 dark:text-blue-400">{totalDisplayed}</span> of{' '}
            <span className="font-semibold text-purple-600 dark:text-purple-400">{totalItems}</span> employees
          </div>
          
          <Button
            onClick={onLoadMore}
            loading={isLoading}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center space-x-2"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                <span>Loading...</span>
              </>
            ) : (
              <>
                <ArrowDownIcon className="h-4 w-4" />
                <span>Load More ({totalItems - totalDisplayed} remaining)</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoadMoreButton;
