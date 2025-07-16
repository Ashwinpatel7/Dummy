import React from 'react';
import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
  className?: string;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxRating = 5,
  size = 'md',
  showValue = false,
  interactive = false,
  onRatingChange,
  className
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6'
  };

  const handleStarClick = (starRating: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(starRating);
    }
  };

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <div className="flex">
        {Array.from({ length: maxRating }, (_, index) => {
          const starRating = index + 1;
          const isFilled = starRating <= rating;
          
          return (
            <button
              key={index}
              type="button"
              onClick={() => handleStarClick(starRating)}
              disabled={!interactive}
              className={cn(
                'transition-colors',
                interactive ? 'hover:scale-110 cursor-pointer' : 'cursor-default',
                isFilled ? 'text-yellow-400' : 'text-secondary-300 dark:text-secondary-600'
              )}
            >
              {isFilled ? (
                <StarIcon className={sizeClasses[size]} />
              ) : (
                <StarOutlineIcon className={sizeClasses[size]} />
              )}
            </button>
          );
        })}
      </div>
      
      {showValue && (
        <span className="ml-2 text-sm text-secondary-600 dark:text-secondary-400">
          {rating.toFixed(1)}/{maxRating}
        </span>
      )}
    </div>
  );
};

export default StarRating;
