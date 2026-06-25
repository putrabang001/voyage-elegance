'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  MapPin,
  Ship,
  FileText,
  Image,
  MessageSquare,
  HelpCircle,
  Star,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Activity,
  Menu,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Destinations', href: '/admin/destinations', icon: MapPin },
  { name: 'Tours', href: '/admin/tours', icon: Ship },
  { name: 'Blog Posts', href: '/admin/blog', icon: FileText },
  { name: 'Gallery', href: '/admin/gallery', icon: Image },
  { name: 'Testimonials', href: '/admin/testimonials', icon: Star },
  { name: 'FAQs', href: '/admin/faqs', icon: HelpCircle },
  { name: 'Inquiries', href: '/admin/inquiries', icon: MessageSquare },
  { name: 'Activity Log', href: '/admin/activity-log', icon: Activity },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 h-16 bg-ocean-900 border-b border-ocean-700 flex items-center justify-between px-4">
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 text-white/80 hover:text-white"
        >
          <Menu className="w-6 h-6" />
        </button>
        <span className="text-white font-medium">Admin Dashboard</span>
        <button
          onClick={handleLogout}
          className="p-2 text-white/80 hover:text-white"
        >
          <LogOut className="w-6 h-6" />
        </button>
      </div>

      {/* Sidebar - Desktop */}
      <aside
        className={cn(
          'fixed top-0 left-0 h-full bg-ocean-900 border-r border-ocean-700 z-30 transition-all duration-300 hidden lg:block',
          collapsed ? 'w-20' : 'w-64'
        )}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-ocean-700">
          {!collapsed && (
            <Link href="/admin/dashboard" className="flex items-center gap-2">
              <div className="relative w-8 h-8">
                <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
                  <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2" className="text-ocean-400" />
                  <path d="M10 20C10 20 15 14 20 14C25 14 30 20 30 20C30 20 25 26 20 26C15 26 10 20 10 20Z" fill="currentColor" className="text-coral-400" />
                  <circle cx="20" cy="20" r="3" fill="currentColor" className="text-ocean-300" />
                </svg>
              </div>
              <span className="text-white font-bold">Admin</span>
            </Link>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 text-white/60 hover:text-white"
          >
            {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors',
                  isActive
                    ? 'bg-ocean-800 text-coral-400'
                    : 'text-white/70 hover:text-white hover:bg-ocean-800/50'
                )}
              >
                <item.icon className={cn('w-5 h-5 flex-shrink-0', collapsed && 'mx-auto')} />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-ocean-700">
          <button
            onClick={handleLogout}
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-white/70 hover:text-white hover:bg-ocean-800/50 transition-colors',
              collapsed && 'justify-center'
            )}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="fixed top-0 left-0 h-full w-64 bg-ocean-900 border-r border-ocean-700 z-50 lg:hidden">
            <div className="h-16 flex items-center justify-between px-4 border-b border-ocean-700">
              <Link href="/admin/dashboard" className="flex items-center gap-2">
                <div className="relative w-8 h-8">
                  <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
                    <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2" className="text-ocean-400" />
                    <path d="M10 20C10 20 15 14 20 14C25 14 30 20 30 20C30 20 25 26 20 26C15 26 10 20 10 20Z" fill="currentColor" className="text-coral-400" />
                    <circle cx="20" cy="20" r="3" fill="currentColor" className="text-ocean-300" />
                  </svg>
                </div>
                <span className="text-white font-bold">Admin</span>
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 text-white/80 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="p-4 space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors',
                      isActive
                        ? 'bg-ocean-800 text-coral-400'
                        : 'text-white/70 hover:text-white hover:bg-ocean-800/50'
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </aside>
        </>
      )}

      {/* Main Content */}
      <main className={cn('pt-16 lg:pt-0 transition-all duration-300', collapsed ? 'lg:pl-20' : 'lg:pl-64')}>
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
