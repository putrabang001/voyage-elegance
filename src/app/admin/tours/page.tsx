'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Search, Pencil, Trash2, Eye, Star, ChevronLeft, ChevronRight } from 'lucide-react';
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
      {name.charAt(0)}
    </div>
  );
}

// Badge Component
function Badge({ children, variant = 'default' }: { children: React.ReactNode; variant?: 'default' | 'success' | 'warning' | 'error' | 'primary' | 'ocean' | 'coral' }) {
  const variantClasses = {
    default: 'bg-[var(--muted)] text-[var(--muted-foreground)]',
    success: 'bg-emerald-500/10 text-emerald-500',
    warning: 'bg-amber-500/10 text-amber-500',
    error: 'bg-red-500/10 text-red-500',
    primary: 'bg-[var(--primary-soft)] text-[var(--primary)]',
    ocean: 'bg-[var(--accent)]/10 text-[var(--accent)]',
    coral: 'bg-orange-500/10 text-orange-500',
  };

  return (
    <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', variantClasses[variant])}>
      {children}
    </span>
  );
}

// Button Component
function Button({ children, variant = 'default', size = 'md', leftIcon, rightIcon, disabled, className, onClick }: {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}) {
  const variantClasses = {
    default: 'bg-[var(--muted)] hover:bg-[var(--muted-foreground)]/20 text-[var(--foreground)]',
    primary: 'bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white shadow-lg shadow-[var(--primary)]/20 hover:shadow-xl hover:shadow-[var(--primary)]/30',
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
      disabled={disabled}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all',
        variantClasses[variant],
        sizeClasses[size],
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  );
}

// Sample data
const tours = [
  {
    id: '1',
    name: 'Maldives 5-Day Island Hopping',
    destination: 'Maldives',
    duration: '5 Days / 4 Nights',
    price: 2499,
    featured: true,
    image: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=100&q=80',
    updatedAt: '2026-06-20',
  },
  {
    id: '2',
    name: 'Raja Ampat Diving Expedition',
    destination: 'Raja Ampat',
    duration: '7 Days / 6 Nights',
    price: 2899,
    featured: true,
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=100&q=80',
    updatedAt: '2026-06-18',
  },
  {
    id: '3',
    name: 'Palawan Underground River',
    destination: 'Palawan',
    duration: '4 Days / 3 Nights',
    price: 1299,
    featured: false,
    image: 'https://images.unsplash.com/photo-1562077772-3bd305261897?w=100&q=80',
    updatedAt: '2026-06-15',
  },
  {
    id: '4',
    name: 'Fiji Snorkeling & Cultural Tour',
    destination: 'Fiji',
    duration: '6 Days / 5 Nights',
    price: 2799,
    featured: true,
    image: 'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=100&q=80',
    updatedAt: '2026-06-10',
  },
];

export default function AdminToursPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTours = tours.filter(
    (tour) =>
      tour.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tour.destination.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Tours</h1>
          <p className="text-[var(--muted-foreground)]">Manage your tour packages</p>
        </div>
        <Link href="/admin/tours/new">
          <Button variant="primary" leftIcon={<Plus className="w-5 h-5" />}>
            Add Tour
          </Button>
        </Link>
      </div>

      {/* Search */}
      <div className="bg-[var(--card)] rounded-xl p-4 border border-[var(--border)]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--muted-foreground)]" />
          <input
            type="text"
            placeholder="Search tours..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-[var(--border)] rounded-lg bg-[var(--card)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)]"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[var(--muted)] border-b border-[var(--border)]">
                <th className="text-left py-4 px-6 text-sm font-medium text-[var(--muted-foreground)]">Tour</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-[var(--muted-foreground)]">Destination</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-[var(--muted-foreground)]">Duration</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-[var(--muted-foreground)]">Price</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-[var(--muted-foreground)]">Status</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-[var(--muted-foreground)]">Updated</th>
                <th className="text-right py-4 px-6 text-sm font-medium text-[var(--muted-foreground)]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTours.map((tour) => (
                <tr key={tour.id} className="border-b border-[var(--border)] hover:bg-[var(--muted)]/50">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4">
                      <div className="relative w-16 h-12 rounded-lg overflow-hidden flex-shrink-0">
                        <Image src={tour.image} alt={tour.name} fill className="object-cover" />
                      </div>
                      <span className="font-medium text-[var(--foreground)]">{tour.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-[var(--muted-foreground)]">{tour.destination}</td>
                  <td className="py-4 px-6 text-[var(--muted-foreground)]">{tour.duration}</td>
                  <td className="py-4 px-6 text-[var(--foreground)] font-medium">${tour.price}</td>
                  <td className="py-4 px-6">
                    {tour.featured ? (
                      <Badge variant="coral"><Star className="w-3 h-3 mr-1" />Featured</Badge>
                    ) : (
                      <Badge variant="default">Regular</Badge>
                    )}
                  </td>
                  <td className="py-4 px-6 text-[var(--muted-foreground)] text-sm">{tour.updatedAt}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/tours/${tour.id}/edit`} className="p-2 text-[var(--muted-foreground)] hover:text-[var(--primary)] hover:bg-[var(--primary-soft)] rounded-lg transition-colors" title="Edit">
                        <Pencil className="w-5 h-5" />
                      </Link>
                      <button className="p-2 text-[var(--muted-foreground)] hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors" title="Delete">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-[var(--border)]">
          <span className="text-sm text-[var(--muted-foreground)]">Showing 1-{filteredTours.length} of {tours.length}</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled><ChevronLeft className="w-4 h-4" /></Button>
            <Button variant="outline" size="sm"><ChevronRight className="w-4 h-4" /></Button>
          </div>
        </div>
      </div>
    </div>
  );
}
