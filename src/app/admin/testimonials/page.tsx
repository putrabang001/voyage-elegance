'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Pencil, Trash2, Star, User } from 'lucide-react';
import { cn } from '@/lib/utils';

// Avatar Component
function Avatar({ src, name, size = 'sm' }: { src?: string; name: string; size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  if (src) {
    return (
      <div className={cn('relative rounded-full overflow-hidden', sizeClasses[size])}>
        <Image src={src} alt={name} fill className="object-cover" />
      </div>
    );
  }

  return (
    <div className={cn('rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center text-white font-medium', sizeClasses[size])}>
      <User className="w-5 h-5" />
    </div>
  );
}

// Badge Component
function Badge({ children, variant = 'default' }: { children: React.ReactNode; variant?: 'default' | 'success' | 'warning' | 'coral' }) {
  const variantClasses = {
    default: 'bg-[var(--muted)] text-[var(--muted-foreground)]',
    success: 'bg-emerald-500/10 text-emerald-500',
    warning: 'bg-amber-500/10 text-amber-500',
    coral: 'bg-orange-500/10 text-orange-500',
  };

  return (
    <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', variantClasses[variant])}>
      {children}
    </span>
  );
}

// Button Component
function Button({ children, variant = 'default', size = 'md', leftIcon, className, onClick }: {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  leftIcon?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const variantClasses = {
    default: 'bg-[var(--muted)] hover:bg-[var(--muted-foreground)]/20 text-[var(--foreground)]',
    primary: 'bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white shadow-lg shadow-[var(--primary)]/20',
    outline: 'border border-[var(--border)] hover:bg-[var(--muted)] text-[var(--foreground)]',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {leftIcon}
      {children}
    </button>
  );
}

const testimonials = [
  {
    id: '1',
    name: 'Marie Dubois',
    location: 'Marseille, France',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
    rating: 5,
    quote: 'An absolutely magical experience! The underwater world in Maldives exceeded all my expectations.',
    featured: true,
  },
  {
    id: '2',
    name: 'James Wilson',
    location: 'Sydney, Australia',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    rating: 5,
    quote: 'Raja Ampat was a dream come true. Professional guides, amazing wildlife.',
    featured: true,
  },
  {
    id: '3',
    name: 'Sarah Chen',
    location: 'Singapore',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
    rating: 5,
    quote: 'Best ocean adventure I have ever experienced.',
    featured: false,
  },
];

export default function AdminTestimonialsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Testimonials</h1>
          <p className="text-[var(--muted-foreground)]">Manage customer reviews and testimonials</p>
        </div>
        <Link href="/admin/testimonials/new">
          <Button variant="primary" leftIcon={<Plus className="w-5 h-5" />}>
            Add Testimonial
          </Button>
        </Link>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-[var(--card)] rounded-2xl border border-[var(--border)] overflow-hidden">
            <div className="p-6">
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-[var(--muted-foreground)] mb-6">&ldquo;{testimonial.quote}&rdquo;</p>
              <div className="flex items-center gap-4">
                <Avatar src={testimonial.avatar} name={testimonial.name} />
                <div>
                  <p className="font-medium text-[var(--foreground)]">{testimonial.name}</p>
                  <p className="text-sm text-[var(--muted-foreground)]">{testimonial.location}</p>
                </div>
              </div>
            </div>
            <div className="px-6 py-3 bg-[var(--muted)] border-t border-[var(--border)] flex items-center justify-between">
              {testimonial.featured ? (
                <Badge variant="coral"><Star className="w-3 h-3 mr-1" />Featured</Badge>
              ) : (
                <span className="text-sm text-[var(--muted-foreground)]">Regular</span>
              )}
              <div className="flex gap-1">
                <Link href={`/admin/testimonials/${testimonial.id}/edit`} className="p-2 text-[var(--muted-foreground)] hover:text-[var(--primary)] hover:bg-[var(--primary-soft)] rounded-lg transition-colors">
                  <Pencil className="w-4 h-4" />
                </Link>
                <button className="p-2 text-[var(--muted-foreground)] hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
