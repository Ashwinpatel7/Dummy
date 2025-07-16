import React from 'react';
import { cn } from '@/lib/utils';
import { BadgeProps } from '@/types';

const Badge: React.FC<BadgeProps> = ({
  children,
  variant,
  size = 'md',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center font-medium rounded-full';
  
  const variants = {
    primary: 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg',
    secondary: 'bg-gradient-to-r from-slate-100 to-slate-200 text-slate-800 dark:from-slate-700 dark:to-slate-600 dark:text-slate-200 shadow-md',
    success: 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg',
    warning: 'bg-gradient-to-r from-yellow-500 to-orange-600 text-white shadow-lg',
    danger: 'bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-lg'
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base'
  };

  return (
    <span
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size]
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;
