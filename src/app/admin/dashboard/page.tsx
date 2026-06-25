'use client';

import Link from 'next/link';
import { MapPin, Ship, FileText, MessageSquare, ArrowRight, TrendingUp, Eye, Plus, Calendar } from 'lucide-react';

const stats = [
  { name: 'Destinations', href: '/admin/destinations', count: 12, icon: MapPin, color: 'from-blue-500 to-blue-600' },
  { name: 'Tours', href: '/admin/tours', count: 24, icon: Ship, color: 'from-orange-500 to-orange-600' },
  { name: 'Blog Posts', href: '/admin/blog', count: 18, icon: FileText, color: 'from-emerald-500 to-emerald-600' },
  { name: 'New Inquiries', href: '/admin/inquiries', count: 5, icon: MessageSquare, color: 'from-purple-500 to-purple-600' },
];

const recentActivity = [
  { id: 1, action: 'Created', entity: 'Destination', entityName: 'Komodo National Park', time: '2 hours ago', color: 'bg-green-500' },
  { id: 2, action: 'Updated', entity: 'Tour', entityName: 'Maldives 5-Day Island Hopping', time: '4 hours ago', color: 'bg-blue-500' },
  { id: 3, action: 'New Inquiry', entity: 'Inquiry', entityName: 'Sarah Johnson - Fiji Tour', time: '5 hours ago', color: 'bg-purple-500' },
  { id: 4, action: 'Published', entity: 'Blog Post', entityName: 'Top 10 Underwater Destinations', time: '1 day ago', color: 'bg-pink-500' },
];

const quickStats = [
  { label: 'Website Visitors', value: '12,456', change: '+18%', positive: true },
  { label: 'Conversion Rate', value: '24%', change: '+5%', positive: true },
  { label: 'Avg. Session', value: '3m 42s', change: '+12%', positive: true },
  { label: 'Booking Requests', value: '89', change: '+32%', positive: true },
];

const pendingInquiries = [
  { name: 'Sarah Johnson', email: 'sarah@example.com', interest: 'Fiji Tour', status: 'New', time: '2 hours ago' },
  { name: 'Michael Chen', email: 'michael@example.com', interest: 'Maldives Package', status: 'New', time: '5 hours ago' },
  { name: 'Emma Wilson', email: 'emma@example.com', interest: 'Raja Ampat Diving', status: 'New', time: '1 day ago' },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome back! Here's what's happening.</p>
        </div>
        <Link
          href="/en"
          target="_blank"
          className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
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
            className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-gray-500 group-hover:translate-x-1 transition-all" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{stat.count}</div>
            <div className="text-gray-500 text-sm font-medium">{stat.name}</div>
          </Link>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="bg-gradient-to-r from-ocean-600 to-ocean-700 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-ocean-200" />
          <h2 className="text-lg font-semibold text-white">Performance Overview</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {quickStats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-ocean-200 mb-1">{stat.label}</div>
              <span className={`text-sm font-medium ${stat.positive ? 'text-green-300' : 'text-red-300'}`}>
                {stat.change}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
            <Link href="/admin/activity-log" className="text-sm text-ocean-600 hover:text-ocean-700 font-medium">
              View All →
            </Link>
          </div>
          <div className="p-6 space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4">
                <div className={`w-2 h-2 rounded-full mt-2 ${activity.color}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm">
                    <span className="font-semibold text-gray-900">{activity.action}</span>{' '}
                    <span className="text-gray-500">{activity.entity}</span>
                  </p>
                  <p className="text-sm text-gray-600 truncate">{activity.entityName}</p>
                </div>
                <span className="text-xs text-gray-400 whitespace-nowrap">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4">
              <Link
                href="/admin/destinations/new"
                className="flex flex-col items-center justify-center p-6 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center mb-3 shadow-lg shadow-blue-500/30">
                  <Plus className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-semibold text-blue-700">Add Destination</span>
              </Link>
              <Link
                href="/admin/tours/new"
                className="flex flex-col items-center justify-center p-6 bg-orange-50 hover:bg-orange-100 rounded-xl transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center mb-3 shadow-lg shadow-orange-500/30">
                  <Ship className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-semibold text-orange-700">Add Tour</span>
              </Link>
              <Link
                href="/admin/blog/new"
                className="flex flex-col items-center justify-center p-6 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center mb-3 shadow-lg shadow-emerald-500/30">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-semibold text-emerald-700">Write Post</span>
              </Link>
              <Link
                href="/en"
                target="_blank"
                className="flex flex-col items-center justify-center p-6 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center mb-3 shadow-lg shadow-purple-500/30">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-semibold text-purple-700">View Website</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Pending Inquiries */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold text-gray-900">Pending Inquiries</h2>
            <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-full">
              {pendingInquiries.length} New
            </span>
          </div>
          <Link href="/admin/inquiries" className="text-sm text-ocean-600 hover:text-ocean-700 font-medium">
            View All →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                <th className="text-left py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
                <th className="text-left py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Interest</th>
                <th className="text-left py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="text-left py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {pendingInquiries.map((inquiry) => (
                <tr key={inquiry.email} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <span className="font-medium text-gray-900">{inquiry.name}</span>
                  </td>
                  <td className="py-4 px-6 text-gray-600">{inquiry.email}</td>
                  <td className="py-4 px-6 text-gray-600">{inquiry.interest}</td>
                  <td className="py-4 px-6">
                    <span className="inline-flex px-3 py-1 text-xs font-semibold bg-yellow-100 text-yellow-700 rounded-full">
                      {inquiry.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-500">{inquiry.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
