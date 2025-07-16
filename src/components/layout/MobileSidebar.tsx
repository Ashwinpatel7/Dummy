'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  HomeIcon,
  UserGroupIcon,
  BookmarkIcon,
  ChartBarIcon,
  SunIcon,
  MoonIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { useTheme } from '@/hooks/useTheme';
import { Transition } from '@headlessui/react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Employees', href: '/', icon: UserGroupIcon },
  { name: 'Bookmarks', href: '/bookmarks', icon: BookmarkIcon },
  { name: 'Analytics', href: '/analytics', icon: ChartBarIcon },
];

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  return (
    <Transition show={isOpen}>
      {/* Backdrop */}
      <Transition.Child
        enter="transition-opacity ease-linear duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity ease-linear duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose} />
      </Transition.Child>

      {/* Sidebar */}
      <Transition.Child
        enter="transition ease-in-out duration-300 transform"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transition ease-in-out duration-300 transform"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >
        <div className="fixed inset-y-0 left-0 flex flex-col w-64 glass backdrop-blur-xl bg-white/90 dark:bg-slate-900/90 border-r border-white/20 dark:border-slate-700/50 shadow-2xl z-50">
          {/* Header */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-white/20 dark:border-slate-700/50">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">HR</span>
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Dashboard
              </h1>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-white/50 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/50 transition-all duration-200"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    'flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group',
                    isActive
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105'
                      : 'text-slate-600 hover:bg-white/50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800/50 dark:hover:text-white hover:shadow-md hover:transform hover:scale-105'
                  )}
                >
                  <item.icon className={cn(
                    "mr-3 h-5 w-5 transition-transform duration-200",
                    isActive ? "text-white" : "group-hover:scale-110"
                  )} />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Theme Toggle */}
          <div className="p-4 border-t border-white/20 dark:border-slate-700/50">
            <button
              onClick={toggleTheme}
              className="flex items-center w-full px-4 py-3 text-sm font-medium text-slate-600 hover:bg-white/50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800/50 dark:hover:text-white rounded-xl transition-all duration-200 hover:shadow-md hover:transform hover:scale-105 group"
            >
              {theme === 'dark' ? (
                <SunIcon className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
              ) : (
                <MoonIcon className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
              )}
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>
        </div>
      </Transition.Child>
    </Transition>
  );
};

export default MobileSidebar;
