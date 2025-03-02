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
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Payables</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {payables.map((payable) => (
            <div key={payable.id} className="flex items-center justify-between">
              <div className="w-4 h-4 border border-gray-300 rounded-sm" />
              <div className="flex-1 ml-3">
                <p className="text-sm font-medium">{formatCurrency(payable.amount)}</p>
                <p className="text-xs text-gray-500">{payable.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PayablesList;