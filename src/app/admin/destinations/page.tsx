'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Plus,
  Search,
  MoreHorizontal,
  Pencil,
  Trash2,
  Eye,
  Star,
  MapPin,
  Filter,
  ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const destinations = [
  {
    id: '1',
    name: 'Maldives',
    location: 'Indian Ocean',
    tours: 5,
    featured: true,
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=100&q=80',
    updatedAt: 'Mar 15, 2026',
  },
  {
    id: '2',
    name: 'Raja Ampat',
    location: 'Indonesia',
    tours: 4,
    featured: true,
    image: 'https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?w=100&q=80',
    updatedAt: 'Mar 14, 2026',
  },
  {
    id: '3',
    name: 'Palawan',
    location: 'Philippines',
    tours: 3,
    featured: true,
    image: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=100&q=80',
    updatedAt: 'Mar 12, 2026',
  },
  {
    id: '4',
    name: 'Fiji Islands',
    location: 'South Pacific',
    tours: 3,
    featured: false,
    image: 'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=100&q=80',
    updatedAt: 'Mar 10, 2026',
  },
  {
    id: '5',
    name: 'Bora Bora',
    location: 'French Polynesia',
    tours: 2,
    featured: true,
    image: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=100&q=80',
    updatedAt: 'Mar 8, 2026',
  },
  {
    id: '6',
    name: 'Komodo',
    location: 'Indonesia',
    tours: 2,
    featured: false,
    image: 'https://images.unsplash.com/photo-1562077772-3bd305261897?w=100&q=80',
    updatedAt: 'Mar 5, 2026',
  },
];

export default function DestinationsPage() {
  const [search, setSearch] = useState('');

  const filtered = destinations.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Destinations</h1>
          <p className="text-slate-500 mt-0.5">
            Manage your travel destinations
          </p>
        </div>
        <Link href="/admin/destinations/new">
          <Button leftIcon={<Plus className="w-4 h-4" />}>
            Add Destination
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search destinations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-11 pl-11 pr-4 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>
        <Button variant="outline" rightIcon={<ChevronDown className="w-4 h-4" />}>
          All Regions
        </Button>
        <Button variant="outline" rightIcon={<ChevronDown className="w-4 h-4" />}>
          Status
        </Button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-3.5 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Destination
                </th>
                <th className="px-6 py-3.5 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Region
                </th>
                <th className="px-6 py-3.5 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Tours
                </th>
                <th className="px-6 py-3.5 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3.5 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Updated
                </th>
                <th className="px-6 py-3.5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((destination) => (
                <tr
                  key={destination.id}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="relative w-16 h-12 rounded-xl overflow-hidden flex-shrink-0">
                        <Image
                          src={destination.image}
                          alt={destination.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">
                          {destination.name}
                        </p>
                        <p className="text-sm text-slate-500">
                          {destination.location}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {destination.location}
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {destination.tours} tours
                  </td>
                  <td className="px-6 py-4">
                    {destination.featured ? (
                      <Badge variant="primary">
                        <Star className="w-3 h-3 mr-1" />
                        Featured
                      </Badge>
                    ) : (
                      <span className="text-sm text-slate-400">Regular</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    {destination.updatedAt}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <Link
                        href={`/en/destinations/${destination.id}`}
                        className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <Link
                        href={`/admin/destinations/${destination.id}/edit`}
                        className="p-2 text-[var(--muted-foreground)] hover:text-[var(--primary)] hover:bg-[var(--primary-soft)] rounded-lg transition-colors"
                      >
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-100 flex items-center justify-center">
              <MapPin className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-1">
              No destinations found
            </h3>
            <p className="text-slate-500 mb-4">
              Try adjusting your search or filter to find what you&apos;re looking for.
            </p>
            <Button variant="outline" size="sm">
              Clear filters
            </Button>
          </div>
        )}

        {/* Pagination */}
        {filtered.length > 0 && (
          <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between">
            <p className="text-sm text-slate-500">
              Showing{' '}
              <span className="font-medium text-slate-900">
                {filtered.length}
              </span>{' '}
              of {destinations.length} destinations
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
