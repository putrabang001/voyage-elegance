'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'ocean' | 'coral';
  size?: 'sm' | 'md';
  className?: string;
}

export function Badge({ children, variant = 'default', size = 'sm', className }: BadgeProps) {
  const variants = {
    default: 'bg-gray-700 text-gray-300',
    primary: 'bg-ocean-600/30 text-ocean-300 border border-ocean-500/30',
    secondary: 'bg-coral-500/20 text-coral-400 border border-coral-500/30',
    success: 'bg-green-500/20 text-green-400 border border-green-500/30',
    warning: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
    error: 'bg-red-500/20 text-red-400 border border-red-500/30',
    ocean: 'bg-ocean-500/20 text-ocean-300 border border-ocean-400/30',
    coral: 'bg-coral-500/20 text-coral-300 border border-coral-400/30',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-full',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
}

interface StatusBadgeProps {
  status: 'new' | 'read' | 'replied' | 'closed' | 'published' | 'draft';
  t?: (key: string) => string;
}

export function StatusBadge({ status, t }: StatusBadgeProps) {
  const variants: Record<string, BadgeProps['variant']> = {
    new: 'success',
    read: 'primary',
    replied: 'ocean',
    closed: 'default',
    published: 'success',
    draft: 'warning',
  };

  const labels: Record<string, string> = {
    new: t ? t('admin.status.new') : 'New',
    read: t ? t('admin.status.read') : 'Read',
    replied: t ? t('admin.status.replied') : 'Replied',
    closed: t ? t('admin.status.closed') : 'Closed',
    published: t ? t('admin.status.published') : 'Published',
    draft: t ? t('admin.status.draft') : 'Draft',
  };

  return (
    <Badge variant={variants[status] || 'default'}>
      {labels[status] || status}
    </Badge>
  );
}
