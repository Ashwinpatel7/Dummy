'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'hr' | 'manager';
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const mockUsers: Record<string, { password: string; user: User }> = {
  'admin@hrpro.com': {
    password: 'SecureAdmin@2024!',
    user: {
      id: '1',
      email: 'admin@hrpro.com',
      name: 'Admin User',
      role: 'admin',
      avatar: 'https://dummyjson.com/icon/admin/128'
    }
  },
  'hr@hrpro.com': {
    password: 'HRManager#2024$',
    user: {
      id: '2',
      email: 'hr@hrpro.com',
      name: 'HR Manager',
      role: 'hr',
      avatar: 'https://dummyjson.com/icon/hr/128'
    }
  },
  'manager@hrpro.com': {
    password: 'TeamLead&2024%',
    user: {
      id: '3',
      email: 'manager@hrpro.com',
      name: 'Team Manager',
      role: 'manager',
      avatar: 'https://dummyjson.com/icon/manager/128'
    }
  }
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Mark as client-side
    setIsClient(true);

    // Check for stored auth on mount
    const checkAuth = () => {
      try {
        const storedUser = localStorage.getItem('hr-auth-user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        }
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('hr-auth-user');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser = mockUsers[email.toLowerCase()];
    
    if (mockUser && mockUser.password === password) {
      setUser(mockUser.user);
      localStorage.setItem('hr-auth-user', JSON.stringify(mockUser.user));
      // Set cookie for middleware
      document.cookie = `hr-auth-user=${JSON.stringify(mockUser.user)}; path=/; max-age=86400`;
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('hr-auth-user');
    // Remove cookie for middleware
    document.cookie = 'hr-auth-user=; path=/; max-age=0';
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isLoading: isLoading || !isClient,
    isAuthenticated: isClient && !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
