'use client';

import { useState } from 'react';
import { Plus, Search, Pencil, Trash2, ChevronDown } from 'lucide-react';
import { Button, Badge, Accordion } from '@/components/ui';
import { cn } from '@/lib/utils';

const faqs = [
  {
    id: '1',
    question: 'What destinations do you offer tours to?',
    answer: 'We offer tours to over 25 ocean destinations worldwide, including the Maldives, Raja Ampat, Palawan, Fiji, Bora Bora, and Komodo.',
    category: 'general',
    featured: true,
  },
  {
    id: '2',
    question: 'Do I need previous diving experience?',
    answer: 'No, many of our tours are suitable for beginners. We offer both snorkeling and diving options, with certified instructors.',
    category: 'general',
    featured: false,
  },
  {
    id: '3',
    question: 'How do I book a tour?',
    answer: 'You can book through our website by selecting your desired tour and filling out the inquiry form.',
    category: 'booking',
    featured: true,
  },
  {
    id: '4',
    question: 'What payment methods do you accept?',
    answer: 'We accept credit cards (Visa, Mastercard), bank transfers, and PayPal.',
    category: 'booking',
    featured: false,
  },
];

const categories = ['All', 'General', 'Booking', 'Trip', 'Safety'];

export default function AdminFAQsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredFaqs = selectedCategory === 'All'
    ? faqs
    : faqs.filter(faq => faq.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">FAQs</h1>
          <p className="text-gray-500">Manage frequently asked questions</p>
        </div>
        <Button leftIcon={<Plus className="w-5 h-5" />}>
          Add FAQ
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedCategory === cat
                ? 'bg-ocean-600 text-white'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* FAQs */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <Accordion
          items={filteredFaqs.map((faq) => ({
            title: (
              <div className="flex items-center justify-between w-full pr-4">
                <div className="flex items-center gap-3">
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  <Badge variant="ocean" size="sm">{faq.category}</Badge>
                  {faq.featured && <Badge variant="coral" size="sm">Featured</Badge>}
                </div>
              </div>
            ),
            content: (
              <div className="flex items-start justify-between gap-4">
                <p className="text-gray-600">{faq.answer}</p>
                <div className="flex gap-1 flex-shrink-0">
                  <button className="p-2 text-gray-400 hover:text-ocean-600 hover:bg-ocean-50 rounded-lg">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ),
          }))}
        />
      </div>
    </div>
  );
}
