// src/components/dashboard/earnings-donut-chart.tsx
'use client';

import { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { formatCurrency } from '@/utils/formatters';

ChartJS.register(ArcElement, Tooltip, Legend);

interface EarningsDonutChartProps {
  earnings: number;
  percentage?: number;
}

const EarningsDonutChart: FC<EarningsDonutChartProps> = ({
  earnings = 4423.98,
  percentage = 75,
}) => {
  const chartData = {
    datasets: [
      {
        data: [percentage, 100 - percentage],
        backgroundColor: ['#4F46E5', '#F3F4F6'],
        borderWidth: 0,
        cutout: '75%',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Earnings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-32 flex items-center justify-center relative">
          <Doughnut data={chartData} options={options} />
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <p className="text-xl font-bold">{formatCurrency(earnings)}</p>
            <p className="text-xs text-gray-500">Current earnings</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EarningsDonutChart;