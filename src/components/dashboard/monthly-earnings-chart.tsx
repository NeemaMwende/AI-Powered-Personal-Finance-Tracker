"use client"
import { FC, useEffect, useState, useCallback } from 'react';
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
import { TooltipItem } from 'chart.js';

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
  const [chartData, setChartData] = useState(() => ({
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
  }));

  // Memoize handleResize so it doesn't change on each render
  const handleResize = useCallback(() => {
    const isMobile = window.innerWidth < 640;
    if (isMobile && data.labels.length > 6) {
      const mobileLabels = data.labels.filter((_, index) => index % 2 === 0);
      const mobileValues = data.values.filter((_, index) => index % 2 === 0);
      
      setChartData((prev) => {
        if (JSON.stringify(prev.labels) !== JSON.stringify(mobileLabels)) {
          return {
            labels: mobileLabels,
            datasets: [
              {
                ...prev.datasets[0],
                data: mobileValues,
              },
            ],
          };
        }
        return prev;
      });
    } else {
      setChartData((prev) => {
        if (JSON.stringify(prev.labels) !== JSON.stringify(data.labels)) {
          return {
            labels: data.labels,
            datasets: [
              {
                ...prev.datasets[0],
                data: data.values,
              },
            ],
          };
        }
        return prev;
      });
    }
  }, [data]);

  useEffect(() => {
    handleResize(); // Run once on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        callbacks: {
          title: (tooltipItems: TooltipItem<'line'>[]) => {
            return tooltipItems[0].label;
          },
          label: (context: TooltipItem<'line'>) => {
            const value = context.raw as number;
            return `$${value.toLocaleString()}`;
          },
        },
        padding: 8,
        titleFont: {
          size: 12,
        },
        bodyFont: {
          size: 12,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 10,
          },
        },
      },
      y: {
        display: false,
      },
    },
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-0 px-4 py-3 md:px-6 md:py-4">
        <CardTitle className="text-xs sm:text-sm font-medium">Monthly earnings</CardTitle>
      </CardHeader>
      <CardContent className="p-4 md:p-6 pt-2 md:pt-3">
        <div className="h-24 sm:h-28 md:h-32">
          <Line data={chartData} options={options} />
        </div>
      </CardContent>
    </Card>
  );
};

export default MonthlyEarningsChart;
