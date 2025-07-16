import React from 'react';
import Card from './Card';

const SkeletonCard: React.FC = () => {
  return (
    <Card className="animate-pulse">
      <div className="flex items-start space-x-4 mb-6">
        {/* Avatar skeleton */}
        <div className="h-16 w-16 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 rounded-2xl"></div>
        
        {/* Content skeleton */}
        <div className="flex-1 space-y-2">
          <div className="h-5 bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 rounded-lg w-3/4"></div>
          <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 rounded-lg w-1/2"></div>
          <div className="flex space-x-2">
            <div className="h-6 bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 rounded-full w-16"></div>
            <div className="h-6 bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 rounded-full w-20"></div>
          </div>
        </div>
      </div>
      
      {/* Performance section skeleton */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 rounded w-20"></div>
          <div className="h-6 bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 rounded-full w-16"></div>
        </div>
        <div className="bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 p-3 rounded-xl">
          <div className="flex space-x-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-5 w-5 bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 rounded"></div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Buttons skeleton */}
      <div className="flex space-x-2">
        <div className="flex-1 h-10 bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 rounded-xl"></div>
        <div className="h-10 w-10 bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 rounded-xl"></div>
        <div className="h-10 w-20 bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 rounded-xl"></div>
      </div>
    </Card>
  );
};

export default SkeletonCard;
