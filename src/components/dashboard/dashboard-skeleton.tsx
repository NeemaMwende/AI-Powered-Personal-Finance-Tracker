// src/components/dashboard/dashboard-skeleton.tsx
import { FC } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const DashboardSkeleton: FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {/* Card balance - full width on mobile, 1 column on larger screens */}
      <Card className="col-span-1 lg:col-span-1">
        <CardContent className="p-3 sm:p-4">
          <Skeleton className="h-4 sm:h-6 w-16 sm:w-24 mb-2 sm:mb-4" />
          <Skeleton className="h-8 sm:h-10 w-24 sm:w-32 mb-4 sm:mb-8" />
          <Skeleton className="h-3 sm:h-4 w-full mb-2" />
          <div className="grid grid-cols-2 gap-2 sm:gap-4 mt-2 sm:mt-4">
            <div>
              <Skeleton className="h-2 sm:h-3 w-10 sm:w-12 mb-1 sm:mb-2" />
              <Skeleton className="h-3 sm:h-4 w-12 sm:w-16" />
            </div>
            <div>
              <Skeleton className="h-2 sm:h-3 w-10 sm:w-12 mb-1 sm:mb-2" />
              <Skeleton className="h-3 sm:h-4 w-12 sm:w-16" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Charts section - stacked on mobile, 2 columns on tablet, spans 2 columns on desktop */}
      <div className="col-span-1 md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
        {/* Monthly earnings chart */}
        <Card>
          <CardHeader className="p-3 sm:p-4">
            <Skeleton className="h-4 sm:h-5 w-24 sm:w-32" />
          </CardHeader>
          <CardContent className="p-3 sm:p-4">
            <Skeleton className="h-24 sm:h-32 w-full" />
          </CardContent>
        </Card>
        
        {/* Earnings donut chart */}
        <Card>
          <CardHeader className="p-3 sm:p-4">
            <Skeleton className="h-4 sm:h-5 w-16 sm:w-20" />
          </CardHeader>
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center justify-center">
              <Skeleton className="h-24 sm:h-32 w-24 sm:w-32 rounded-full" />
            </div>
          </CardContent>
        </Card>
        
        {/* Transactions list */}
        <Card className="col-span-1 sm:col-span-1">
          <CardHeader className="p-3 sm:p-4">
            <Skeleton className="h-4 sm:h-5 w-20 sm:w-24" />
          </CardHeader>
          <CardContent className="p-2 sm:p-3">
            <div className="space-y-1 sm:space-y-2">
              {Array(5).fill(0).map((_, i) => (
                <div key={i} className="flex items-center p-1 sm:p-2">
                  <Skeleton className="h-6 w-6 sm:h-8 sm:w-8 rounded-full" />
                  <div className="ml-2 sm:ml-3 flex-1">
                    <Skeleton className="h-3 sm:h-4 w-16 sm:w-20 mb-1" />
                    <Skeleton className="h-2 sm:h-3 w-10 sm:w-12" />
                  </div>
                  <Skeleton className="h-3 sm:h-4 w-10 sm:w-12" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Right column cards - payables, receipts, AI insights */}
        <div className="col-span-1 space-y-4 sm:space-y-6">
          {/* Payable accounts */}
          <Card>
            <CardHeader className="p-3 sm:p-4">
              <Skeleton className="h-4 sm:h-5 w-24 sm:w-32" />
            </CardHeader>
            <CardContent className="p-3 sm:p-4">
              <Skeleton className="h-2 w-full mb-2" />
              <Skeleton className="h-2 sm:h-3 w-20 sm:w-24" />
            </CardContent>
          </Card>
          
          {/* Payables list */}
          <Card>
            <CardHeader className="p-3 sm:p-4">
              <Skeleton className="h-4 sm:h-5 w-16" />
            </CardHeader>
            <CardContent className="p-3 sm:p-4">
              <div className="space-y-2">
                {Array(3).fill(0).map((_, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <Skeleton className="h-3 sm:h-4 w-3 sm:w-4" />
                    <Skeleton className="h-3 sm:h-4 w-20 sm:w-24" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;