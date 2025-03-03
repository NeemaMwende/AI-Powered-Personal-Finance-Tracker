// src/components/dashboard/payables-list.tsx
import { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/utils/formatters';

interface Payable {
  id: string;
  amount: number;
  description: string;
}

interface PayablesListProps {
  payables?: Payable[];
}

const PayablesList: FC<PayablesListProps> = ({
  payables = [
    { id: '1', amount: 302.98, description: 'Spotify subscription' },
    { id: '2', amount: 1030.98, description: 'Google cloud storage' },
  ],
}) => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-0 px-4 py-3 md:px-6 md:py-4">
        <CardTitle className="text-xs sm:text-sm font-medium">Payables</CardTitle>
      </CardHeader>
      <CardContent className="p-4 md:p-6 pt-2 md:pt-3">
        <div className="space-y-2 sm:space-y-3">
          {payables.map((payable) => (
            <div key={payable.id} className="flex items-center justify-between">
              <div className="w-3 h-3 sm:w-4 sm:h-4 border border-gray-300 rounded-sm" />
              <div className="flex-1 ml-2 sm:ml-3">
                <p className="text-xs sm:text-sm font-medium">{formatCurrency(payable.amount)}</p>
                <p className="text-xxs sm:text-xs text-gray-500 truncate max-w-32 sm:max-w-full">
                  {payable.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PayablesList;