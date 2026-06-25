'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

// ============================================
// AVATAR COMPONENT
// Premium avatar with image, initials, or fallback
// ============================================

interface AvatarProps {
  src?: string | null;
  alt?: string;
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
  status?: 'online' | 'away' | 'busy' | 'offline';
}

function Avatar({
  src,
  alt = '',
  name,
  size = 'md',
  className,
  status,
}: AvatarProps) {
  // Get initials from name
  const getInitials = (name: string): string => {
    const words = name.trim().split(' ');
    if (words.length === 1) return words[0].charAt(0).toUpperCase();
    return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
  };

  // Get background color from name
  const getColor = (name: string): string => {
    const colors = [
      'bg-red-500',
      'bg-orange-500',
      'bg-amber-500',
      'bg-emerald-500',
      'bg-teal-500',
      'bg-cyan-500',
      'bg-blue-500',
      'bg-indigo-500',
      'bg-violet-500',
      'bg-purple-500',
      'bg-fuchsia-500',
      'bg-pink-500',
      'bg-rose-500',
    ];
    const index = name
      .split('')
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[index % colors.length];
  };

  // Size styles
  const sizeStyles = {
    xs: 'w-6 h-6 text-[10px]',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-xl',
    '2xl': 'w-20 h-20 text-2xl',
  };

  // Status indicator styles
  const statusStyles = {
    online: 'bg-emerald-500',
    away: 'bg-amber-500',
    busy: 'bg-red-500',
    offline: 'bg-slate-400',
  };

  const statusSizeStyles = {
    xs: 'w-1.5 h-1.5 border',
    sm: 'w-2 h-2 border-2',
    md: 'w-2.5 h-2.5 border-2',
    lg: 'w-3 h-3 border-2',
    xl: 'w-4 h-4 border-2',
    '2xl': 'w-4 h-4 border-2',
  };

  const statusPosition = {
    xs: '-bottom-0.5 -right-0.5',
    sm: '-bottom-0.5 -right-0.5',
    md: 'bottom-0 right-0',
    lg: 'bottom-0 right-0',
    xl: 'bottom-0 right-0',
    '2xl': 'bottom-0 right-0',
  };

  return (
    <div className="relative inline-flex">
      {src ? (
        // Image avatar
        <div
          className={cn(
            'relative rounded-full overflow-hidden bg-slate-100',
            sizeStyles[size],
            className
          )}
        >
          <Image
            src={src}
            alt={alt || name || 'Avatar'}
            fill
            className="object-cover"
          />
        </div>
      ) : name ? (
        // Initials avatar
        <div
          className={cn(
            'relative rounded-full flex items-center justify-center font-medium text-white',
            sizeStyles[size],
            getColor(name),
            className
          )}
        >
          {getInitials(name)}
        </div>
      ) : (
        // Default avatar
        <div
          className={cn(
            'relative rounded-full flex items-center justify-center bg-slate-200 text-slate-500',
            sizeStyles[size],
            className
          )}
        >
          <svg
            className="w-1/2 h-1/2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 018 0zM12 11a4 4 0 018 0m0 0h12a4 4 0 010 8H4a4 4 0 010-8m0 0v8a4 4 0 010 8m8-8v8m-8-8H4a4 4 0 010-8m8 0V4"
            />
          </svg>
        </div>
      )}

      {/* Status indicator */}
      {status && (
        <span
          className={cn(
            'absolute rounded-full border-white',
            statusStyles[status],
            statusSizeStyles[size],
            statusPosition[size]
          )}
        />
      )}
    </div>
  );
}

// ============================================
// AVATAR GROUP
// Stack multiple avatars
// ============================================

interface AvatarGroupProps {
  avatars: Array<{
    src?: string | null;
    name?: string;
  }>;
  max?: number;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
}

function AvatarGroup({
  avatars,
  max = 4,
  size = 'md',
  className,
}: AvatarGroupProps) {
  const visibleAvatars = avatars.slice(0, max);
  const remainingCount = avatars.length - max;

  const overlapStyles = {
    xs: '-ml-2',
    sm: '-ml-2.5',
    md: '-ml-3',
    lg: '-ml-4',
  };

  const ringStyles = {
    xs: 'ring-2 ring-white',
    sm: 'ring-2 ring-white',
    md: 'ring-2 ring-white',
    lg: 'ring-4 ring-white',
  };

  const countSizeStyles = {
    xs: 'w-6 h-6 text-[10px]',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
  };

  return (
    <div className={cn('flex items-center', className)}>
      {visibleAvatars.map((avatar, index) => (
        <div
          key={index}
          className={cn(
            'relative',
            index > 0 && overlapStyles[size],
            index > 0 && 'ring-2 ring-white rounded-full'
          )}
        >
          <Avatar src={avatar.src} name={avatar.name} size={size} />
        </div>
      ))}

      {remainingCount > 0 && (
        <div
          className={cn(
            'relative rounded-full flex items-center justify-center bg-slate-200 text-slate-600 font-medium',
            overlapStyles[size],
            countSizeStyles[size]
          )}
        >
          +{remainingCount}
        </div>
      )}
    </div>
  );
}

export { Avatar, AvatarGroup };
export type { AvatarProps, AvatarGroupProps };
