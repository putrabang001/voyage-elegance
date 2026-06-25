'use client';

import { useState } from 'react';
import { Search, Download, Plus, Pencil, Trash2, LogIn, LogOut, Eye } from 'lucide-react';
import { Button, Badge } from '@/components/ui';
import { formatDate } from '@/lib/utils';

const activities = [
  { id: '1', action: 'login', entity: 'Admin', details: 'Admin logged in', timestamp: '2026-06-25 14:32:10', admin: 'Admin' },
  { id: '2', action: 'create', entity: 'Destination', details: 'Created destination: Komodo National Park', timestamp: '2026-06-25 14:30:45', admin: 'Admin' },
  { id: '3', action: 'update', entity: 'Tour', details: 'Updated tour: Maldives 5-Day Island Hopping', timestamp: '2026-06-25 14:15:20', admin: 'Admin' },
  { id: '4', action: 'create', entity: 'Blog Post', details: 'Created blog: Top 10 Underwater Destinations', timestamp: '2026-06-25 12:00:00', admin: 'Admin' },
  { id: '5', action: 'delete', entity: 'Image', details: 'Deleted image: old-hero-banner.jpg', timestamp: '2026-06-24 16:30:00', admin: 'Admin' },
  { id: '6', action: 'update', entity: 'Settings', details: 'Updated homepage hero text', timestamp: '2026-06-24 15:45:30', admin: 'Admin' },
  { id: '7', action: 'login', entity: 'Admin', details: 'Admin logged in', timestamp: '2026-06-24 10:00:00', admin: 'Admin' },
  { id: '8', action: 'logout', entity: 'Admin', details: 'Admin logged out', timestamp: '2026-06-23 18:00:00', admin: 'Admin' },
];

const actionIcons = {
  login: <LogIn className="w-4 h-4" />,
  logout: <LogOut className="w-4 h-4" />,
  create: <Plus className="w-4 h-4" />,
  update: <Pencil className="w-4 h-4" />,
  delete: <Trash2 className="w-4 h-4" />,
};

const actionColors = {
  login: 'text-green-600 bg-green-100',
  logout: 'text-gray-600 bg-gray-100',
  create: 'text-blue-600 bg-blue-100',
  update: 'text-yellow-600 bg-yellow-100',
  delete: 'text-red-600 bg-red-100',
};

export default function AdminActivityLogPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredActivities = activities.filter(
    (activity) =>
      activity.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.entity.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Activity Log</h1>
          <p className="text-gray-500">Track all admin activities and changes</p>
        </div>
        <Button variant="outline" leftIcon={<Download className="w-5 h-5" />}>
          Export CSV
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 border border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search activities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-500"
          />
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="divide-y divide-gray-200">
          {filteredActivities.map((activity) => (
            <div key={activity.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-lg ${actionColors[activity.action as keyof typeof actionColors]}`}>
                  {actionIcons[activity.action as keyof typeof actionIcons]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="ocean" size="sm">{activity.entity}</Badge>
                    <span className="text-sm text-gray-400">{formatDate(activity.timestamp)}</span>
                  </div>
                  <p className="text-gray-900">{activity.details}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
