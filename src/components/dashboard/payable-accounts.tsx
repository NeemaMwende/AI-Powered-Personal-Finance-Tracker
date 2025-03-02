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
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Payable Accounts</CardTitle>
        <p className="text-xs text-gray-500">You have paid {current} out of {total} bills</p>
      </CardHeader>
      <CardContent>
        <Progress value={percentage} className="h-2" />
        <p className="text-xs text-gray-500 mt-2">
          {current} OUT OF {total}
        </p>
      </CardContent>
    </Card>
  );
};

export default PayableAccounts;