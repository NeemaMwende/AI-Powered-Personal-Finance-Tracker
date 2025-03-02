// src/components/dashboard/payable-accounts.tsx
import { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface PayableAccountsProps {
  current: number;
  total: number;
}

const PayableAccounts: FC<PayableAccountsProps> = ({
  current = 14,
  total = 19,
}) => {
  const percentage = (current / total) * 100;
  
  return (
    <Card className="h-full">
      <CardHeader className="pb-0 px-4 py-3 md:px-6 md:py-4">
        <CardTitle className="text-xs sm:text-sm font-medium">Payable Accounts</CardTitle>
        <p className="text-xxs sm:text-xs text-gray-500">
          You have paid {current} out of {total} bills
        </p>
      </CardHeader>
      <CardContent className="p-4 md:p-6 pt-2 md:pt-3">
        <Progress value={percentage} className="h-1.5 sm:h-2" />
        <p className="text-xxs sm:text-xs text-gray-500 mt-1 sm:mt-2">
          {current} OUT OF {total}
        </p>
      </CardContent>
    </Card>
  );
};

export default PayableAccounts;