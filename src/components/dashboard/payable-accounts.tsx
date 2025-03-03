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
      <CardHeader className="pb-0 px-3 sm:px-4 md:px-6 py-3 sm:py-4">
        <CardTitle className="text-xs sm:text-sm md:text-base font-medium">Payable Accounts</CardTitle>
        <p className="text-xxs sm:text-xs md:text-sm text-gray-500">
          You have paid {current} out of {total} bills
        </p>
      </CardHeader>
      <CardContent className="p-3 sm:p-4 md:p-6 pt-2 sm:pt-3">
        <Progress value={percentage} className="h-1 sm:h-2 md:h-3" />
        <p className="text-xxs sm:text-xs md:text-sm text-gray-500 mt-1 sm:mt-2">
          {current} OUT OF {total}
        </p>
      </CardContent>
    </Card>
  );
};

export default PayableAccounts;
