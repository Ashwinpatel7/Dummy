'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Employee, User } from '@/types';
import { transformUserToEmployee } from '@/lib/utils';
import { useSearch } from '@/hooks/useSearch';
import { useBookmarks } from '@/hooks/useBookmarks';
import { usePagination } from '@/hooks/usePagination';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { useAuth } from '@/contexts/AuthContext';
import UserCard from '@/components/UserCard';
import SearchAndFilters from '@/components/SearchAndFilters';
import CreateUserModal from '@/components/CreateUserModal';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Pagination from '@/components/ui/Pagination';
import ViewModeToggle from '@/components/ui/ViewModeToggle';
import LoadMoreButton from '@/components/ui/LoadMoreButton';
import SkeletonCard from '@/components/ui/SkeletonCard';
import { UserPlusIcon } from '@heroicons/react/24/outline';

export default function Dashboard() {
  // All hooks must be called at the top level - before any early returns
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [viewMode, setViewMode] = useState<'pagination' | 'infinite'>('pagination');
  
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const { bookmarks, addBookmark, removeBookmark, isBookmarked } = useBookmarks();
  
  const {
    filters,
    filteredEmployees,
    updateQuery,
    updateDepartments,
    updateRatingRange,
    clearFilters,
    availableDepartments
  } = useSearch(employees);

  const {
    currentPage,
    totalPages,
    itemsPerPage,
    paginatedData: paginatedEmployees,
    totalItems,
    setCurrentPage,
    setItemsPerPage
  } = usePagination({
    data: filteredEmployees,
    initialItemsPerPage: 12
  });

  const {
    displayedData: infiniteScrollEmployees,
    hasMore,
    isLoading: isLoadingMore,
    loadMore,
    reset: resetInfiniteScroll,
    totalDisplayed
  } = useInfiniteScroll({
    data: filteredEmployees,
    initialItemsPerPage: 12
  });
  
  // Fetch employees data
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

        setEmployees(transformedEmployees);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, authLoading, router]);

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
    // You could show a success toast here
  };

  const handleCreateUser = (newUser: Partial<Employee>) => {
    const employee = newUser as Employee;
    setEmployees(prev => [employee, ...prev]);
    console.log('Created new employee:', employee);
  };

  // Determine which data to display based on view mode
  const displayedEmployees = viewMode === 'pagination' ? paginatedEmployees : infiniteScrollEmployees;
  const displayedCount = viewMode === 'pagination' ? paginatedEmployees.length : totalDisplayed;

  if (loading) {
    return (
      <div className="space-y-6">
        {/* Header skeleton */}
        <div className="text-center mb-8 animate-pulse">
          <div className="h-10 bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 rounded-lg w-80 mx-auto mb-4"></div>
          <div className="h-6 bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 rounded-lg w-96 mx-auto"></div>
        </div>

        {/* Search skeleton */}
        <Card>
          <div className="animate-pulse">
            <div className="h-12 bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 rounded-xl"></div>
          </div>
        </Card>

        {/* Cards skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <div className="text-center py-12">
          <div className="text-red-500 text-lg font-medium mb-2">Error Loading Employees</div>
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
    <div className="space-y-8 p-8 min-h-screen">
      {/* Header */}
      <div className="text-center mb-12 animate-fade-in">
        <div className="flex items-center justify-center space-x-4 mb-6">
          <div className="w-16 h-16 bg-gradient-primary rounded-3xl flex items-center justify-center shadow-2xl animate-glow">
            <span className="text-white font-bold text-2xl">HR</span>
          </div>
          <div className="text-left">
            <h1 className="text-6xl font-bold text-premium mb-2">
              HR Pro Dashboard
            </h1>
            <div className="h-1 w-24 bg-gradient-primary rounded-full"></div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 font-medium">
              Made by Ashwin Patel
            </p>
          </div>
        </div>
        <p className="text-xl text-gray-400 font-medium max-w-3xl mx-auto leading-relaxed">
          Experience premium HR management with cutting-edge analytics platform designed for excellence
        </p>
      </div>

      {/* Search and Filters */}
      <SearchAndFilters
        filters={filters}
        onQueryChange={updateQuery}
        onDepartmentsChange={updateDepartments}
        onRatingRangeChange={updateRatingRange}
        onClearFilters={clearFilters}
        availableDepartments={availableDepartments}
      />

      {/* Premium Stats Summary */}
      <div className="glass-card p-6 rounded-3xl animate-slide-up">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-gradient-primary rounded-full animate-pulse"></div>
              <p className="text-lg font-semibold text-white">
                Showing {displayedCount} of {totalItems} elite professionals
                {viewMode === 'pagination' && totalPages > 1 && (
                  <span className="text-sm text-gray-300 ml-2">
                    (Page {currentPage} of {totalPages})
                  </span>
                )}
              </p>
            </div>

            {filteredEmployees.length > 0 && (
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-gradient-warning rounded-full animate-pulse"></div>
                <div className="text-lg font-semibold text-gradient-accent">
                  {bookmarks.length} starred talents
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <ViewModeToggle
              mode={viewMode}
              onModeChange={(mode) => {
                setViewMode(mode);
                if (mode === 'infinite') {
                  resetInfiniteScroll();
                }
              }}
            />
            
            <Button
              onClick={() => setShowCreateModal(true)}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold px-4 py-2 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center space-x-2"
            >
              <UserPlusIcon className="h-4 w-4" />
              <span>Add Employee</span>
            </Button>
            
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-bold text-green-400 bg-green-400/10 px-4 py-2 rounded-full">
                Live Analytics
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Elite Team Grid */}
      {filteredEmployees.length === 0 ? (
        <div className="glass-card p-12 rounded-3xl text-center animate-fade-in">
          <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 animate-glow">
            <span className="text-white text-3xl">🔍</span>
          </div>
          <div className="text-white text-2xl font-bold mb-4">No Elite Professionals Found</div>
          <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
            Refine your search criteria to discover exceptional talent in our premium database
          </p>
          <button
            onClick={clearFilters}
            className="px-8 py-4 bg-gradient-primary text-white rounded-2xl hover-lift font-semibold text-lg shadow-2xl"
          >
            Reset Search
          </button>
        </div>
      ) : (
        <div>
          <div className="flex items-center space-x-3 mb-8">
            <h2 className="text-3xl font-bold text-gradient-primary">Elite Professionals</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-purple-500/50 to-transparent"></div>
          </div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {displayedEmployees.map((employee) => (
              <motion.div
                key={employee.id}
                variants={{
                  hidden: { opacity: 0, y: 20, scale: 0.9 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 20
                    }
                  }
                }}
              >
                <UserCard
                  employee={employee}
                  onView={(id) => console.log(`Viewing employee ${id}`)}
                  onBookmark={handleBookmark}
                  onPromote={handlePromote}
                  isBookmarked={isBookmarked(employee.id)}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Pagination or Load More */}
          {viewMode === 'pagination' && totalPages > 1 && (
            <div className="mt-8">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
                onItemsPerPageChange={setItemsPerPage}
              />
            </div>
          )}

          {viewMode === 'infinite' && (
            <div className="mt-8">
              <LoadMoreButton
                onLoadMore={loadMore}
                isLoading={isLoadingMore}
                hasMore={hasMore}
                totalDisplayed={totalDisplayed}
                totalItems={totalItems}
              />
            </div>
          )}
        </div>
      )}

      {/* Create User Modal */}
      <CreateUserModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreateUser={handleCreateUser}
      />
    </div>
  );
}
