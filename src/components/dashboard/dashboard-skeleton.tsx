// src/components/dashboard/dashboard-skeleton.tsx
import { FC } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const DashboardSkeleton: FC = () => {
  return (
    <div className="grid grid-cols-3 gap-6">
      <Card className="col-span-1">
        <CardContent className="p-4">
          <Skeleton className="h-6 w-24 mb-4" />
          <Skeleton className="h-10 w-32 mb-8" />
          <Skeleton className="h-4 w-full mb-2" />
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <Skeleton className="h-3 w-12 mb-2" />
              <Skeleton className="h-4 w-16" />
            </div>
            <div>
              <Skeleton className="h-3 w-12 mb-2" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="col-span-2 grid grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <Skeleton className="h-5 w-32" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-32 w-full" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <Skeleton className="h-5 w-20" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center">
              <Skeleton className="h-32 w-32 rounded-full" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <Skeleton className="h-5 w-24" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Array(5).fill(0).map((_, i) => (
                <div key={i} className="flex items-center">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <div className="ml-3 flex-1">
                    <Skeleton className="h-4 w-20 mb-1" />
                    <Skeleton className="h-3 w-12" />
                  </div>
                  <Skeleton className="h-4 w-12" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <Skeleton className="h-5 w-32" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-2 w-full mb-2" />
              <Skeleton className="h-3 w-24" />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <Skeleton className="h-5 w-16" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {Array(3).fill(0).map((_, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-24" />
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