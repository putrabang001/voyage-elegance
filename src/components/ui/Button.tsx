'use client';

import { forwardRef, ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children?: ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    // Size styles
    const sizeStyles = {
      sm: 'h-8 px-3 text-xs gap-1.5 rounded-lg',
      md: 'h-10 px-4 text-sm gap-2 rounded-xl',
      lg: 'h-12 px-6 text-base gap-2.5 rounded-xl',
      icon: 'h-10 w-10 rounded-xl',
    };

    // Variant styles
    const variantStyles = {
      primary: [
        'bg-blue-600 text-white',
        'hover:bg-blue-700 active:bg-blue-800',
        'shadow-sm shadow-blue-600/25',
        'hover:shadow-md hover:shadow-blue-600/30',
        'active:scale-[0.98]',
      ].join(' '),
      secondary: [
        'bg-slate-900 text-white',
        'hover:bg-slate-800 active:bg-slate-700',
        'shadow-sm shadow-slate-900/25',
        'hover:shadow-md hover:shadow-slate-900/30',
        'active:scale-[0.98]',
      ].join(' '),
      outline: [
        'bg-transparent border border-slate-200 text-slate-700',
        'hover:bg-slate-50 hover:border-slate-300',
        'active:bg-slate-100',
      ].join(' '),
      ghost: [
        'bg-transparent text-slate-600',
        'hover:bg-slate-100 hover:text-slate-900',
        'active:bg-slate-200',
      ].join(' '),
      danger: [
        'bg-red-600 text-white',
        'hover:bg-red-700 active:bg-red-800',
        'shadow-sm shadow-red-600/25',
        'hover:shadow-md hover:shadow-red-600/30',
        'active:scale-[0.98]',
      ].join(' '),
      success: [
        'bg-emerald-600 text-white',
        'hover:bg-emerald-700 active:bg-emerald-800',
        'shadow-sm shadow-emerald-600/25',
        'hover:shadow-md shadow-emerald-600/30',
        'active:scale-[0.98]',
      ].join(' '),
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          // Base styles
          [
            'inline-flex items-center justify-center',
            'font-medium',
            'transition-all duration-150',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
            'disabled:pointer-events-none disabled:opacity-50',
          ].join(' '),

          // Size
          sizeStyles[size],

          // Variant
          variantStyles[variant],

          // Custom className
          className
        )}
        {...props}
      >
        {isLoading ? (
          <>
            {/* Spinner */}
            <svg
              className="animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018 8 8 8 0 000-16 8 8 0 018 8 8 8 0 000-16 8 8 0 018 8 8 8 0 000-16 8 8 0 01-16-16 8 8 0 0116 8 8 8 0 01-16 8 8 8 0 0116 8 8 8 0 01-16 8 8 8 0 0116-8z"
              />
            </svg>
            <span>Loading...</span>
          </>
        ) : (
          <>
            {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
            {children && <span>{children}</span>}
            {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
