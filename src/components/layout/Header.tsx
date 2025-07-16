'use client';

import React, { useState } from 'react';
import { Bars3Icon, BellIcon } from '@heroicons/react/24/outline';
// import { cn } from '@/lib/utils';
import MobileSidebar from './MobileSidebar';

interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ title = 'Dashboard' }) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <>
      <header className="glass backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border-b border-white/20 dark:border-slate-700/50 px-6 py-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-white/50 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/50 transition-all duration-200 hover:shadow-md"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>

            <h1 className="ml-4 lg:ml-0 text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {title}
            </h1>
          </div>

        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-white/50 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/50 transition-all duration-200 hover:shadow-md relative">
            <BellIcon className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-pulse"></span>
          </button>

          {/* User Avatar */}
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg ring-2 ring-white/20">
              <span className="text-sm font-bold text-white">AD</span>
            </div>
            <div className="ml-3 hidden md:block">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                Admin User
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                admin@company.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>

    {/* Mobile Sidebar */}
    <MobileSidebar
      isOpen={isMobileSidebarOpen}
      onClose={() => setIsMobileSidebarOpen(false)}
    />
  </>
  );
};

export default Header;
