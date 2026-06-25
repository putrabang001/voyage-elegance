'use client';

import { ThemeProvider } from '@/lib/theme';
import { AdminLayoutContent } from '@/components/admin/layout/AdminLayoutContent';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </ThemeProvider>
  );
}
