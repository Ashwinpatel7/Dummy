'use client';

import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
import { MagnifyingGlassIcon, FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { SearchFilters } from '@/types';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { Listbox, Transition } from '@headlessui/react';
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/20/solid';

interface SearchAndFiltersProps {
  filters: SearchFilters;
  onQueryChange: (query: string) => void;
  onDepartmentsChange: (departments: string[]) => void;
  onRatingRangeChange: (minRating: number, maxRating: number) => void;
  onClearFilters: () => void;
  availableDepartments: string[];
}

const SearchAndFilters: React.FC<SearchAndFiltersProps> = ({
  filters,
  onQueryChange,
  onDepartmentsChange,
  onRatingRangeChange,
  onClearFilters,
  availableDepartments
}) => {
  const [showFilters, setShowFilters] = useState(false);

  const hasActiveFilters = filters.departments.length > 0 || filters.minRating > 0 || filters.maxRating < 5;

  return (
    <div className="space-y-6">
      {/* Premium Search Bar */}
      <div className="glass-card p-6 rounded-3xl animate-slide-up">
        <div className="flex items-center space-x-6">
          <div className="flex-1 relative">
            <div className="absolute left-6 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-gradient-primary rounded-full flex items-center justify-center">
              <MagnifyingGlassIcon className="h-4 w-4 text-white" />
            </div>
            <input
              type="text"
              placeholder="Search elite professionals by name, email, or department..."
              value={filters.query}
              onChange={(e) => onQueryChange(e.target.value)}
              className="w-full pl-16 pr-6 py-4 border-0 rounded-2xl glass text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500/50 focus:bg-white/10 transition-all duration-300 text-lg font-medium shadow-inner backdrop-blur-xl"
            />
          </div>

          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className={`relative px-6 py-3 rounded-2xl transition-all duration-300 hover-lift font-semibold ${
              hasActiveFilters
                ? 'bg-gradient-primary text-white shadow-2xl animate-glow'
                : 'glass border-white/20 text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <div className={`p-2 rounded-xl mr-3 ${hasActiveFilters ? 'bg-white/20' : 'bg-white/10'}`}>
              <FunnelIcon className="h-5 w-5" />
            </div>
            <span className="text-base">
              {hasActiveFilters ? `Active Filters (${filters.departments.length + (filters.minRating > 0 || filters.maxRating < 5 ? 1 : 0)})` : 'Advanced Filters'}
            </span>
            {hasActiveFilters && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-warning rounded-full animate-pulse flex items-center justify-center">
                <span className="text-xs font-bold text-white">{filters.departments.length + (filters.minRating > 0 || filters.maxRating < 5 ? 1 : 0)}</span>
              </div>
            )}
          </Button>

          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="glass border-red-500/30 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-2xl px-4 py-3 font-semibold transition-all duration-300"
            >
              <XMarkIcon className="h-4 w-4 mr-2" />
              Reset All
            </Button>
          )}
        </div>
      </div>

      {/* Filters Panel */}
      <Transition
        show={showFilters}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Card className="relative z-[100]">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-secondary-900 dark:text-white">
                Filters
              </h3>
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClearFilters}
                >
                  <XMarkIcon className="h-4 w-4 mr-1" />
                  Clear All
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Department Filter */}
              <div>
                <label className="block text-sm font-semibold text-secondary-800 dark:text-white mb-3">
                  Departments
                </label>
                <Listbox value={filters.departments} onChange={onDepartmentsChange} multiple>
                  <div className="relative z-[200]">
                    <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white dark:bg-gray-800 py-3 pl-4 pr-10 text-left border-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <span className="block truncate text-gray-900 dark:text-gray-100 font-semibold">
                        {filters.departments.length === 0
                          ? 'All Departments'
                          : `${filters.departments.length} selected`}
                      </span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        <ChevronUpDownIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                      </span>
                    </Listbox.Button>
                    <Transition
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute z-[9999] mt-2 max-h-60 w-full overflow-auto rounded-lg bg-white dark:bg-gray-900 py-2 shadow-2xl ring-1 ring-black ring-opacity-10 focus:outline-none border-2 border-gray-300 dark:border-gray-600">
                        {availableDepartments.map((department) => (
                          <Listbox.Option
                            key={department}
                            value={department}
                            className={({ active }) =>
                              `relative cursor-pointer select-none py-3 pl-10 pr-4 transition-colors ${
                                active
                                  ? 'bg-blue-100 text-blue-900 dark:bg-blue-800 dark:text-blue-100'
                                  : 'text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800'
                              }`
                            }
                          >
                            {({ selected }) => (
                              <>
                                <span className={`block truncate ${selected ? 'font-bold text-blue-600 dark:text-blue-300' : 'font-medium text-gray-900 dark:text-gray-100'}`}>
                                  {department}
                                </span>
                                {selected && (
                                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600 dark:text-blue-300">
                                    <CheckIcon className="h-5 w-5" />
                                  </span>
                                )}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>
              </div>

              {/* Rating Range Filter */}
              <div>
                <label className="block text-sm font-semibold text-secondary-800 dark:text-white mb-3">
                  Performance Rating Range
                </label>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                      Minimum Rating: <span className="font-bold text-blue-600 dark:text-blue-400">{filters.minRating}</span>
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="5"
                      step="1"
                      value={filters.minRating}
                      onChange={(e) => onRatingRangeChange(Number(e.target.value), filters.maxRating)}
                      className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                      Maximum Rating: <span className="font-bold text-blue-600 dark:text-blue-400">{filters.maxRating}</span>
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="5"
                      step="1"
                      value={filters.maxRating}
                      onChange={(e) => onRatingRangeChange(filters.minRating, Number(e.target.value))}
                      className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </Transition>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {filters.departments.map((dept) => (
            <span
              key={dept}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200"
            >
              {dept}
              <button
                onClick={() => onDepartmentsChange(filters.departments.filter(d => d !== dept))}
                className="ml-2 hover:text-primary-600 dark:hover:text-primary-400"
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
            </span>
          ))}
          
          {(filters.minRating > 0 || filters.maxRating < 5) && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-secondary-100 text-secondary-800 dark:bg-secondary-800 dark:text-secondary-200">
              Rating: {filters.minRating}-{filters.maxRating}
              <button
                onClick={() => onRatingRangeChange(0, 5)}
                className="ml-2 hover:text-secondary-600 dark:hover:text-secondary-400"
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchAndFilters;
