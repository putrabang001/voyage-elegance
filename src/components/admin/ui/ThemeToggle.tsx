'use client';

import { useTheme } from '@/lib/theme';
import { Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function ThemeToggle({ className, size = 'md' }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        'relative flex items-center justify-center rounded-xl',
        'bg-[var(--muted)] hover:bg-[var(--muted-foreground)]/20',
        'text-[var(--muted-foreground)] hover:text-[var(--foreground)]',
        'transition-all duration-200',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]',
        sizeClasses[size],
        className
      )}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <span
        className={cn(
          'absolute transition-all duration-300',
          iconSizes[size],
          theme === 'light'
            ? 'opacity-100 rotate-0 scale-100'
            : 'opacity-0 rotate-90 scale-0'
        )}
      >
        <Sun className="w-full h-full" />
      </span>
      <span
        className={cn(
          'absolute transition-all duration-300',
          iconSizes[size],
          theme === 'dark'
            ? 'opacity-100 rotate-0 scale-100'
            : 'opacity-0 -rotate-90 scale-0'
        )}
      >
        <Moon className="w-full h-full" />
      </span>
    </button>
  );
}

export default ThemeToggle;
