'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  MapPin,
  Ship,
  FileText,
  MessageSquare,
  ArrowRight,
  TrendingUp,
  Eye,
  Plus,
  MoreHorizontal,
  ChevronUp,
  ChevronDown,
  Users,
  Calendar,
  DollarSign,
  CreditCard,
} from 'lucide-react';
import {
  RevenueChart,
  MonthlyBookingsChart,
  TopDestinationsChart,
  InquirySourcesChart,
} from '@/components/admin/charts';
import { cn } from '@/lib/utils';

interface StatCardProps {
  label: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
  iconClass: string;
}

// Premium Stat Card Component
function StatCard({ label, value, change, icon, iconClass }: StatCardProps) {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;

  return (
    <div className="relative overflow-hidden rounded-2xl p-6 bg-[var(--card)] border border-[var(--border)] shadow-sm hover:shadow-md transition-all duration-200">
      {/* Icon */}
      <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center mb-4', iconClass)}>
        {icon}
      </div>

      {/* Label */}
      <p className="text-sm font-medium text-[var(--muted-foreground)] mb-1">{label}</p>

      {/* Value */}
      <div className="flex items-end gap-3">
        <h3 className="text-3xl font-bold text-[var(--foreground)]">{value}</h3>

        {/* Change indicator */}
        {change !== undefined && (
          <span
            className={cn(
              'text-sm font-medium mb-1 flex items-center gap-1',
              isPositive && 'text-emerald-500',
              isNegative && 'text-red-500',
              !isPositive && !isNegative && 'text-[var(--muted-foreground)]'
            )}
          >
            {isPositive && <ChevronUp className="w-4 h-4" />}
            {isNegative && <ChevronDown className="w-4 h-4" />}
            {change !== 0 && <span>{Math.abs(change)}%</span>}
            {change === 0 && <span className="text-[var(--muted-foreground)]">0%</span>}
          </span>
        )}
      </div>

      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] rounded-full blur-3xl" />
      </div>
    </div>
  );
}

// Sample Data
const stats = [
  {
    label: 'Total Revenue',
    value: '$124,500',
    change: 12.5,
    icon: <DollarSign className="w-6 h-6" />,
    iconClass: 'bg-emerald-500/10 text-emerald-500',
  },
  {
    label: 'Active Bookings',
    value: '48',
    change: 8.2,
    icon: <Calendar className="w-6 h-6" />,
    iconClass: 'bg-blue-500/10 text-blue-500',
  },
  {
    label: 'New Customers',
    value: '156',
    change: -2.1,
    icon: <Users className="w-6 h-6" />,
    iconClass: 'bg-purple-500/10 text-purple-500',
  },
  {
    label: 'Pending Inquiries',
    value: '12',
    change: 0,
    icon: <MessageSquare className="w-6 h-6" />,
    iconClass: 'bg-amber-500/10 text-amber-500',
  },
];

const recentBookings = [
  {
    id: 'BK-001',
    customer: { name: 'Sarah Johnson', avatar: 'https://i.pravatar.cc/100?img=1' },
    destination: 'Maldives',
    tour: '5-Day Island Hopping',
    date: 'Mar 15, 2026',
    amount: '$4,998',
    status: 'confirmed',
  },
  {
    id: 'BK-002',
    customer: { name: 'Michael Chen', avatar: 'https://i.pravatar.cc/100?img=2' },
    destination: 'Raja Ampat',
    tour: 'Diving Expedition',
    date: 'Mar 14, 2026',
    amount: '$3,299',
    status: 'pending',
  },
  {
    id: 'BK-003',
    customer: { name: 'Emma Wilson', avatar: 'https://i.pravatar.cc/100?img=3' },
    destination: 'Palawan',
    tour: 'Underground River Tour',
    date: 'Mar 13, 2026',
    amount: '$1,599',
    status: 'confirmed',
  },
  {
    id: 'BK-004',
    customer: { name: 'David Brown', avatar: 'https://i.pravatar.cc/100?img=4' },
    destination: 'Bora Bora',
    tour: 'Luxury Overwater Stay',
    date: 'Mar 12, 2026',
    amount: '$8,598',
    status: 'confirmed',
  },
  {
    id: 'BK-005',
    customer: { name: 'Lisa Park', avatar: 'https://i.pravatar.cc/100?img=5' },
    destination: 'Fiji',
    tour: 'Snorkeling & Cultural Tour',
    date: 'Mar 11, 2026',
    amount: '$2,799',
    status: 'pending',
  },
];

const statusConfig = {
  confirmed: { variant: 'success' as const, label: 'Confirmed' },
  pending: { variant: 'warning' as const, label: 'Pending' },
  cancelled: { variant: 'error' as const, label: 'Cancelled' },
};

// Avatar Component
function Avatar({ src, name, size = 'sm' }: { src?: string; name: string; size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  if (src) {
    return (
      <div className={cn('relative rounded-full overflow-hidden', sizeClasses[size])}>
        <Image src={src} alt={name} fill className="object-cover" />
      </div>
    );
  }

  return (
    <div className={cn('rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center text-white font-medium', sizeClasses[size])}>
      {name.charAt(0)}
    </div>
  );
}

// Badge Component
function Badge({ children, variant = 'default' }: { children: React.ReactNode; variant?: 'default' | 'success' | 'warning' | 'error' | 'primary' }) {
  const variantClasses = {
    default: 'bg-[var(--muted)] text-[var(--muted-foreground)]',
    success: 'bg-emerald-500/10 text-emerald-500',
    warning: 'bg-amber-500/10 text-amber-500',
    error: 'bg-red-500/10 text-red-500',
    primary: 'bg-[var(--primary-soft)] text-[var(--primary)]',
  };

  return (
    <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', variantClasses[variant])}>
      {children}
    </span>
  );
}

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Dashboard</h1>
          <p className="text-[var(--muted-foreground)] mt-0.5">
            Welcome back! Here&apos;s what&apos;s happening today.
          </p>
        </div>
        <Link
          href="/en"
          target="_blank"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[var(--muted-foreground)] bg-[var(--card)] border border-[var(--border)] rounded-xl hover:bg-[var(--muted)] transition-colors"
        >
          <Eye className="w-4 h-4" />
          View Website
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            change={stat.change}
            icon={stat.icon}
            iconClass={stat.iconClass}
          />
        ))}
      </div>

      {/* Analytics Section */}
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">Analytics</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RevenueChart />
            <MonthlyBookingsChart />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <TopDestinationsChart />
          <InquirySourcesChart />
          <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-[var(--foreground)]">Quick Stats</h3>
                <p className="text-sm text-[var(--muted-foreground)]">Key performance indicators</p>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { label: 'Avg. Booking Value', value: '$3,200', change: '+8.5%', positive: true },
                { label: 'Conversion Rate', value: '4.2%', change: '+0.8%', positive: true },
                { label: 'Return Customers', value: '28%', change: '-2.1%', positive: false },
                { label: 'Response Time', value: '2.4h', change: '+15%', positive: true },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center justify-between p-3 rounded-xl bg-[var(--muted)]">
                  <span className="text-sm text-[var(--muted-foreground)]">{stat.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[var(--foreground)]">{stat.value}</span>
                    <span className={cn(
                      'text-xs font-medium',
                      stat.positive ? 'text-emerald-500' : 'text-red-500'
                    )}>
                      {stat.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Bookings - 2/3 width */}
        <div className="lg:col-span-2 bg-[var(--card)] rounded-2xl border border-[var(--border)] shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)]">
            <div>
              <h2 className="font-semibold text-[var(--foreground)]">Recent Bookings</h2>
              <p className="text-sm text-[var(--muted-foreground)]">Latest reservations across all destinations</p>
            </div>
            <Link
              href="/admin/bookings"
              className="text-sm font-medium text-[var(--primary)] hover:text-[var(--primary-hover)]"
            >
              View all
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[var(--muted)] border-b border-[var(--border)]">
                  <th className="px-6 py-3 text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider">
                    Booking
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider">
                    Destination
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {recentBookings.map((booking) => {
                  const status = statusConfig[booking.status as keyof typeof statusConfig];
                  return (
                    <tr
                      key={booking.id}
                      className="hover:bg-[var(--muted)]/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <Avatar
                            src={booking.customer.avatar}
                            name={booking.customer.name}
                            size="sm"
                          />
                          <div>
                            <p className="font-medium text-[var(--foreground)]">
                              {booking.customer.name}
                            </p>
                            <p className="text-xs text-[var(--muted-foreground)]">
                              {booking.id}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-[var(--foreground)]">
                            {booking.destination}
                          </p>
                          <p className="text-sm text-[var(--muted-foreground)]">
                            {booking.tour}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-[var(--muted-foreground)]">
                        {booking.date}
                      </td>
                      <td className="px-6 py-4 font-medium text-[var(--foreground)]">
                        {booking.amount}
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant={status.variant}>
                          {status.label}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <button className="p-1 text-[var(--muted-foreground)] hover:text-[var(--foreground)]">
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions - 1/3 width */}
        <div className="space-y-4">
          {/* Quick Actions */}
          <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] shadow-sm p-6">
            <h2 className="font-semibold text-[var(--foreground)] mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: MapPin, label: 'Add Destination', href: '/admin/destinations', color: 'bg-blue-500' },
                { icon: Ship, label: 'Create Tour', href: '/admin/tours', color: 'bg-orange-500' },
                { icon: FileText, label: 'Write Post', href: '/admin/blog', color: 'bg-emerald-500' },
                { icon: Eye, label: 'Preview Site', href: '/en', color: 'bg-purple-500' },
              ].map((action) => (
                <Link
                  key={action.label}
                  href={action.href}
                  className="flex flex-col items-center justify-center p-4 rounded-xl bg-[var(--muted)] hover:bg-[var(--muted-foreground)]/20 transition-colors group"
                >
                  <div
                    className={cn(
                      'w-10 h-10 rounded-xl flex items-center justify-center mb-2 text-white',
                      action.color
                    )}
                  >
                    <action.icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-medium text-[var(--foreground)] text-center">
                    {action.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Top Destinations */}
          <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-[var(--foreground)]">Top Destinations</h2>
              <Link
                href="/admin/destinations"
                className="text-xs font-medium text-[var(--primary)] hover:text-[var(--primary-hover)]"
              >
                View all
              </Link>
            </div>
            <div className="space-y-3">
              {[
                { name: 'Maldives', bookings: 24, image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=100&q=80' },
                { name: 'Raja Ampat', bookings: 18, image: 'https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?w=100&q=80' },
                { name: 'Bora Bora', bookings: 15, image: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=100&q=80' },
              ].map((dest, i) => (
                <div
                  key={dest.name}
                  className="flex items-center gap-3 p-2 -mx-2 rounded-xl hover:bg-[var(--muted)] transition-colors"
                >
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                    <Image
                      src={dest.image}
                      alt={dest.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-[var(--foreground)] truncate">
                      {dest.name}
                    </p>
                    <p className="text-sm text-[var(--muted-foreground)]">{dest.bookings} bookings</p>
                  </div>
                  <div className="flex items-center gap-1 text-emerald-500">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm font-medium">#{i + 1}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Activity & Inquiries */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-[var(--border)] flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-[var(--foreground)]">Recent Activity</h2>
              <p className="text-sm text-[var(--muted-foreground)]">Latest updates from your team</p>
            </div>
            <Link
              href="/admin/activity-log"
              className="text-sm font-medium text-[var(--primary)] hover:text-[var(--primary-hover)]"
            >
              View all
            </Link>
          </div>
          <div className="p-6 space-y-4">
            {[
              { action: 'New booking', detail: 'Sarah Johnson booked Maldives 5-Day Package', time: '2 min ago', type: 'booking' },
              { action: 'Inquiry received', detail: 'Michael Chen requested Fiji Tour info', time: '15 min ago', type: 'inquiry' },
              { action: 'Blog published', detail: 'Top 10 Underwater Destinations', time: '1 hour ago', type: 'content' },
              { action: 'Tour updated', detail: 'Raja Ampat Diving Expedition modified', time: '2 hours ago', type: 'update' },
            ].map((activity, i) => (
              <div
                key={i}
                className="flex items-start gap-3"
              >
                <div
                  className={cn(
                    'w-2 h-2 mt-2 rounded-full',
                    activity.type === 'booking' && 'bg-emerald-500',
                    activity.type === 'inquiry' && 'bg-blue-500',
                    activity.type === 'content' && 'bg-purple-500',
                    activity.type === 'update' && 'bg-amber-500'
                  )}
                />
                <div className="flex-1">
                  <p className="text-sm text-[var(--foreground)]">
                    <span className="font-medium">{activity.action}</span>{' '}
                    <span className="text-[var(--muted-foreground)]">{activity.detail}</span>
                  </p>
                  <p className="text-xs text-[var(--muted-foreground)] mt-0.5">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Inquiries */}
        <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-[var(--border)] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="font-semibold text-[var(--foreground)]">Pending Inquiries</h2>
              <span className="px-2 py-0.5 bg-amber-500/10 text-amber-500 text-xs font-medium rounded-full">
                3 new
              </span>
            </div>
            <Link
              href="/admin/inquiries"
              className="text-sm font-medium text-[var(--primary)] hover:text-[var(--primary-hover)]"
            >
              View all
            </Link>
          </div>
          <div className="divide-y divide-[var(--border)]">
            {[
              {
                name: 'Lisa Park',
                email: 'lisa@example.com',
                subject: 'Fiji Snorkeling Tour',
                time: '3 hours ago',
              },
              {
                name: 'James Wilson',
                email: 'james@example.com',
                subject: 'Maldives Honeymoon Package',
                time: '5 hours ago',
              },
              {
                name: 'Anna Chen',
                email: 'anna@example.com',
                subject: 'Raja Ampat Diving',
                time: '1 day ago',
              },
            ].map((inquiry) => (
              <div
                key={inquiry.email}
                className="px-6 py-4 hover:bg-[var(--muted)] transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <Avatar name={inquiry.name} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-[var(--foreground)] truncate">
                      {inquiry.name}
                    </p>
                    <p className="text-sm text-[var(--muted-foreground)] truncate">
                      {inquiry.subject}
                    </p>
                  </div>
                  <span className="text-xs text-[var(--muted-foreground)]">{inquiry.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
