'use client';

import { cn } from '@/lib/utils';

// ============================================
// SKELETON COMPONENT
// Premium loading skeleton with shimmer effect
// ============================================

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
}

function Skeleton({
  className,
  variant = 'text',
  width,
  height,
  animation = 'wave',
}: SkeletonProps) {
  // Variant styles
  const variantStyles = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-none',
    rounded: 'rounded-xl',
  };

  // Animation styles
  const animationStyles = {
    pulse: 'animate-pulse bg-slate-200',
    wave: [
      'relative overflow-hidden',
      'before:absolute before:inset-0',
      'before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent',
      'before:animate-shimmer',
    ].join(' '),
    none: 'bg-slate-200',
  };

  const shimmerKeyframes = `
    @keyframes shimmer {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }
    .animate-shimmer {
      animation: shimmer 1.5s infinite;
    }
  `;

  return (
    <>
      {animation === 'wave' && (
        <style jsx>{shimmerKeyframes}</style>
      )}
      <div
        className={cn(
          // Base
          'bg-slate-200',
          // Variant
          variantStyles[variant],
          // Animation
          animationStyles[animation],
          // Size
          width && `width: ${typeof width === 'number' ? `${width}px` : width}`,
          height && `height: ${typeof height === 'number' ? `${height}px` : height}`,
          // Custom className
          className
        )}
      />
    </>
  );
}

// ============================================
// SKELETON TEXT
// Multiple lines of text
// ============================================

interface SkeletonTextProps {
  lines?: number;
  className?: string;
  lastLineWidth?: string;
}

function SkeletonText({
  lines = 3,
  className,
  lastLineWidth = '60%',
}: SkeletonTextProps) {
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          variant="text"
          height={16}
          width={i === lines - 1 ? lastLineWidth : '100%'}
        />
      ))}
    </div>
  );
}

// ============================================
// SKELETON AVATAR
// Circular avatar placeholder
// ============================================

interface SkeletonAvatarProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

function SkeletonAvatar({ size = 'md', className }: SkeletonAvatarProps) {
  const sizeStyles = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  return (
    <Skeleton
      variant="circular"
      className={cn(sizeStyles[size], className)}
    />
  );
}

// ============================================
// SKELETON CARD
// Card placeholder
// ============================================

interface SkeletonCardProps {
  className?: string;
}

function SkeletonCard({ className }: SkeletonCardProps) {
  return (
    <div
      className={cn(
        'p-6 bg-white rounded-2xl border border-slate-100 shadow-sm space-y-4',
        className
      )}
    >
      {/* Image */}
      <Skeleton variant="rounded" height={160} className="w-full" />

      {/* Title */}
      <Skeleton variant="text" width="60%" height={20} />

      {/* Description */}
      <SkeletonText lines={2} />

      {/* Footer */}
      <div className="flex items-center gap-2 pt-2">
        <SkeletonAvatar size="sm" />
        <Skeleton variant="text" width={100} height={14} />
      </div>
    </div>
  );
}

// ============================================
// SKELETON TABLE ROW
// Table row placeholder
// ============================================

interface SkeletonTableRowProps {
  columns?: number;
  className?: string;
}

function SkeletonTableRow({ columns = 4, className }: SkeletonTableRowProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-4 p-4 border-b border-slate-100',
        className
      )}
    >
      {Array.from({ length: columns }).map((_, i) => (
        <Skeleton key={i} variant="text" height={16} className="flex-1" />
      ))}
    </div>
  );
}

// ============================================
// SKELETON CHART
// Chart placeholder
// ============================================

interface SkeletonChartProps {
  className?: string;
}

function SkeletonChart({ className }: SkeletonChartProps) {
  return (
    <div
      className={cn(
        'relative rounded-xl bg-slate-100 overflow-hidden',
        'flex items-end justify-between gap-2 p-6',
        'h-64',
        className
      )}
    >
      {/* Bars */}
      {[40, 65, 45, 80, 55, 90, 70, 85].map((h, i) => (
        <Skeleton
          key={i}
          variant="rounded"
          width={32}
          height={`${h}%`}
        />
      ))}
    </div>
  );
}

// ============================================
// SKELETON LIST
// List items placeholder
// ============================================

interface SkeletonListProps {
  items?: number;
  className?: string;
}

function SkeletonList({ items = 5, className }: SkeletonListProps) {
  return (
    <div className={cn('space-y-3', className)}>
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <SkeletonAvatar size="sm" />
          <div className="flex-1 space-y-1">
            <Skeleton variant="text" width="40%" height={14} />
            <Skeleton variant="text" width="60%" height={12} />
          </div>
        </div>
      ))}
    </div>
  );
}

export {
  Skeleton,
  SkeletonText,
  SkeletonAvatar,
  SkeletonCard,
  SkeletonTableRow,
  SkeletonChart,
  SkeletonList,
};
export type {
  SkeletonProps,
  SkeletonTextProps,
  SkeletonAvatarProps,
  SkeletonCardProps,
  SkeletonTableRowProps,
  SkeletonChartProps,
  SkeletonListProps,
};
