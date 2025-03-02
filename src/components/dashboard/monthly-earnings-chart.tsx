// src/components/dashboard/monthly-earnings-chart.tsx
'use client';

import { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface MonthlyEarningsChartProps {
  data?: {
    labels: string[];
    values: number[];
  };
}

const MonthlyEarningsChart: FC<MonthlyEarningsChartProps> = ({
  data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    values: [3000, 3500, 3200, 4000, 3800, 4200, 4100, 3900, 4300],
  },
}) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Earnings',
        data: data.values,
        borderColor: '#4F46E5',
        backgroundColor: 'rgba(79, 70, 229, 0.1)',
        tension: 0.3,
        pointRadius: 0,
        pointHoverRadius: 4,
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
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        display: false,
      },
    },
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Monthly earnings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-32">
          <Line data={chartData} options={options} />
        </div>
      </CardContent>
    </Card>
  );
};

export default MonthlyEarningsChart;