'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Search, Pencil, Trash2, Eye, Calendar, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button, Badge } from '@/components/ui';
import { cn, formatDate } from '@/lib/utils';

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
          <h1 className="text-2xl font-bold text-gray-900">Blog Posts</h1>
          <p className="text-gray-500">Manage your blog articles</p>
        </div>
        <Button leftIcon={<Plus className="w-5 h-5" />}>
          Write Post
        </Button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl p-4 border border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Post</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Category</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Author</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Status</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Date</th>
                <th className="text-right py-4 px-6 text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPosts.map((post) => (
                <tr key={post.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4">
                      <div className="relative w-16 h-12 rounded-lg overflow-hidden flex-shrink-0">
                        <Image src={post.image} alt={post.title} fill className="object-cover" />
                      </div>
                      <span className="font-medium text-gray-900">{post.title}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6"><Badge variant="ocean">{post.category}</Badge></td>
                  <td className="py-4 px-6 text-gray-600">{post.author}</td>
                  <td className="py-4 px-6">
                    {post.published ? (
                      <Badge variant="success">Published</Badge>
                    ) : (
                      <Badge variant="warning">Draft</Badge>
                    )}
                  </td>
                  <td className="py-4 px-6 text-gray-500 text-sm">{formatDate(post.publishedAt)}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-gray-400 hover:text-ocean-600 hover:bg-ocean-50 rounded-lg transition-colors"><Eye className="w-5 h-5" /></button>
                      <button className="p-2 text-gray-400 hover:text-ocean-600 hover:bg-ocean-50 rounded-lg transition-colors"><Pencil className="w-5 h-5" /></button>
                      <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-5 h-5" /></button>
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
