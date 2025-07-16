import { useBookmarkContext } from '@/contexts/BookmarkContext';

export const useBookmarks = () => {
  return useBookmarkContext();
};
