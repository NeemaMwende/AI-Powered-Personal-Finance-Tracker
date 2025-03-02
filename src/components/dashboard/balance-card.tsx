// src/components/dashboard/balance-card.tsx
import { FC } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { formatCurrency } from '@/utils/formatters';

interface BalanceCardProps {
  totalBalance: number;
  income: number;
  expenses: number;
  cardNumber?: string;
}

const BalanceCard: FC<BalanceCardProps> = ({
  totalBalance = 4523.98,
  income = 3150.50,
  expenses = 1373.48,
  cardNumber = '4328 4389 4141 8183',
}) => {
  return (
    <Card className="h-full">
      <CardContent className="p-4">
        <div className="flex flex-col h-full">
          <div className="flex justify-between mb-4">
            <div>
              <p className="text-sm text-gray-500">Balance</p>
              <h2 className="text-2xl font-bold mt-1">
                {formatCurrency(totalBalance)}
              </h2>
            </div>
            <div className="flex items-center">
              <div className="w-10 h-6 rounded bg-red-500 mr-1"></div>
              <div className="w-10 h-6 rounded bg-yellow-500"></div>
            </div>
          </div>
          
          <div className="mt-auto">
            <p className="text-xs text-gray-500 mb-1">Account Card</p>
            <p className="text-sm">{cardNumber}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <p className="text-xs text-gray-500">Income</p>
              <p className="text-sm font-medium text-green-500">
                {formatCurrency(income)}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Expenses</p>
              <p className="text-sm font-medium text-red-500">
                {formatCurrency(expenses)}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BalanceCard;