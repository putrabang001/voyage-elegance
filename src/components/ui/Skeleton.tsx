'use client';

import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-shimmer rounded-lg bg-ocean-800',
        className
      )}
    />
  );
}

export function SkeletonText({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn('h-4', i === lines - 1 && 'w-3/4')}
        />
      ))}
    </div>
  );
}

export function SkeletonCard({ className }: SkeletonProps) {
  return (
    <div className={cn('bg-ocean-800/50 rounded-2xl overflow-hidden', className)}>
      <Skeleton className="h-48 w-full rounded-none" />
      <div className="p-6 space-y-4">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonHero({ className }: SkeletonProps) {
  return (
    <div className={cn('relative h-[70vh] min-h-[500px]', className)}>
      <Skeleton className="absolute inset-0 rounded-none" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center space-y-6 max-w-2xl px-8">
          <Skeleton className="h-16 w-96 mx-auto rounded-lg" />
          <Skeleton className="h-6 w-[500px] mx-auto rounded" />
          <Skeleton className="h-12 w-48 mx-auto rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonImageGallery({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} className="aspect-square rounded-xl" />
      ))}
    </div>
  );
}
