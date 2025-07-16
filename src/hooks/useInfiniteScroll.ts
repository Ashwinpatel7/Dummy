import { useState, useEffect, useCallback } from 'react';

interface UseInfiniteScrollProps<T> {
  data: T[];
  initialItemsPerPage?: number;
  loadMoreThreshold?: number;
}

interface UseInfiniteScrollReturn<T> {
  displayedData: T[];
  hasMore: boolean;
  isLoading: boolean;
  loadMore: () => void;
  reset: () => void;
  totalDisplayed: number;
  totalItems: number;
}

export const useInfiniteScroll = <T>({
  data,
  initialItemsPerPage = 12,
  loadMoreThreshold = 0.8
}: UseInfiniteScrollProps<T>): UseInfiniteScrollReturn<T> => {
  const [displayedCount, setDisplayedCount] = useState(initialItemsPerPage);
  const [isLoading, setIsLoading] = useState(false);

  const displayedData = data.slice(0, displayedCount);
  const hasMore = displayedCount < data.length;
  const totalItems = data.length;

  const loadMore = useCallback(() => {
    if (hasMore && !isLoading) {
      setIsLoading(true);
      
      // Simulate loading delay
      setTimeout(() => {
        setDisplayedCount(prev => Math.min(prev + initialItemsPerPage, data.length));
        setIsLoading(false);
      }, 500);
    }
  }, [hasMore, isLoading, initialItemsPerPage, data.length]);

  const reset = useCallback(() => {
    setDisplayedCount(initialItemsPerPage);
    setIsLoading(false);
  }, [initialItemsPerPage]);

  // Auto-load more when data changes (e.g., after filtering)
  useEffect(() => {
    if (displayedCount > data.length) {
      setDisplayedCount(Math.min(initialItemsPerPage, data.length));
    }
  }, [data.length, displayedCount, initialItemsPerPage]);

  // Scroll event listener for automatic loading
  useEffect(() => {
    const handleScroll = () => {
      if (!hasMore || isLoading) return;

      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      const scrollPercentage = (scrollTop + windowHeight) / documentHeight;

      if (scrollPercentage >= loadMoreThreshold) {
        loadMore();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore, isLoading, loadMore, loadMoreThreshold]);

  return {
    displayedData,
    hasMore,
    isLoading,
    loadMore,
    reset,
    totalDisplayed: displayedData.length,
    totalItems
  };
};
