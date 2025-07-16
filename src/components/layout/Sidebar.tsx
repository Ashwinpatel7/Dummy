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
  ArrowRightOnRectangleIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline';
import { useTheme } from '@/hooks/useTheme';
import { useAuth } from '@/contexts/AuthContext';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Employees', href: '/dashboard', icon: UserGroupIcon },
  { name: 'Bookmarks', href: '/bookmarks', icon: BookmarkIcon },
  { name: 'Analytics', href: '/analytics', icon: ChartBarIcon },
];

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  return (
    <div className="flex flex-col w-72 glass-card border-r border-white/15 h-screen shadow-2xl animate-slide-up">
      {/* Logo */}
      <div className="flex items-center justify-center h-20 px-6 border-b border-white/10">
        <div className="flex items-center space-x-4 animate-scale-in">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-2xl animate-glow">
              <span className="text-white font-bold text-lg">HR</span>
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-accent rounded-full animate-pulse"></div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-premium">HR Elite</h1>
            <p className="text-sm text-gray-400 font-medium">Premium Dashboard</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-6 py-8 space-y-3">
        {navigation.map((item, index) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'group flex items-center space-x-4 px-6 py-4 rounded-2xl transition-all duration-300 hover-lift animate-slide-up relative overflow-hidden',
                isActive
                  ? 'bg-gradient-primary text-white shadow-2xl'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {isActive && (
                <div className="absolute inset-0 bg-gradient-primary opacity-20 animate-pulse"></div>
              )}
              <div className={cn(
                'p-2 rounded-xl transition-all duration-300',
                isActive
                  ? 'bg-white/20 shadow-lg'
                  : 'group-hover:bg-white/10'
              )}>
                <item.icon className="h-5 w-5" />
              </div>
              <span className="font-semibold text-base tracking-wide">{item.name}</span>
              {isActive && (
                <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-6 border-t border-white/10">
        <div className="glass p-4 rounded-2xl mb-4">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-8 h-8 bg-gradient-accent rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-white">v2</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-white">HR Elite Dashboard</p>
              <p className="text-xs text-gray-400">Premium Edition</p>
            </div>
          </div>
          <div className="text-xs text-gray-500 font-medium">
            © 2024 Elite Solutions
          </div>
        </div>

        {/* User Profile */}
        {user && (
          <div className="glass p-4 rounded-2xl mb-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <UserCircleIcon className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">{user.name}</p>
                <p className="text-xs text-gray-400 capitalize">{user.role}</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="flex items-center w-full px-3 py-2 text-xs font-medium text-red-300 hover:text-red-200 hover:bg-red-500/10 rounded-xl transition-all duration-200 group"
            >
              <ArrowRightOnRectangleIcon className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
              Sign Out
            </button>
          </div>
        )}

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="flex items-center w-full px-4 py-3 text-sm font-semibold text-gray-300 hover:text-white hover:bg-white/10 rounded-2xl transition-all duration-300 hover-lift group"
        >
          <div className="p-2 rounded-xl bg-white/10 mr-3 group-hover:bg-white/20 transition-all duration-300">
            {theme === 'dark' ? (
              <SunIcon className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
            ) : (
              <MoonIcon className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
            )}
          </div>
          {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
