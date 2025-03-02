// src/components/dashboard/ai-insights.tsx
'use client';

import { FC, useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lightbulb, RefreshCw } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface AIInsightsProps {
  transactions?: unknown[];
}

const AIInsights: FC<AIInsightsProps> = ({ 
  transactions = [] 
}) => {
  const [insights, setInsights] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchInsights = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/ai/insights', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ transactions }),
      });
      
      if (!response.ok) throw new Error('Failed to fetch insights');
      
      const data = await response.json();
      setInsights(data.insights);
    } catch (error) {
      console.error('Error fetching AI insights:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (transactions.length > 0) {
      fetchInsights();
    }
  }, [transactions]);

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">AI Financial Insights</CardTitle>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={fetchInsights} 
          disabled={loading}
        >
          <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
        </Button>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </div>
        ) : (
          <div className="space-y-3">
            {insights ? (
              <div className="text-sm">
                {insights.split('\n').map((insight, index) => (
                  <p key={index} className="mb-2">{insight}</p>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center py-6 text-center text-gray-500">
                <div>
                  <Lightbulb className="mx-auto h-8 w-8 mb-2 opacity-50" />
                  <p>No insights available yet.</p>
                  <p className="text-xs mt-1">Refresh or add more transactions</p>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AIInsights;