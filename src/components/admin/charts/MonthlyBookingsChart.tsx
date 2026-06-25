'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { ChartContainer, ChartHeader, getTooltipStyle } from './chart-utils';

// Sample data
const bookingsData = [
  { month: 'Jan', bookings: 28 },
  { month: 'Feb', bookings: 35 },
  { month: 'Mar', bookings: 42 },
  { month: 'Apr', bookings: 48 },
  { month: 'May', bookings: 55 },
  { month: 'Jun', bookings: 62 },
  { month: 'Jul', bookings: 78 },
  { month: 'Aug', bookings: 85 },
  { month: 'Sep', bookings: 72 },
  { month: 'Oct', bookings: 68 },
  { month: 'Nov', bookings: 75 },
  { month: 'Dec', bookings: 92 },
];

interface MonthlyBookingsChartProps {
  className?: string;
}

export function MonthlyBookingsChart({ className }: MonthlyBookingsChartProps) {
  return (
    <ChartContainer className={className}>
      <ChartHeader
        title="Monthly Bookings"
        subtitle="Number of bookings per month"
      />
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={bookingsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="bookingsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--accent)" stopOpacity={1} />
                <stop offset="100%" stopColor="var(--primary)" stopOpacity={0.8} />
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
              dx={-10}
            />
            <Tooltip {...getTooltipStyle()} cursor={{ fill: 'var(--muted)', opacity: 0.3 }} />
            <Bar
              dataKey="bookings"
              fill="url(#bookingsGradient)"
              radius={[6, 6, 0, 0]}
              maxBarSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartContainer>
  );
}

export default MonthlyBookingsChart;
