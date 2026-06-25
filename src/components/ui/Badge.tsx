'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

// ============================================
// BADGE COMPONENT
// ============================================

interface BadgeProps {
  children?: ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info' | 'outline' | 'coral' | 'ocean' | 'slate';
  size?: 'sm' | 'md' | 'lg';
  dot?: boolean;
  icon?: ReactNode;
  className?: string;
}

function Badge({
  children,
  variant = 'default',
  size = 'md',
  dot = false,
  icon,
  className,
}: BadgeProps) {
  // Variant styles
  const variantStyles = {
    default: 'bg-slate-100 text-slate-700',
    primary: 'bg-blue-100 text-blue-700',
    success: 'bg-emerald-100 text-emerald-700',
    warning: 'bg-amber-100 text-amber-700',
    error: 'bg-red-100 text-red-700',
    info: 'bg-cyan-100 text-cyan-700',
    outline: 'bg-transparent border border-slate-200 text-slate-600',
    coral: 'bg-orange-100 text-orange-700',
    ocean: 'bg-cyan-100 text-cyan-700',
    slate: 'bg-slate-100 text-slate-600',
  };

  // Size styles
  const sizeStyles = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm',
  };

  return (
    <span
      className={cn(
        // Base styles
        [
          'inline-flex items-center gap-1.5',
          'font-medium rounded-full',
          variant !== 'outline' && 'bg-opacity-60',
        ].join(' '),

        // Variant
        variantStyles[variant],

        // Size
        sizeStyles[size],

        // Custom className
        className
      )}
    >
      {dot && (
        <span
          className={cn(
            'w-1.5 h-1.5 rounded-full',
            variant === 'default' && 'bg-slate-400',
            variant === 'primary' && 'bg-blue-500',
            variant === 'success' && 'bg-emerald-500',
            variant === 'warning' && 'bg-amber-500',
            variant === 'error' && 'bg-red-500',
            variant === 'info' && 'bg-cyan-500',
            variant === 'outline' && 'bg-slate-400',
            variant === 'coral' && 'bg-orange-500',
            variant === 'ocean' && 'bg-cyan-500',
            variant === 'slate' && 'bg-slate-400'
          )}
        />
      )}
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </span>
  );
}

// ============================================
// STATUS BADGE (with predefined colors)
// ============================================

interface StatusBadgeProps {
  status: 'active' | 'inactive' | 'pending' | 'completed' | 'cancelled' | 'new' | 'processing' | 'shipped' | 'delivered';
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

function StatusBadge({
  status,
  label,
  size = 'md',
  className,
}: StatusBadgeProps) {
  const statusConfig = {
    active: {
      variant: 'success' as const,
      label: label || 'Active',
      dot: true,
    },
    inactive: {
      variant: 'default' as const,
      label: label || 'Inactive',
      dot: true,
    },
    pending: {
      variant: 'warning' as const,
      label: label || 'Pending',
      dot: true,
    },
    completed: {
      variant: 'success' as const,
      label: label || 'Completed',
      dot: true,
    },
    cancelled: {
      variant: 'error' as const,
      label: label || 'Cancelled',
      dot: true,
    },
    new: {
      variant: 'info' as const,
      label: label || 'New',
      dot: true,
    },
    processing: {
      variant: 'primary' as const,
      label: label || 'Processing',
      dot: true,
    },
    shipped: {
      variant: 'primary' as const,
      label: label || 'Shipped',
      dot: true,
    },
    delivered: {
      variant: 'success' as const,
      label: label || 'Delivered',
      dot: true,
    },
  };

  const config = statusConfig[status];

  return (
    <Badge variant={config.variant} size={size} dot={config.dot} className={className}>
      {config.label}
    </Badge>
  );
}

// ============================================
// COUNT BADGE (notification count
// ============================================

interface CountBadgeProps {
  count: number;
  max?: number;
  variant?: 'default' | 'primary' | 'error';
  className?: string;
}

function CountBadge({
  count,
  max = 99,
  variant = 'primary',
  className,
}: CountBadgeProps) {
  if (count === 0) return null;

  const displayCount = count > max ? `${max}+` : count;

  const variantStyles = {
    default: 'bg-slate-100 text-slate-600',
    primary: 'bg-blue-600 text-white',
    error: 'bg-red-500 text-white',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center',
        'min-w-5 h-5 px-1.5',
        'text-[10px] font-bold rounded-full',
        variantStyles[variant],
        className
      )}
    >
      {displayCount}
    </span>
  );
}

export { Badge, StatusBadge, CountBadge };
export type { BadgeProps, StatusBadgeProps, CountBadgeProps };
