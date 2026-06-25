'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Plus, Upload, Trash2, Pencil, Star, X } from 'lucide-react';
import { cn } from '@/lib/utils';

// Button Component
function Button({ children, variant = 'default', size = 'md', leftIcon, disabled, className, onClick }: {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  leftIcon?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}) {
  const variantClasses = {
    default: 'bg-[var(--muted)] hover:bg-[var(--muted-foreground)]/20 text-[var(--foreground)]',
    primary: 'bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white shadow-lg shadow-[var(--primary)]/20 hover:shadow-xl',
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
    </button>
  );
}

// Badge Component
function Badge({ children, variant = 'default' }: { children: React.ReactNode; variant?: 'default' | 'ocean' | 'coral' }) {
  const variantClasses = {
    default: 'bg-[var(--muted)] text-[var(--muted-foreground)]',
    ocean: 'bg-[var(--accent)]/10 text-[var(--accent)]',
    coral: 'bg-orange-500/10 text-orange-500',
  };

  return (
    <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', variantClasses[variant])}>
      {children}
    </span>
  );
}

const galleryImages = [
  { id: '1', url: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=200&q=80', category: 'beach', featured: true },
  { id: '2', url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=200&q=80', category: 'underwater', featured: true },
  { id: '3', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&q=80', category: 'beach', featured: false },
  { id: '4', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&q=80', category: 'sunset', featured: true },
  { id: '5', url: 'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=200&q=80', category: 'beach', featured: false },
  { id: '6', url: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=200&q=80', category: 'beach', featured: true },
];

const categories = [
  { value: 'all', label: 'All' },
  { value: 'beach', label: 'Beach' },
  { value: 'underwater', label: 'Underwater' },
  { value: 'sunset', label: 'Sunset' },
  { value: 'wildlife', label: 'Wildlife' },
];

export default function AdminGalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredImages = selectedCategory === 'all'
    ? galleryImages
    : galleryImages.filter(img => img.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Gallery</h1>
          <p className="text-[var(--muted-foreground)]">Manage your image gallery</p>
        </div>
        <Link href="/admin/gallery/new">
          <Button variant="primary" leftIcon={<Upload className="w-5 h-5" />}>
            Upload Images
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setSelectedCategory(cat.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedCategory === cat.value
                ? 'bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white'
                : 'bg-[var(--card)] text-[var(--muted-foreground)] border border-[var(--border)] hover:bg-[var(--muted)]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredImages.map((image) => (
          <div key={image.id} className="relative group">
            <div className="relative aspect-square rounded-xl overflow-hidden">
              <Image src={image.url} alt="" fill className="object-cover" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors" />
              <div className="absolute top-2 left-2">
                <Badge variant={image.category === 'beach' ? 'ocean' : image.category === 'underwater' ? 'coral' : 'default'}>
                  {image.category}
                </Badge>
              </div>
              {image.featured && (
                <div className="absolute top-2 right-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                </div>
              )}
              <div className="absolute bottom-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 bg-white/90 rounded-lg hover:bg-white">
                  <Pencil className="w-4 h-4 text-[var(--foreground)]" />
                </button>
                <button className="p-2 bg-white/90 rounded-lg hover:bg-red-50">
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
