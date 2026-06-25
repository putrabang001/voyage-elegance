'use client';

import { forwardRef, ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
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
    const baseStyles =
      'inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocean-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ocean-900 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
      primary:
        'bg-coral-500 text-white hover:bg-coral-600 active:scale-[0.98] shadow-md hover:shadow-lg hover:shadow-coral-500/25',
      secondary:
        'bg-ocean-600 text-white hover:bg-ocean-500 active:scale-[0.98]',
      outline:
        'bg-transparent border-2 border-ocean-400 text-ocean-300 hover:bg-ocean-800 hover:border-ocean-300',
      ghost:
        'bg-transparent text-gray-300 hover:bg-white/10 hover:text-white',
      danger:
        'bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-5 py-2.5 text-base',
      lg: 'px-8 py-3.5 text-lg',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <span className="loading-spinner" />
            <span>Loading...</span>
          </>
        ) : (
          <>
            {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
