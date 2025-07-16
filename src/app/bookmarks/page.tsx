'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Employee, User } from '@/types';
import { transformUserToEmployee } from '@/lib/utils';
import { useBookmarks } from '@/hooks/useBookmarks';
import { useAuth } from '@/contexts/AuthContext';
import UserCard from '@/components/UserCard';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { BookmarkIcon } from '@heroicons/react/24/outline';

export default function BookmarksPage() {
  // All hooks must be called at the top level - before any early returns
  const [allEmployees, setAllEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { bookmarks, addBookmark, removeBookmark, isBookmarked } = useBookmarks();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, authLoading, router]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://dummyjson.com/users?limit=20');
        
        if (!response.ok) {
          throw new Error('Failed to fetch employees');
        }
        
        const data = await response.json();
        const transformedEmployees = data.users.map((user: User) => 
          transformUserToEmployee(user)
        );
        
        setAllEmployees(transformedEmployees);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  // Show loading while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-200 dark:border-blue-800 rounded-full animate-spin"></div>
          <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-blue-600 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  // Don't render dashboard if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  const bookmarkedEmployees = allEmployees.filter(employee =>
    bookmarks.includes(employee.id)
  );

  const handleBookmark = (id: number) => {
    if (isBookmarked(id)) {
      removeBookmark(id);
    } else {
      addBookmark(id);
    }
  };

  const handlePromote = (id: number) => {
    // In a real app, this would make an API call
    console.log(`Promoting employee with ID: ${id}`);
  };

  const clearAllBookmarks = () => {
    bookmarks.forEach(id => removeBookmark(id));
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-secondary-200 dark:bg-secondary-700 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="h-64 bg-secondary-200 dark:bg-secondary-700 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <div className="text-center py-12">
          <div className="text-red-500 text-lg font-medium mb-2">Error Loading Bookmarks</div>
          <p className="text-secondary-600 dark:text-secondary-400 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-secondary-900 dark:text-white mb-2">
            Bookmarked Employees
          </h1>
          <p className="text-secondary-600 dark:text-secondary-400">
            Your saved employees for quick access
          </p>
        </div>
        
        {bookmarkedEmployees.length > 0 && (
          <Button
            variant="outline"
            onClick={clearAllBookmarks}
            className="text-red-600 border-red-300 hover:bg-red-50 dark:text-red-400 dark:border-red-600 dark:hover:bg-red-900/20"
          >
            Clear All
          </Button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-primary-100 dark:bg-primary-900">
              <BookmarkIcon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-secondary-600 dark:text-secondary-400">
                Total Bookmarks
              </p>
              <p className="text-2xl font-bold text-secondary-900 dark:text-white">
                {bookmarkedEmployees.length}
              </p>
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 dark:bg-green-900">
              <svg className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-secondary-600 dark:text-secondary-400">
                High Performers
              </p>
              <p className="text-2xl font-bold text-secondary-900 dark:text-white">
                {bookmarkedEmployees.filter(emp => emp.performanceRating >= 4).length}
              </p>
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
              <svg className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-secondary-600 dark:text-secondary-400">
                Departments
              </p>
              <p className="text-2xl font-bold text-secondary-900 dark:text-white">
                {new Set(bookmarkedEmployees.map(emp => emp.department)).size}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Bookmarked Employees Grid */}
      {bookmarkedEmployees.length === 0 ? (
        <Card>
          <div className="text-center py-16">
            <BookmarkIcon className="mx-auto h-16 w-16 text-secondary-300 dark:text-secondary-600 mb-4" />
            <h3 className="text-lg font-medium text-secondary-900 dark:text-white mb-2">
              No bookmarks yet
            </h3>
            <p className="text-secondary-500 dark:text-secondary-400 mb-6 max-w-md mx-auto">
              Start bookmarking employees from the main dashboard to keep track of your favorite team members.
            </p>
            <Button
              variant="primary"
              onClick={() => window.location.href = '/'}
            >
              Go to Dashboard
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {bookmarkedEmployees.map((employee) => (
            <UserCard
              key={employee.id}
              employee={employee}
              onView={(id) => console.log(`Viewing employee ${id}`)}
              onBookmark={handleBookmark}
              onPromote={handlePromote}
              isBookmarked={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}
