'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
// import ProtectedRoute from '@/components/ProtectedRoute';

interface AuthenticatedLayoutProps {
  children: React.ReactNode;
}

const AuthenticatedLayout: React.FC<AuthenticatedLayoutProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const pathname = usePathname();

  // If we're on the login page, just render the children without the layout
  if (pathname === '/login') {
    return <>{children}</>;
  }

  // Don't render the layout if not authenticated (except for login page)
  if (!isLoading && !isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen relative">
      {/* Background gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900"></div>

      {/* Sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0 relative z-10">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden relative z-10">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AuthenticatedLayout;
