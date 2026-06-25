'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Search, Pencil, Trash2, Eye, Calendar, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDate } from '@/lib/utils';

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

const blogPosts = [
  {
    id: '1',
    title: 'Top 10 Underwater Destinations for 2026',
    category: 'Travel Guide',
    author: 'Captain James Chen',
    published: true,
    image: 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=100&q=80',
    publishedAt: '2026-06-15',
  },
  {
    id: '2',
    title: 'Essential Packing List for Your First Diving Trip',
    category: 'Tips',
    author: 'Dr. Maya Santos',
    published: true,
    image: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=100&q=80',
    publishedAt: '2026-06-10',
  },
  {
    id: '3',
    title: 'Sustainable Tourism: Protecting Ocean Treasures',
    category: 'Conservation',
    author: 'Dr. Maya Santos',
    published: false,
    image: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=100&q=80',
    publishedAt: '2026-06-05',
  },
];

export default function AdminBlogPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = blogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Blog Posts</h1>
          <p className="text-[var(--muted-foreground)]">Manage your blog articles</p>
        </div>
        <Link href="/admin/blog/new">
          <Button variant="primary" leftIcon={<Plus className="w-5 h-5" />}>
            Write Post
          </Button>
        </Link>
      </div>

      {/* Search */}
      <div className="bg-[var(--card)] rounded-xl p-4 border border-[var(--border)]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--muted-foreground)]" />
          <input
            type="text"
            placeholder="Search posts..."
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
                <th className="text-left py-4 px-6 text-sm font-medium text-[var(--muted-foreground)]">Post</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-[var(--muted-foreground)]">Category</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-[var(--muted-foreground)]">Author</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-[var(--muted-foreground)]">Status</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-[var(--muted-foreground)]">Date</th>
                <th className="text-right py-4 px-6 text-sm font-medium text-[var(--muted-foreground)]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPosts.map((post) => (
                <tr key={post.id} className="border-b border-[var(--border)] hover:bg-[var(--muted)]/50">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4">
                      <div className="relative w-16 h-12 rounded-lg overflow-hidden flex-shrink-0">
                        <Image src={post.image} alt={post.title} fill className="object-cover" />
                      </div>
                      <span className="font-medium text-[var(--foreground)]">{post.title}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6"><Badge variant="ocean">{post.category}</Badge></td>
                  <td className="py-4 px-6 text-[var(--muted-foreground)]">{post.author}</td>
                  <td className="py-4 px-6">
                    {post.published ? (
                      <Badge variant="success">Published</Badge>
                    ) : (
                      <Badge variant="warning">Draft</Badge>
                    )}
                  </td>
                  <td className="py-4 px-6 text-[var(--muted-foreground)] text-sm">{formatDate(post.publishedAt)}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/blog/${post.id}/edit`} className="p-2 text-[var(--muted-foreground)] hover:text-[var(--primary)] hover:bg-[var(--primary-soft)] rounded-lg transition-colors">
                        <Pencil className="w-5 h-5" />
                      </Link>
                      <button className="p-2 text-[var(--muted-foreground)] hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
