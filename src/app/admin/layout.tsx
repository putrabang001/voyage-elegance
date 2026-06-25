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
  Bell,
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
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-40 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-ocean-500 to-ocean-600 flex items-center justify-center">
            <Ship className="w-5 h-5 text-white" />
          </div>
          <span className="font-semibold text-gray-900">Admin</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
            <Bell className="w-5 h-5" />
          </button>
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Sidebar - Desktop */}
      <aside
        className={cn(
          'fixed top-0 left-0 h-full bg-white border-r border-gray-200 z-30 transition-all duration-300 hidden lg:block shadow-sm',
          collapsed ? 'w-20' : 'w-64'
        )}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-100">
          {!collapsed && (
            <Link href="/admin/dashboard" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-ocean-500 to-ocean-600 flex items-center justify-center shadow-lg shadow-ocean-500/20">
                <Ship className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-bold text-gray-900 block">Voyage</span>
                <span className="text-xs text-ocean-600">Admin Panel</span>
              </div>
            </Link>
          )}
          {collapsed && (
            <Link href="/admin/dashboard" className="mx-auto">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-ocean-500 to-ocean-600 flex items-center justify-center shadow-lg shadow-ocean-500/20">
                <Ship className="w-5 h-5 text-white" />
              </div>
            </Link>
          )}
        </div>

        {/* Navigation */}
        <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-128px)]">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200',
                  isActive
                    ? 'bg-gradient-to-r from-ocean-500 to-ocean-600 text-white shadow-lg shadow-ocean-500/20'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                )}
              >
                <item.icon className={cn('w-5 h-5 flex-shrink-0', collapsed && 'mx-auto')} />
                {!collapsed && <span className="font-medium">{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-gray-100 bg-white">
          <button
            onClick={handleLogout}
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-red-600 hover:bg-red-50 transition-all duration-200',
              collapsed && 'justify-center'
            )}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span className="font-medium">Logout</span>}
          </button>
        </div>

        {/* Collapse Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 w-6 h-6 bg-white border border-gray-200 rounded-full shadow-sm flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </aside>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="fixed top-0 left-0 h-full w-72 bg-white z-50 lg:hidden shadow-2xl">
            <div className="h-16 flex items-center justify-between px-4 border-b border-gray-100">
              <Link href="/admin/dashboard" className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-ocean-500 to-ocean-600 flex items-center justify-center shadow-lg shadow-ocean-500/20">
                  <Ship className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="font-bold text-gray-900 block">Voyage</span>
                  <span className="text-xs text-ocean-600">Admin Panel</span>
                </div>
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-128px)]">
              {navigation.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      'flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200',
                      isActive
                        ? 'bg-gradient-to-r from-ocean-500 to-ocean-600 text-white shadow-lg shadow-ocean-500/20'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-gray-100 bg-white">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-3 py-3 w-full rounded-xl text-red-600 hover:bg-red-50 transition-all duration-200"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </aside>
        </>
      )}

      {/* Main Content */}
      <main
        className={cn(
          'pt-16 lg:pt-0 min-h-screen transition-all duration-300',
          collapsed ? 'lg:pl-20' : 'lg:pl-64'
        )}
      >
        <div className="p-4 md:p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
