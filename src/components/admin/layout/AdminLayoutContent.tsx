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
  ChevronDown,
  User,
  Plus,
  Sun,
  Moon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/lib/theme';

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

export function AdminLayoutContent({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } catch {
      // Ignore errors
    } finally {
      router.push('/admin/login');
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Top Header */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-[var(--card)] border-b border-[var(--border)]">
        <div className="h-full px-4 flex items-center justify-between">
          {/* Left: Mobile menu + Logo */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)] rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>

            <Link href="/admin/dashboard" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center shadow-lg shadow-[var(--primary)]/20">
                <Waves className="w-5 h-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <span className="font-bold text-[var(--foreground)]">Voyage</span>
                <span className="text-xs text-[var(--muted-foreground)] block -mt-0.5">Admin</span>
              </div>
            </Link>
          </div>

          {/* Center: Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--muted-foreground)]" />
              <input
                type="text"
                placeholder="Search destinations, tours..."
                className="w-full h-10 pl-10 pr-4 rounded-xl bg-[var(--muted)] border border-[var(--border)] text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all"
              />
              <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden lg:inline-flex items-center gap-1 px-2 py-0.5 text-xs text-[var(--muted-foreground)] bg-[var(--card)] border border-[var(--border)] rounded">
                <span className="text-[10px]">⌘</span>K
              </kbd>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="relative p-2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)] rounded-lg transition-colors"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              <Sun className={cn('w-5 h-5 transition-all duration-300', theme === 'dark' && 'rotate-90 scale-0 opacity-0')} />
              <Moon className={cn('absolute inset-0 m-auto w-5 h-5 transition-all duration-300', theme === 'light' && 'rotate-90 scale-0 opacity-0')} />
            </button>

            {/* Notifications */}
            <button className="relative p-2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)] rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[var(--error)] rounded-full" />
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-3 p-1.5 pr-3 rounded-xl hover:bg-[var(--muted)] transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center text-white text-sm font-medium">
                  A
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium text-[var(--foreground)]">Admin</p>
                  <p className="text-xs text-[var(--muted-foreground)]">Superadmin</p>
                </div>
                <ChevronDown className="w-4 h-4 text-[var(--muted-foreground)]" />
              </button>

              {/* User Dropdown */}
              {userMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setUserMenuOpen(false)}
                  />
                  <div className="absolute right-0 top-full mt-2 w-64 bg-[var(--card)] rounded-xl shadow-lg border border-[var(--border)] py-2 z-50">
                    <div className="px-4 py-2 border-b border-[var(--border)]">
                      <p className="font-medium text-[var(--foreground)]">Admin</p>
                      <p className="text-sm text-[var(--muted-foreground)]">admin@voyageelegance.com</p>
                    </div>
                    <div className="py-1">
                      <Link
                        href="/admin/settings"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <User className="w-4 h-4" />
                        Profile Settings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-[var(--error)] hover:bg-[var(--error-soft)]"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign out
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar - Desktop */}
      <aside
        className={cn(
          'fixed top-16 left-0 bottom-0 z-40 w-64 bg-[var(--card)] border-r border-[var(--border)]',
          'hidden lg:block transition-all duration-200',
          collapsed && 'w-16'
        )}
      >
        <nav className="p-3 space-y-1 h-[calc(100vh-4rem)] overflow-y-auto">
          {navigation.map((item) => {
            const isActive =
              pathname === item.href ||
              pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all',
                  isActive
                    ? 'bg-[var(--primary-soft)] text-[var(--primary)] font-medium'
                    : 'text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]',
                  collapsed && 'justify-center px-2'
                )}
              >
                <item.icon className={cn('w-5 h-5 flex-shrink-0', isActive && 'text-[var(--primary)]')} />
                {!collapsed && <span className="text-sm">{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Collapse Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 w-6 h-6 bg-[var(--card)] border border-[var(--border)] rounded-full shadow-sm flex items-center justify-center text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="w-3.5 h-3.5" />
          ) : (
            <ChevronLeft className="w-3.5 h-3.5" />
          )}
        </button>

        {/* Bottom Actions */}
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-[var(--border)] bg-[var(--card)]">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={cn(
              'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)] transition-all',
              collapsed && 'justify-center px-2'
            )}
          >
            <Plus className="w-5 h-5 flex-shrink-0" />
            {!collapsed && (
              <span className="text-sm font-medium">Quick Create</span>
            )}
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-50 bg-black/50 lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="fixed top-0 left-0 bottom-0 w-72 z-50 bg-[var(--card)] shadow-2xl lg:hidden overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-[var(--border)]">
              <Link
                href="/admin/dashboard"
                className="flex items-center gap-3"
                onClick={() => setMobileOpen(false)}
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center">
                  <Waves className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-[var(--foreground)]">Voyage Elegance</span>
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 text-[var(--muted-foreground)] hover:bg-[var(--muted)] rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="p-4 space-y-1">
              {navigation.map((item) => {
                const isActive =
                  pathname === item.href ||
                  pathname.startsWith(item.href + '/');
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 rounded-xl transition-all',
                      isActive
                        ? 'bg-[var(--primary-soft)] text-[var(--primary)] font-medium'
                        : 'text-[var(--muted-foreground)] hover:bg-[var(--muted)]'
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[var(--border)] bg-[var(--card)]">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[var(--error)] hover:bg-[var(--error-soft)]"
              >
                <LogOut className="w-5 h-5" />
                <span>Sign out</span>
              </button>
            </div>
          </aside>
        </>
      )}

      {/* Main Content */}
      <main
        className={cn(
          'pt-16 min-h-screen transition-all duration-200',
          collapsed ? 'lg:pl-16' : 'lg:pl-64'
        )}
      >
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
