'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Search, Pencil, Trash2, Eye, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button, Badge, Input } from '@/components/ui';
import { cn } from '@/lib/utils';

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
          <h1 className="text-2xl font-bold text-gray-900">Tours</h1>
          <p className="text-gray-500">Manage your tour packages</p>
        </div>
        <Button leftIcon={<Plus className="w-5 h-5" />}>
          Add Tour
        </Button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl p-4 border border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search tours..."
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
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Tour</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Destination</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Duration</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Price</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Status</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Updated</th>
                <th className="text-right py-4 px-6 text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTours.map((tour) => (
                <tr key={tour.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4">
                      <div className="relative w-16 h-12 rounded-lg overflow-hidden flex-shrink-0">
                        <Image src={tour.image} alt={tour.name} fill className="object-cover" />
                      </div>
                      <span className="font-medium text-gray-900">{tour.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-600">{tour.destination}</td>
                  <td className="py-4 px-6 text-gray-600">{tour.duration}</td>
                  <td className="py-4 px-6 text-gray-900 font-medium">${tour.price}</td>
                  <td className="py-4 px-6">
                    {tour.featured ? (
                      <Badge variant="coral"><Star className="w-3 h-3 mr-1" />Featured</Badge>
                    ) : (
                      <Badge variant="default">Regular</Badge>
                    )}
                  </td>
                  <td className="py-4 px-6 text-gray-500 text-sm">{tour.updatedAt}</td>
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

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
          <span className="text-sm text-gray-500">Showing 1-{filteredTours.length} of {tours.length}</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled><ChevronLeft className="w-4 h-4" /></Button>
            <Button variant="outline" size="sm"><ChevronRight className="w-4 h-4" /></Button>
          </div>
        </div>
      </div>
    </div>
  );
}
