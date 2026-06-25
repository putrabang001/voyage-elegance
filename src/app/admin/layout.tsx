'use client';

import { useState, ReactNode } from 'react';
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
  Search,
  Waves,
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

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[#09090b]">
      {/* Top Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/5">
        <div className="h-full px-4 flex items-center justify-between">
          {/* Left - Mobile Menu & Logo */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            <Link href="/admin/dashboard" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-ocean-500 to-ocean-600 flex items-center justify-center shadow-lg shadow-ocean-500/20">
                <Waves className="w-5 h-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <span className="font-bold text-white text-lg">Voyage</span>
                <span className="text-xs text-gray-400 block -mt-1">Admin</span>
              </div>
            </Link>
          </div>

          {/* Center - Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search anything..."
                className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-ocean-500/50 transition-all"
              />
            </div>
          </div>

          {/* Right - Actions */}
          <div className="flex items-center gap-2">
            <button className="relative p-2.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-coral-500 rounded-full" />
            </button>
            <div className="hidden sm:flex items-center gap-3 pl-4 border-l border-white/10">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-ocean-500 to-coral-500 flex items-center justify-center text-white text-sm font-medium">
                A
              </div>
              <div className="hidden lg:block">
                <p className="text-sm font-medium text-white">Admin</p>
                <p className="text-xs text-gray-400">Superadmin</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar - Desktop */}
      <aside
        className={cn(
          'fixed top-16 left-0 bottom-0 z-40 bg-[#0a0a0f]/50 backdrop-blur-xl border-r border-white/5 transition-all duration-300 hidden lg:block',
          collapsed ? 'w-20' : 'w-64'
        )}
      >
        <nav className="p-3 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group',
                  isActive
                    ? 'bg-gradient-to-r from-ocean-500/20 to-ocean-500/10 text-ocean-400 border border-ocean-500/20'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                )}
              >
                <item.icon className={cn('w-5 h-5 flex-shrink-0', isActive && 'text-ocean-400')} />
                {!collapsed && (
                  <span className={cn('text-sm font-medium', isActive && 'text-ocean-400')}>
                    {item.name}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Collapse Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 w-6 h-6 bg-[#18181b] border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          {collapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
        </button>

        {/* Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-white/5">
          <button
            onClick={handleLogout}
            className={cn(
              'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200',
              collapsed && 'justify-center'
            )}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="fixed top-0 left-0 bottom-0 w-72 z-50 bg-[#0a0a0f] border-r border-white/5 lg:hidden overflow-y-auto">
            <div className="h-16 flex items-center justify-between px-4 border-b border-white/5">
              <Link href="/admin/dashboard" className="flex items-center gap-3" onClick={() => setMobileOpen(false)}>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-ocean-500 to-ocean-600 flex items-center justify-center">
                  <Waves className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="font-bold text-white">Voyage Elegance</span>
                  <span className="text-xs text-gray-400 block">Admin Panel</span>
                </div>
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="p-3 space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 rounded-xl transition-all',
                      isActive
                        ? 'bg-ocean-500/20 text-ocean-400 border border-ocean-500/20'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-white/5">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </aside>
        </>
      )}

      {/* Main Content */}
      <main className={cn('pt-16 min-h-screen transition-all duration-300', collapsed ? 'lg:pl-20' : 'lg:pl-64')}>
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
