'use client';

import { useTheme } from '@/lib/theme';
import { cn } from '@/lib/utils';

// Chart colors based on theme
export function useChartColors() {
  const { theme } = useTheme();

  const colors = {
    primary: theme === 'dark' ? '#3b82f6' : '#2563eb',
    secondary: theme === 'dark' ? '#06b6d4' : '#06b6d4',
    success: theme === 'dark' ? '#34d399' : '#10b981',
    warning: theme === 'dark' ? '#fbbf24' : '#f59e0b',
    error: theme === 'dark' ? '#f87171' : '#ef4444',
    muted: theme === 'dark' ? '#475569' : '#cbd5e1',
    text: theme === 'dark' ? '#f8fafc' : '#0f172a',
    textMuted: theme === 'dark' ? '#94a3b8' : '#64748b',
    grid: theme === 'dark' ? '#334155' : '#e2e8f0',
    background: theme === 'dark' ? '#1e293b' : '#ffffff',
    tooltip: {
      bg: theme === 'dark' ? '#1e293b' : '#ffffff',
      border: theme === 'dark' ? '#334155' : '#e2e8f0',
      text: theme === 'dark' ? '#f8fafc' : '#0f172a',
      textMuted: theme === 'dark' ? '#94a3b8' : '#64748b',
    },
  };

  return colors;
}

// Common chart props
export const commonChartProps = {
  margin: { top: 10, right: 10, left: -10, bottom: 0 },
};

// Tooltip style
export function getTooltipStyle() {
  return {
    contentStyle: {
      backgroundColor: 'var(--card)',
      border: '1px solid var(--border)',
      borderRadius: '12px',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    },
    labelStyle: {
      color: 'var(--foreground)',
      fontWeight: 600,
      marginBottom: '4px',
    },
    itemStyle: {
      color: 'var(--foreground)',
    },
  };
}

// Legend style
export const legendStyle = {
  wrapperStyle: {
    paddingTop: '20px' as const,
  },
  formatter: (value: string) => (
    <span style={{ color: 'var(--muted-foreground)', fontSize: '12px' }}>{value}</span>
  ),
};

// Chart container style
export function ChartContainer({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string
}) {
  return (
    <div className={cn(
      'bg-[var(--card)] rounded-2xl border border-[var(--border)] p-6',
      className
    )}>
      {children}
    </div>
  );
}

// Chart header
export function ChartHeader({
  title,
  subtitle,
  action
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h3 className="text-lg font-semibold text-[var(--foreground)]">{title}</h3>
        {subtitle && (
          <p className="text-sm text-[var(--muted-foreground)]">{subtitle}</p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
