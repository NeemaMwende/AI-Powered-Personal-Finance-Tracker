import { FC, useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lightbulb, RefreshCw } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface AIInsightsProps {
  transactions?: unknown[];
}

const AIInsights: FC<AIInsightsProps> = ({ transactions = [] }) => {
  const [insights, setInsights] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchInsights = useCallback(async () => {
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
  }, [transactions]);

  useEffect(() => {
    if (transactions.length > 0) {
      fetchInsights();
    }
  }, [transactions, fetchInsights]); 

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 px-4 py-3 md:px-6 md:py-4">
        <CardTitle className="text-xs sm:text-sm font-medium">AI Financial Insights</CardTitle>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={fetchInsights} 
          disabled={loading}
          className="h-8 w-8 p-0"
        >
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          <span className="sr-only">Refresh insights</span>
        </Button>
      </CardHeader>
      <CardContent className="px-4 py-0 md:px-6">
        {loading ? (
          <div className="space-y-2 pb-4">
            <Skeleton className="h-3 sm:h-4 w-full" />
            <Skeleton className="h-3 sm:h-4 w-5/6" />
            <Skeleton className="h-3 sm:h-4 w-4/6" />
          </div>
        ) : (
          <div className="space-y-3 pb-4">
            {insights ? (
              <div className="text-xs sm:text-sm">
                {insights.split('\n').map((insight, index) => (
                  <p key={index} className="mb-2">{insight}</p>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center py-4 sm:py-6 text-center text-gray-500">
                <div>
                  <Lightbulb className="mx-auto h-6 w-6 sm:h-8 sm:w-8 mb-2 opacity-50" />
                  <p className="text-xs sm:text-sm">No insights available yet.</p>
                  <p className="text-xs mt-1 text-gray-400">Refresh or add more transactions</p>
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
