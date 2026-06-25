'use client';

import Link from 'next/link';
import { MapPin, Ship, FileText, MessageSquare, ArrowRight, TrendingUp, Users, Eye } from 'lucide-react';

const stats = [
  { name: 'Destinations', href: '/admin/destinations', count: 12, icon: MapPin, color: 'bg-ocean-500' },
  { name: 'Tours', href: '/admin/tours', count: 24, icon: Ship, color: 'bg-coral-500' },
  { name: 'Blog Posts', href: '/admin/blog', count: 18, icon: FileText, color: 'bg-green-500' },
  { name: 'New Inquiries', href: '/admin/inquiries', count: 5, icon: MessageSquare, color: 'bg-purple-500' },
];

const recentActivity = [
  { id: 1, action: 'Created', entity: 'Destination', entityName: 'Komodo National Park', time: '2 hours ago' },
  { id: 2, action: 'Updated', entity: 'Tour', entityName: 'Maldives 5-Day Island Hopping', time: '4 hours ago' },
  { id: 3, action: 'New Inquiry', entity: 'Inquiry', entityName: 'Sarah Johnson - Fiji Tour', time: '5 hours ago' },
  { id: 4, action: 'Published', entity: 'Blog Post', entityName: 'Top 10 Underwater Destinations', time: '1 day ago' },
  { id: 5, action: 'Deleted', entity: 'Image', entityName: 'Old hero-banner.jpg', time: '2 days ago' },
];

const quickStats = [
  { label: 'Website Visitors (This Month)', value: '12,456', change: '+18%', positive: true },
  { label: 'Inquiry Conversion Rate', value: '24%', change: '+5%', positive: true },
  { label: 'Average Session Duration', value: '3m 42s', change: '+12%', positive: true },
  { label: 'Booking Requests', value: '89', change: '+32%', positive: true },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500">Welcome back! Here's what's happening with your website.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Link
            key={stat.name}
            href={stat.href}
            className="bg-white rounded-xl p-6 border border-gray-200 hover:border-ocean-300 transition-colors group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-ocean-500 group-hover:translate-x-1 transition-all" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{stat.count}</div>
            <div className="text-gray-500 text-sm">{stat.name}</div>
          </Link>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-green-500" />
          Performance Overview
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickStats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-500 mb-1">{stat.label}</div>
              <span
                className={`text-sm font-medium ${
                  stat.positive ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {stat.change}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
            <Link href="/admin/activity-log" className="text-sm text-ocean-600 hover:text-ocean-700">
              View All →
            </Link>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0"
              >
                <div
                  className={`w-2 h-2 rounded-full mt-2 ${
                    activity.action === 'Created'
                      ? 'bg-green-500'
                      : activity.action === 'Updated'
                      ? 'bg-blue-500'
                      : activity.action === 'Published'
                      ? 'bg-purple-500'
                      : 'bg-red-500'
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">{activity.action}</span>{' '}
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
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link
              href="/admin/destinations/new"
              className="flex flex-col items-center justify-center p-6 bg-ocean-50 rounded-xl hover:bg-ocean-100 transition-colors"
            >
              <MapPin className="w-8 h-8 text-ocean-600 mb-2" />
              <span className="text-sm font-medium text-ocean-700">Add Destination</span>
            </Link>
            <Link
              href="/admin/tours/new"
              className="flex flex-col items-center justify-center p-6 bg-coral-50 rounded-xl hover:bg-coral-100 transition-colors"
            >
              <Ship className="w-8 h-8 text-coral-600 mb-2" />
              <span className="text-sm font-medium text-coral-700">Add Tour</span>
            </Link>
            <Link
              href="/admin/blog/new"
              className="flex flex-col items-center justify-center p-6 bg-green-50 rounded-xl hover:bg-green-100 transition-colors"
            >
              <FileText className="w-8 h-8 text-green-600 mb-2" />
              <span className="text-sm font-medium text-green-700">Write Blog Post</span>
            </Link>
            <Link
              href="/en"
              target="_blank"
              className="flex flex-col items-center justify-center p-6 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors"
            >
              <Eye className="w-8 h-8 text-purple-600 mb-2" />
              <span className="text-sm font-medium text-purple-700">View Website</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Pending Inquiries */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Pending Inquiries</h2>
          <Link href="/admin/inquiries" className="text-sm text-ocean-600 hover:text-ocean-700">
            View All →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Name</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Email</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Interest</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Status</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 text-sm text-gray-900">Sarah Johnson</td>
                <td className="py-3 px-4 text-sm text-gray-600">sarah@example.com</td>
                <td className="py-3 px-4 text-sm text-gray-600">Fiji Tour</td>
                <td className="py-3 px-4">
                  <span className="inline-flex px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-700 rounded-full">
                    New
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-gray-500">2 hours ago</td>
              </tr>
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 text-sm text-gray-900">Michael Chen</td>
                <td className="py-3 px-4 text-sm text-gray-600">michael@example.com</td>
                <td className="py-3 px-4 text-sm text-gray-600">Maldives Package</td>
                <td className="py-3 px-4">
                  <span className="inline-flex px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-700 rounded-full">
                    New
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-gray-500">5 hours ago</td>
              </tr>
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 text-sm text-gray-900">Emma Wilson</td>
                <td className="py-3 px-4 text-sm text-gray-600">emma@example.com</td>
                <td className="py-3 px-4 text-sm text-gray-600">Raja Ampat Diving</td>
                <td className="py-3 px-4">
                  <span className="inline-flex px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-700 rounded-full">
                    New
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-gray-500">1 day ago</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
