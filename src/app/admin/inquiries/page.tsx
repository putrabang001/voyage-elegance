'use client';

import { useState } from 'react';
import { Search, Eye, Mail, MessageSquare, Check, X } from 'lucide-react';
import { Button, Badge } from '@/components/ui';
import { formatDate } from '@/lib/utils';

const inquiries = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    phone: '+62 812 3456 7890',
    interest: 'Fiji Tour',
    message: 'Hi, I am interested in the Fiji Snorkeling & Cultural Tour. Can you provide more details about the best time to visit?',
    status: 'new',
    createdAt: '2026-06-25 10:30',
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael@example.com',
    phone: '+1 234 567 8901',
    interest: 'Maldives Package',
    message: 'Looking for a honeymoon package in Maldives. Budget around $5000 for 2 people.',
    status: 'read',
    createdAt: '2026-06-24 15:45',
  },
  {
    id: '3',
    name: 'Emma Wilson',
    email: 'emma@example.com',
    phone: '+44 20 7123 4567',
    interest: 'Raja Ampat Diving',
    message: 'Is it safe for a beginner diver to join the Raja Ampat expedition?',
    status: 'replied',
    createdAt: '2026-06-23 09:15',
  },
  {
    id: '4',
    name: 'David Brown',
    email: 'david@example.com',
    phone: '+61 2 9876 5432',
    interest: 'Bora Bora Luxury',
    message: 'Can you arrange a private charter for 4 people in Bora Bora?',
    status: 'closed',
    createdAt: '2026-06-20 14:00',
  },
];

const statusColors = {
  new: 'success',
  read: 'primary',
  replied: 'ocean',
  closed: 'default',
} as const;

export default function AdminInquiriesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState<typeof inquiries[0] | null>(null);

  const filteredInquiries = inquiries.filter(
    (inquiry) =>
      inquiry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inquiry.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Inquiries</h1>
        <p className="text-gray-500">Manage customer inquiries and messages</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inquiries List */}
        <div className="space-y-4">
          {/* Search */}
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search inquiries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-500"
              />
            </div>
          </div>

          {/* List */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden divide-y divide-gray-200">
            {filteredInquiries.map((inquiry) => (
              <button
                key={inquiry.id}
                onClick={() => setSelectedInquiry(inquiry)}
                className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
                  selectedInquiry?.id === inquiry.id ? 'bg-ocean-50' : ''
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <span className="font-medium text-gray-900">{inquiry.name}</span>
                  <Badge variant={statusColors[inquiry.status as keyof typeof statusColors]}>
                    {inquiry.status}
                  </Badge>
                </div>
                <p className="text-sm text-gray-500 mb-1">{inquiry.interest}</p>
                <p className="text-xs text-gray-400">{formatDate(inquiry.createdAt)}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Detail */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {selectedInquiry ? (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <Badge variant={statusColors[selectedInquiry.status as keyof typeof statusColors]}>
                  {selectedInquiry.status}
                </Badge>
                <span className="text-sm text-gray-400">{formatDate(selectedInquiry.createdAt)}</span>
              </div>

              <h2 className="text-xl font-bold text-gray-900 mb-4">{selectedInquiry.name}</h2>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>{selectedInquiry.email}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MessageSquare className="w-4 h-4" />
                  <span>{selectedInquiry.phone}</span>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-1">Interested in:</p>
                <p className="font-medium text-gray-900">{selectedInquiry.interest}</p>
              </div>

              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-2">Message:</p>
                <p className="text-gray-700 bg-gray-50 rounded-lg p-4">{selectedInquiry.message}</p>
              </div>

              <div className="flex gap-3">
                <Button leftIcon={<Mail className="w-4 h-4" />}>Reply via Email</Button>
                <Button variant="outline" leftIcon={<Check className="w-4 h-4" />}>Mark as Replied</Button>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center p-12 text-gray-400">
              <div className="text-center">
                <Mail className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Select an inquiry to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
