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
        cutout: '80%', // Keeps the inner space large but ensures content fits
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
      <CardHeader className="pb-0 px-4 py-3 md:px-6 md:py-4">
        <CardTitle className="text-xs sm:text-sm font-medium">Earnings</CardTitle>
      </CardHeader>
      <CardContent className="p-4 md:p-6 pt-2 md:pt-3">
      
        <div className="h-32 sm:h-40 md:h-48 lg:h-56 flex items-center justify-center relative">
          <Doughnut data={chartData} options={options} />
         
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <p className="text-sm sm:text-base md:text-lg lg:text-xl font-bold">
              {formatCurrency(earnings)}
            </p>
            <p className="text-xxs sm:text-xs md:text-sm text-gray-500">
              Current earnings
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EarningsDonutChart;
