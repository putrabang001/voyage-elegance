'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Plus, Pencil, Trash2, Star } from 'lucide-react';
import { Button, Badge } from '@/components/ui';

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
          <h1 className="text-2xl font-bold text-gray-900">Testimonials</h1>
          <p className="text-gray-500">Manage customer reviews and testimonials</p>
        </div>
        <Button leftIcon={<Plus className="w-5 h-5" />}>
          Add Testimonial
        </Button>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-6">
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 mb-6">&ldquo;{testimonial.quote}&rdquo;</p>
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image src={testimonial.avatar} alt={testimonial.name} fill className="object-cover" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </div>
            </div>
            <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
              {testimonial.featured ? (
                <Badge variant="coral"><Star className="w-3 h-3 mr-1" />Featured</Badge>
              ) : (
                <span className="text-sm text-gray-400">Regular</span>
              )}
              <div className="flex gap-1">
                <button className="p-2 text-gray-400 hover:text-ocean-600 hover:bg-ocean-50 rounded-lg">
                  <Pencil className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
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
