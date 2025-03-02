// src/components/dashboard/receipts-list.tsx
import { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { formatCurrency } from '@/utils/formatters';

interface Receipt {
  id: string;
  amount: number;
}

interface ReceiptsListProps {
  receipts?: Receipt[];
}

const ReceiptsList: FC<ReceiptsListProps> = ({
  receipts = [
    { id: '1', amount: 5000 },
    { id: '2', amount: 893 },
    { id: '3', amount: 1030.98 },
  ],
}) => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-0 px-4 py-3 md:px-6 md:py-4">
        <CardTitle className="text-xs sm:text-sm font-medium">Receipts</CardTitle>
      </CardHeader>
      <CardContent className="p-4 md:p-6 pt-2 md:pt-3">
        <div className="space-y-2 sm:space-y-3">
          {receipts.map((receipt) => (
            <div key={receipt.id} className="flex items-center justify-between">
              <div className="flex items-center gap-1 sm:gap-2">
                <ArrowRight size={12} className="text-green-500 sm:size-4" />
                <p className="text-xs sm:text-sm font-medium">{formatCurrency(receipt.amount)}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReceiptsList;