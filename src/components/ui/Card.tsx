'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

// ============================================
// CARD COMPONENT
// Premium card with subtle shadow and border
// ============================================

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
  onClick?: () => void;
}

function Card({
  children,
  className,
  padding = 'md',
  hover = false,
  onClick,
}: CardProps) {
  const paddingStyles = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        // Base styles
        [
          'bg-white rounded-2xl',
          'border border-slate-100',
          'shadow-sm',
        ].join(' '),

        // Padding
        paddingStyles[padding],

        // Hover effect
        hover && [
          'transition-all duration-200',
          'hover:shadow-md hover:border-slate-200',
          'hover:-translate-y-0.5',
          onClick && 'cursor-pointer',
        ].join(' '),

        // Custom className
        className
      )}
    >
      {children}
    </div>
  );
}

// ============================================
// CARD HEADER
// ============================================

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
  action?: ReactNode;
}

function CardHeader({ children, className, action }: CardHeaderProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-between mb-4',
        className
      )}
    >
      <div className="flex-1">{children}</div>
      {action && <div className="flex-shrink-0 ml-4">{action}</div>}
    </div>
  );
}

// ============================================
// CARD TITLE
// ============================================

interface CardTitleProps {
  children: ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

function CardTitle({
  children,
  className,
  as: Tag = 'h3',
}: CardTitleProps) {
  return (
    <Tag
      className={cn(
        'text-lg font-semibold text-slate-900',
        className
      )}
    >
      {children}
    </Tag>
  );
}

// ============================================
// CARD DESCRIPTION
// ============================================

interface CardDescriptionProps {
  children: ReactNode;
  className?: string;
}

function CardDescription({ children, className }: CardDescriptionProps) {
  return (
    <p className={cn('text-sm text-slate-500 mt-1', className)}>
      {children}
    </p>
  );
}

// ============================================
// CARD CONTENT
// ============================================

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

function CardContent({ children, className }: CardContentProps) {
  return <div className={cn('', className)}>{children}</div>;
}

// ============================================
// CARD FOOTER
// ============================================

interface CardFooterProps {
  children: ReactNode;
  className?: string;
  bordered?: boolean;
}

function CardFooter({
  children,
  className,
  bordered = true,
}: CardFooterProps) {
  return (
    <div
      className={cn(
        bordered && 'mt-4 pt-4 border-t border-slate-100',
        'flex items-center gap-3',
        className
      )}
    >
      {children}
    </div>
  );
}

// ============================================
// PREMIUM STAT CARD
// For KPIs and metrics
// ============================================

interface StatCardProps {
  label: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon?: ReactNode;
  iconClassName?: string;
  className?: string;
}

function StatCard({
  label,
  value,
  change,
  changeLabel,
  icon,
  iconClassName = 'bg-blue-100 text-blue-600',
  className,
}: StatCardProps) {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;

  return (
    <div
      className={cn(
        // Base
        'relative overflow-hidden rounded-2xl p-6',
        'bg-white border border-slate-100',
        'shadow-sm',
        'transition-all duration-200',
        'hover:shadow-md hover:border-slate-200',
        className
      )}
    >
      {/* Icon */}
      {icon && (
        <div
          className={cn(
            'w-12 h-12 rounded-xl flex items-center justify-center mb-4',
            iconClassName
          )}
        >
          {icon}
        </div>
      )}

      {/* Label */}
      <p className="text-sm font-medium text-slate-500 mb-1">{label}</p>

      {/* Value */}
      <div className="flex items-end gap-3">
        <h3 className="text-3xl font-bold text-slate-900">{value}</h3>

        {/* Change indicator */}
        {change !== undefined && (
          <span
            className={cn(
              'text-sm font-medium mb-1 flex items-center gap-1',
              isPositive && 'text-emerald-600',
              isNegative && 'text-red-600',
              !isPositive && !isNegative && 'text-slate-400'
            )}
          >
            {isPositive && (
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 10l7-7m0 0l7 7m-7-7l7 7"
                />
              </svg>
            )}
            {isNegative && (
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7l-7-7"
                />
              </svg>
            )}
            {change !== 0 && (
              <span>{Math.abs(change)}%</span>
            )}
            {change === 0 && <span className="text-slate-400">0%</span>}
          </span>
        )}
      </div>

      {/* Change label */}
      {changeLabel && (
        <p className="text-xs text-slate-400 mt-1">{changeLabel}</p>
      )}

      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full blur-3xl" />
      </div>
    </div>
  );
}

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  StatCard,
};
export type {
  CardProps,
  CardHeaderProps,
  CardTitleProps,
  CardDescriptionProps,
  CardContentProps,
  CardFooterProps,
  StatCardProps,
};
