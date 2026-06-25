'use client';

import {
  FunnelChart,
  Funnel,
  LabelList,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { ChartContainer, ChartHeader, getTooltipStyle } from './chart-utils';

// Sample data for inquiry sources
const inquiryData = [
  { name: 'Website', value: 450, fill: '#3b82f6' },
  { name: 'Social Media', value: 280, fill: '#06b6d4' },
  { name: 'Referral', value: 150, fill: '#8b5cf6' },
  { name: 'Email Campaign', value: 80, fill: '#f59e0b' },
  { name: 'Direct', value: 40, fill: '#10b981' },
];

interface InquirySourcesChartProps {
  className?: string;
}

export function InquirySourcesChart({ className }: InquirySourcesChartProps) {
  return (
    <ChartContainer className={className}>
      <ChartHeader
        title="Inquiry Sources"
        subtitle="Where inquiries come from"
      />
      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <FunnelChart>
            <Tooltip {...getTooltipStyle()} />
            <Funnel
              data={inquiryData}
              dataKey="value"
              isAnimationActive
              orientation="horizontal"
              lastShapeType="rectangle"
            >
              <LabelList
                position="right"
                fill="var(--foreground)"
                stroke="none"
                dataKey="name"
                fontSize={12}
              />
              <LabelList
                position="center"
                fill="#ffffff"
                stroke="none"
                dataKey="value"
                fontSize={14}
                fontWeight={600}
              />
            </Funnel>
          </FunnelChart>
        </ResponsiveContainer>
      </div>
    </ChartContainer>
  );
}

export default InquirySourcesChart;
