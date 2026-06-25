'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Search, Pencil, Trash2, Eye, Star, MoreVertical } from 'lucide-react';
import { Button, Modal, Input, Badge } from '@/components/ui';
import { cn } from '@/lib/utils';

// Sample data
const destinations = [
  {
    id: '1',
    name: 'Maldives',
    nameEn: 'Maldives',
    nameFr: 'Maldives',
    nameId: 'Maladewa',
    location: 'Indian Ocean',
    region: 'indian-ocean',
    featured: true,
    images: ['https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=100&q=80'],
    toursCount: 5,
    updatedAt: '2026-06-20',
  },
  {
    id: '2',
    name: 'Raja Ampat',
    nameEn: 'Raja Ampat',
    nameFr: 'Raja Ampat',
    nameId: 'Raja Ampat',
    location: 'Indonesia',
    region: 'southeast-asia',
    featured: true,
    images: ['https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?w=100&q=80'],
    toursCount: 4,
    updatedAt: '2026-06-18',
  },
  {
    id: '3',
    name: 'Palawan',
    nameEn: 'Palawan',
    nameFr: 'Palawan',
    nameId: 'Palawan',
    location: 'Philippines',
    region: 'southeast-asia',
    featured: true,
    images: ['https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=100&q=80'],
    toursCount: 3,
    updatedAt: '2026-06-15',
  },
  {
    id: '4',
    name: 'Fiji',
    nameEn: 'Fiji Islands',
    nameFr: 'Îles Fidji',
    nameId: 'Kepulauan Fiji',
    location: 'South Pacific',
    region: 'pacific',
    featured: false,
    images: ['https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=100&q=80'],
    toursCount: 3,
    updatedAt: '2026-06-10',
  },
  {
    id: '5',
    name: 'Bora Bora',
    nameEn: 'Bora Bora',
    nameFr: 'Bora Bora',
    nameId: 'Bora Bora',
    location: 'French Polynesia',
    region: 'pacific',
    featured: true,
    images: ['https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=100&q=80'],
    toursCount: 2,
    updatedAt: '2026-06-05',
  },
];

export default function AdminDestinationsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<typeof destinations[0] | null>(null);

  const filteredDestinations = destinations.filter(
    (dest) =>
      dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = () => {
    // In production, this would call the API
    console.log('Deleting:', selectedItem?.id);
    setShowDeleteModal(false);
    setSelectedItem(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Destinations</h1>
          <p className="text-gray-500">Manage your travel destinations</p>
        </div>
        <Button leftIcon={<Plus className="w-5 h-5" />}>
          Add Destination
        </Button>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-xl p-4 border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search destinations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
            />
          </div>
          <select className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-500">
            <option>All Regions</option>
            <option>Indian Ocean</option>
            <option>Southeast Asia</option>
            <option>Pacific</option>
          </select>
          <select className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-500">
            <option>All Status</option>
            <option>Featured</option>
            <option>Regular</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Destination</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Region</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Tours</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Status</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Updated</th>
                <th className="text-right py-4 px-6 text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDestinations.map((dest) => (
                <tr key={dest.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4">
                      <div className="relative w-16 h-12 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={dest.images[0]}
                          alt={dest.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{dest.nameEn}</p>
                        <p className="text-sm text-gray-500">{dest.location}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-600 capitalize">{dest.region.replace('-', ' ')}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-600">{dest.toursCount} tours</span>
                  </td>
                  <td className="py-4 px-6">
                    {dest.featured ? (
                      <Badge variant="coral">
                        <Star className="w-3 h-3 mr-1" />
                        Featured
                      </Badge>
                    ) : (
                      <Badge variant="default">Regular</Badge>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-500 text-sm">{dest.updatedAt}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        className="p-2 text-gray-400 hover:text-ocean-600 hover:bg-ocean-50 rounded-lg transition-colors"
                        title="View"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <button
                        className="p-2 text-gray-400 hover:text-ocean-600 hover:bg-ocean-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Pencil className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedItem(dest);
                          setShowDeleteModal(true);
                        }}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
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
          <span className="text-sm text-gray-500">Showing 1-{filteredDestinations.length} of {destinations.length}</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedItem(null);
        }}
        title="Delete Destination"
        size="sm"
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trash2 className="w-8 h-8 text-red-600" />
          </div>
          <p className="text-gray-600 mb-2">
            Are you sure you want to delete <strong>{selectedItem?.name}</strong>?
          </p>
          <p className="text-sm text-gray-500 mb-6">
            This action cannot be undone. All associated tours will also be affected.
          </p>
          <div className="flex gap-3 justify-center">
            <Button
              variant="outline"
              onClick={() => {
                setShowDeleteModal(false);
                setSelectedItem(null);
              }}
            >
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
