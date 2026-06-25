'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { ChartContainer, ChartHeader, getTooltipStyle } from './chart-utils';

// Sample data
const revenueData = [
  { month: 'Jan', revenue: 45000, target: 40000 },
  { month: 'Feb', revenue: 52000, target: 45000 },
  { month: 'Mar', revenue: 48000, target: 48000 },
  { month: 'Apr', revenue: 61000, target: 50000 },
  { month: 'May', revenue: 55000, target: 55000 },
  { month: 'Jun', revenue: 72000, target: 60000 },
  { month: 'Jul', revenue: 68000, target: 65000 },
  { month: 'Aug', revenue: 79000, target: 70000 },
  { month: 'Sep', revenue: 85000, target: 75000 },
  { month: 'Oct', revenue: 92000, target: 80000 },
  { month: 'Nov', revenue: 98000, target: 85000 },
  { month: 'Dec', revenue: 124500, target: 100000 },
];

interface RevenueChartProps {
  className?: string;
}

export function RevenueChart({ className }: RevenueChartProps) {
  return (
    <ChartContainer className={className}>
      <ChartHeader
        title="Revenue Trend"
        subtitle="Monthly revenue vs target"
        action={
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[var(--primary)]" />
              <span className="text-xs text-[var(--muted-foreground)]">Revenue</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[var(--muted-foreground)]/30" />
              <span className="text-xs text-[var(--muted-foreground)]">Target</span>
            </div>
          </div>
        }
      />
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="targetGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--muted-foreground)" stopOpacity={0.1} />
                <stop offset="95%" stopColor="var(--muted-foreground)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--border)"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
              tickFormatter={(value) => `$${value / 1000}k`}
              dx={-10}
            />
            <Tooltip {...getTooltipStyle()} />
            <Area
              type="monotone"
              dataKey="target"
              stroke="var(--muted-foreground)"
              strokeWidth={2}
              strokeDasharray="5 5"
              fill="url(#targetGradient)"
              dot={false}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="var(--primary)"
              strokeWidth={3}
              fill="url(#revenueGradient)"
              dot={{ fill: 'var(--primary)', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: 'var(--primary)', strokeWidth: 2, stroke: 'var(--card)' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </ChartContainer>
  );
}

export default RevenueChart;
