// src/components/dashboard/transactions-list.tsx
import { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingBag } from 'lucide-react';
import { formatCurrency } from '@/utils/formatters';

interface Transaction {
  id: string;
  category: string;
  date: string;
  amount: number;
  icon?: React.ReactNode;
}

interface TransactionsListProps {
  transactions?: Transaction[];
}

const TransactionsList: FC<TransactionsListProps> = ({
  transactions = [
    { id: '1', category: 'Shopping', date: 'Nov 17', amount: 49.99, icon: <ShoppingBag size={16} /> },
    { id: '2', category: 'Shopping', date: 'Nov 16', amount: 39.99, icon: <ShoppingBag size={16} /> },
    { id: '3', category: 'Shopping', date: 'Nov 15', amount: 99.99, icon: <ShoppingBag size={16} /> },
    { id: '4', category: 'Shopping', date: 'Nov 14', amount: 29.99, icon: <ShoppingBag size={16} /> },
    { id: '5', category: 'Shopping', date: 'Nov 13', amount: 59.99, icon: <ShoppingBag size={16} /> },
  ],
}) => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-0 px-4 py-3 md:px-6 md:py-4">
        <CardTitle className="text-xs sm:text-sm font-medium">Transactions</CardTitle>
      </CardHeader>
      <CardContent className="px-2 py-2 md:py-3">
        <div className="space-y-0.5 sm:space-y-1">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-1.5 sm:p-2 rounded-md hover:bg-gray-50"
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  {transaction.icon ? (
                    <ShoppingBag size={12} className="sm:size-4" />
                  ) : (
                    <ShoppingBag size={12} className="sm:size-4" />
                  )}
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-medium">{transaction.category}</p>
                  <p className="text-xxs sm:text-xs text-gray-500">{transaction.date}</p>
                </div>
              </div>
              <p className="text-xs sm:text-sm font-medium">
                {formatCurrency(transaction.amount)}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionsList;