'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { BookmarkContextType } from '@/types';

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

interface BookmarkProviderProps {
  children: React.ReactNode;
}


export const BookmarkProvider: React.FC<BookmarkProviderProps> = ({ children }) => {
  const [bookmarks, setBookmarks] = useState<number[]>([]);

  useEffect(() => {
    // Load bookmarks from localStorage on mount
    const savedBookmarks = localStorage.getItem('hr-bookmarks');
    if (savedBookmarks) {
      try {
        const parsed = JSON.parse(savedBookmarks);
        if (Array.isArray(parsed)) {
          setBookmarks(parsed);
        }
      } catch (error) {
        console.error('Failed to parse saved bookmarks:', error);
      }
    }
  }, []);

  useEffect(() => {
    // Save bookmarks to localStorage whenever they change
    localStorage.setItem('hr-bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const addBookmark = (id: number) => {
    setBookmarks(prev => {
      if (!prev.includes(id)) {
        return [...prev, id];
      }
      return prev;
    });
  };

  const removeBookmark = (id: number) => {
    setBookmarks(prev => prev.filter(bookmarkId => bookmarkId !== id));
  };

  const isBookmarked = (id: number) => {
    return bookmarks.includes(id);
  };

  const value: BookmarkContextType = {
    bookmarks,
    addBookmark,
    removeBookmark,
    isBookmarked
  };

  return (
    <BookmarkContext.Provider value={value}>
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarkContext = () => {
  const context = useContext(BookmarkContext);
  if (context === undefined) {
    throw new Error('useBookmarkContext must be used within a BookmarkProvider');
  }
  return context;
};
