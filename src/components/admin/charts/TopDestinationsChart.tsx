'use client';

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';
import { ChartContainer, ChartHeader, getTooltipStyle } from './chart-utils';
import { cn } from '@/lib/utils';

// Sample data
const destinationData = [
  { name: 'Maldives', value: 35, color: '#06b6d4' },
  { name: 'Raja Ampat', value: 25, color: '#3b82f6' },
  { name: 'Bora Bora', value: 18, color: '#8b5cf6' },
  { name: 'Palawan', value: 12, color: '#f59e0b' },
  { name: 'Others', value: 10, color: '#64748b' },
];

interface TopDestinationsChartProps {
  className?: string;
}

export function TopDestinationsChart({ className }: TopDestinationsChartProps) {
  return (
    <ChartContainer className={className}>
      <ChartHeader
        title="Top Destinations"
        subtitle="Booking distribution by destination"
      />
      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={destinationData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={4}
              dataKey="value"
            >
              {destinationData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              {...getTooltipStyle()}
              formatter={(value: number) => [`${value}%`, 'Share']}
            />
            <Legend
              layout="vertical"
              align="right"
              verticalAlign="middle"
              iconType="circle"
              iconSize={8}
              formatter={(value) => (
                <span className="text-xs text-[var(--muted-foreground)]">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </ChartContainer>
  );
}

// Customer Demographics Chart
const demographicsData = [
  { name: 'Europe', value: 35, color: '#3b82f6' },
  { name: 'North America', value: 28, color: '#06b6d4' },
  { name: 'Asia Pacific', value: 22, color: '#8b5cf6' },
  { name: 'Others', value: 15, color: '#64748b' },
];

export function CustomerDemographicsChart({ className }: TopDestinationsChartProps) {
  return (
    <ChartContainer className={className}>
      <ChartHeader
        title="Customer Demographics"
        subtitle="Geographic distribution of customers"
      />
      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={demographicsData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={4}
              dataKey="value"
            >
              {demographicsData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              {...getTooltipStyle()}
              formatter={(value: number) => [`${value}%`, 'Share']}
            />
            <Legend
              layout="vertical"
              align="right"
              verticalAlign="middle"
              iconType="circle"
              iconSize={8}
              formatter={(value) => (
                <span className="text-xs text-[var(--muted-foreground)]">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </ChartContainer>
  );
}

export default TopDestinationsChart;
