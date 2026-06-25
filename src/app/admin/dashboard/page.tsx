'use client';

import Link from 'next/link';
import { MapPin, Ship, FileText, MessageSquare, ArrowRight, TrendingUp, Eye, Plus, Users, Calendar, ChevronRight } from 'lucide-react';

const stats = [
  { name: 'Total Destinations', value: '25', change: '+3', href: '/admin/destinations', icon: MapPin, color: 'from-blue-500 to-blue-600' },
  { name: 'Active Tours', value: '48', change: '+12', href: '/admin/tours', icon: Ship, color: 'from-orange-500 to-orange-600' },
  { name: 'Blog Posts', value: '32', change: '+5', href: '/admin/blog', icon: FileText, color: 'from-emerald-500 to-emerald-600' },
  { name: 'New Inquiries', value: '12', change: '+8', href: '/admin/inquiries', icon: MessageSquare, color: 'from-purple-500 to-purple-600' },
];

const recentActivity = [
  { id: 1, action: 'Created', entity: 'Destination', name: 'Komodo National Park', time: '2 hours ago', type: 'create' },
  { id: 2, action: 'Updated', entity: 'Tour', name: 'Maldives 5-Day Package', time: '4 hours ago', type: 'update' },
  { id: 3, action: 'New', entity: 'Inquiry', name: 'Sarah Johnson - Fiji Tour', time: '5 hours ago', type: 'inquiry' },
  { id: 4, action: 'Published', entity: 'Blog', name: 'Top 10 Underwater Destinations', time: '1 day ago', type: 'publish' },
];

const quickActions = [
  { name: 'Add Destination', href: '/admin/destinations', icon: MapPin, gradient: 'from-blue-500 to-blue-600' },
  { name: 'Add Tour', href: '/admin/tours', icon: Ship, gradient: 'from-orange-500 to-orange-600' },
  { name: 'Write Post', href: '/admin/blog', icon: FileText, gradient: 'from-emerald-500 to-emerald-600' },
  { name: 'View Website', href: '/en', icon: Eye, gradient: 'from-purple-500 to-purple-600', external: true },
];

const pendingInquiries = [
  { name: 'Sarah Johnson', email: 'sarah@example.com', interest: 'Fiji Tour', status: 'New', time: '2h ago' },
  { name: 'Michael Chen', email: 'michael@example.com', interest: 'Maldives Package', status: 'New', time: '5h ago' },
  { name: 'Emma Wilson', email: 'emma@example.com', interest: 'Raja Ampat Diving', status: 'New', time: '1d ago' },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400 mt-1">Welcome back! Here&apos;s what&apos;s happening today.</p>
        </div>
        <Link
          href="/en"
          target="_blank"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-gray-300 hover:text-white transition-all"
        >
          <Eye className="w-4 h-4" />
          View Website
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Link
            key={stat.name}
            href={stat.href}
            className="group relative overflow-hidden rounded-2xl bg-white/[0.03] border border-white/5 p-6 hover:bg-white/[0.06] transition-all duration-300"
          >
            {/* Gradient Glow */}
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full">
                  {stat.change}%
                </span>
              </div>
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.name}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 rounded-2xl bg-white/[0.03] border border-white/5 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
            <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
            <Link href="/admin/activity-log" className="text-sm text-ocean-400 hover:text-ocean-300 transition-colors">
              View All →
            </Link>
          </div>
          <div className="p-6 space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/[0.03] transition-colors">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'create' ? 'bg-emerald-500' :
                  activity.type === 'update' ? 'bg-blue-500' :
                  activity.type === 'inquiry' ? 'bg-purple-500' :
                  'bg-pink-500'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white">
                    <span className="font-medium">{activity.action}</span>{' '}
                    <span className="text-gray-400">{activity.entity}</span>
                  </p>
                  <p className="text-sm text-gray-500 truncate">{activity.name}</p>
                </div>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-2xl bg-white/[0.03] border border-white/5 overflow-hidden">
          <div className="px-6 py-4 border-b border-white/5">
            <h2 className="text-lg font-semibold text-white">Quick Actions</h2>
          </div>
          <div className="p-4 grid grid-cols-2 gap-3">
            {quickActions.map((action) => (
              <Link
                key={action.name}
                href={action.href}
                target={action.external ? '_blank' : '_self'}
                className={`group relative overflow-hidden rounded-xl bg-gradient-to-br ${action.gradient} p-4 aspect-square flex flex-col items-center justify-center text-center transition-all duration-300 hover:scale-105 hover:shadow-lg`}
              >
                <action.icon className="w-8 h-8 text-white mb-2" />
                <span className="text-sm font-medium text-white">{action.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Pending Inquiries */}
      <div className="rounded-2xl bg-white/[0.03] border border-white/5 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold text-white">Pending Inquiries</h2>
            <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs font-medium rounded-full">
              {pendingInquiries.length} New
            </span>
          </div>
          <Link href="/admin/inquiries" className="text-sm text-ocean-400 hover:text-ocean-300 transition-colors">
            View All →
          </Link>
        </div>
        <div className="divide-y divide-white/5">
          {pendingInquiries.map((inquiry) => (
            <div key={inquiry.email} className="flex items-center gap-4 px-6 py-4 hover:bg-white/[0.02] transition-colors">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-ocean-500 to-coral-500 flex items-center justify-center text-white font-medium">
                {inquiry.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-white">{inquiry.name}</p>
                <p className="text-sm text-gray-400">{inquiry.email}</p>
              </div>
              <div className="hidden sm:block text-right">
                <p className="text-sm text-gray-300">{inquiry.interest}</p>
                <p className="text-xs text-gray-500">{inquiry.time}</p>
              </div>
              <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs font-medium rounded-full">
                {inquiry.status}
              </span>
              <ChevronRight className="w-5 h-5 text-gray-500" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
