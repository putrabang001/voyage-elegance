'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Plus, Upload, Trash2, Pencil, Star, X } from 'lucide-react';
import { Button, Badge } from '@/components/ui';

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
          <h1 className="text-2xl font-bold text-gray-900">Gallery</h1>
          <p className="text-gray-500">Manage your image gallery</p>
        </div>
        <Button leftIcon={<Upload className="w-5 h-5" />}>
          Upload Images
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setSelectedCategory(cat.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedCategory === cat.value
                ? 'bg-ocean-600 text-white'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Upload Area */}
      <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-ocean-400 transition-colors cursor-pointer">
        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 font-medium">Drop images here or click to upload</p>
        <p className="text-gray-400 text-sm mt-1">PNG, JPG, WEBP up to 10MB</p>
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
                <button className="p-2 bg-white rounded-lg hover:bg-gray-100">
                  <Pencil className="w-4 h-4 text-gray-600" />
                </button>
                <button className="p-2 bg-white rounded-lg hover:bg-red-50">
                  <Trash2 className="w-4 h-4 text-red-600" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
