'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Plus, Search, Pencil, Trash2, Eye, Star, Filter } from 'lucide-react';
import { Button, Badge } from '@/components/ui';

const destinations = [
  { id: '1', name: 'Maldives', location: 'Indian Ocean', region: 'Indian Ocean', featured: true, images: ['https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=100&q=80'], toursCount: 5, updatedAt: '2026-06-20' },
  { id: '2', name: 'Raja Ampat', location: 'Indonesia', region: 'Southeast Asia', featured: true, images: ['https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?w=100&q=80'], toursCount: 4, updatedAt: '2026-06-18' },
  { id: '3', name: 'Palawan', location: 'Philippines', region: 'Southeast Asia', featured: true, images: ['https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=100&q=80'], toursCount: 3, updatedAt: '2026-06-15' },
  { id: '4', name: 'Fiji Islands', location: 'South Pacific', region: 'Pacific', featured: false, images: ['https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=100&q=80'], toursCount: 3, updatedAt: '2026-06-10' },
  { id: '5', name: 'Bora Bora', location: 'French Polynesia', region: 'Pacific', featured: true, images: ['https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=100&q=80'], toursCount: 2, updatedAt: '2026-06-05' },
  { id: '6', name: 'Komodo', location: 'Indonesia', region: 'Southeast Asia', featured: false, images: ['https://images.unsplash.com/photo-1562077772-3bd305261897?w=100&q=80'], toursCount: 3, updatedAt: '2026-06-01' },
];

export default function AdminDestinationsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFeatured, setShowFeatured] = useState(false);

  const filteredDestinations = destinations.filter((dest) => {
    if (showFeatured && !dest.featured) return false;
    if (searchQuery && !dest.name.toLowerCase().includes(searchQuery.toLowerCase()) && !dest.location.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Destinations</h1>
          <p className="text-gray-500 mt-1">Manage your travel destinations</p>
        </div>
        <Button size="lg">
          <Plus className="w-5 h-5" />
          Add Destination
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search destinations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:border-transparent transition-all"
          />
        </div>
        <button
          onClick={() => setShowFeatured(!showFeatured)}
          className={`inline-flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all ${
            showFeatured ? 'bg-ocean-500 text-white shadow-lg shadow-ocean-500/30' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
          }`}
        >
          <Filter className="w-5 h-5" />
          Featured
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Destination</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Region</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Tours</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Updated</th>
                <th className="text-right py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredDestinations.map((dest) => (
                <tr key={dest.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4">
                      <div className="relative w-16 h-12 rounded-xl overflow-hidden flex-shrink-0 shadow-sm">
                        <Image src={dest.images[0]} alt={dest.name} fill className="object-cover" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{dest.name}</p>
                        <p className="text-sm text-gray-500">{dest.location}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-600">{dest.region}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-600">{dest.toursCount} tours</span>
                  </td>
                  <td className="py-4 px-6">
                    {dest.featured ? (
                      <Badge variant="coral"><Star className="w-3 h-3 mr-1" />Featured</Badge>
                    ) : (
                      <Badge variant="default">Regular</Badge>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm text-gray-500">{dest.updatedAt}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-gray-400 hover:text-ocean-600 hover:bg-ocean-50 rounded-lg transition-colors" title="View">
                        <Eye className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-ocean-600 hover:bg-ocean-50 rounded-lg transition-colors" title="Edit">
                        <Pencil className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredDestinations.length === 0 && (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No destinations found</h3>
            <p className="text-gray-500">Try adjusting your search or filter</p>
          </div>
        )}
      </div>
    </div>
  );
}
