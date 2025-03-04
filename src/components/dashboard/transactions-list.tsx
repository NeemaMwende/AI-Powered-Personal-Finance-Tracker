// src/components/dashboard/transactions-list.tsx
"use client"
import { FC, useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ShoppingBag,
  Coffee,
  Home,
  Car,
  Plane,
  Utensils,
  Gift
} from 'lucide-react';
import { formatCurrency } from '@/utils/formatters';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Transaction {
  id: string;
  category: string;
  date: string;
  amount: number;
  description: string;
  icon?: React.ReactNode;
}


const formatDateForDisplay = (dateString: string) => {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return dateString;
    }
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${monthNames[date.getMonth()]} ${date.getDate()}`;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return dateString;
  }
};

const getIconByCategory = (categoryName: string) => {
  const categories = [
    { name: 'Shopping', icon: <ShoppingBag size={16} /> },
    { name: 'Food', icon: <Utensils size={16} /> },
    { name: 'Coffee', icon: <Coffee size={16} /> },
    { name: 'Housing', icon: <Home size={16} /> },
    { name: 'Transport', icon: <Car size={16} /> },
    { name: 'Travel', icon: <Plane size={16} /> },
    { name: 'Gift', icon: <Gift size={16} /> },
  ];
  
  const category = categories.find(cat => cat.name === categoryName);
  return category ? category.icon : <ShoppingBag size={16} />;
};

interface TransactionsListProps {
  limit?: number;
  showViewAll?: boolean;
}

const TransactionsList: FC<TransactionsListProps> = ({
  limit = 5,
  showViewAll = true,
}) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const router = useRouter();

  // Load transactions from localStorage on component mount
  useEffect(() => {
    const loadTransactions = () => {
      try {
        const savedTransactions = localStorage.getItem('transactions');
        if (savedTransactions) {
          const parsedTransactions = JSON.parse(savedTransactions);
          
          // Ensure each transaction has valid properties
          const validatedTransactions = parsedTransactions.map((transaction: unknown) => {
            if (typeof transaction === "object" && transaction !== null) {
              const tx = transaction as Partial<Transaction>;
              return {
                amount: typeof tx.amount === "number" ? tx.amount : 0,
                date: typeof tx.date === "string" ? tx.date : new Date().toISOString().split("T")[0],
                description: typeof tx.description === "string" ? tx.description : "",
              };
            }
            return { amount: 0, date: new Date().toISOString().split("T")[0], description: "" };
          });
          
          
          const sortedTransactions = validatedTransactions
            .sort((a: Transaction, b: Transaction) => {
              const dateA = new Date(a.date).getTime();
              const dateB = new Date(b.date).getTime();
              // Handle invalid dates by placing them at the end
              if (isNaN(dateA) && isNaN(dateB)) return 0;
              if (isNaN(dateA)) return 1;
              if (isNaN(dateB)) return -1;
              return dateB - dateA;
            })
            .slice(0, limit);
          
          setTransactions(sortedTransactions);
        }
      } catch (error) {
        console.error('Error loading transactions:', error);
        setTransactions([]);
      }
    };

    loadTransactions();

    window.addEventListener('storage', loadTransactions);
    
    const handleTransactionUpdate = () => loadTransactions();
    window.addEventListener('transactionUpdate', handleTransactionUpdate);

    return () => {
      window.removeEventListener('storage', loadTransactions);
      window.removeEventListener('transactionUpdate', handleTransactionUpdate);
    };
  }, [limit]);

  const handleViewAll = () => {
    router.push('/transactions');
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-0 px-4 py-3 md:px-6 md:py-4">
        <CardTitle className="text-xs sm:text-sm font-medium">Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent className="px-2 py-2 md:py-3 flex-grow overflow-hidden flex flex-col">
        <div className="space-y-0.5 sm:space-y-1 overflow-y-auto flex-grow">
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-1.5 sm:p-2 rounded-md hover:bg-gray-50"
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    {getIconByCategory(transaction.category)}
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-medium">{transaction.category}</p>
                    <p className="text-xxs sm:text-xs text-gray-500">{formatDateForDisplay(transaction.date)}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <p className="text-xs sm:text-sm font-medium">
                    {formatCurrency(transaction.amount || 0)}
                  </p>
                  <p className="text-xxs sm:text-xs text-gray-500 truncate max-w-[120px]">
                    {transaction.description}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center h-full py-6">
              <p className="text-xs sm:text-sm text-gray-500">No transactions found</p>
            </div>
          )}
        </div>
        
        {showViewAll && transactions.length > 0 && (
          <div className="pt-2 mt-2 border-t">
            <Button 
              variant="ghost" 
              className="w-full justify-between text-xs sm:text-sm"
              onClick={handleViewAll}
            >
              View all transactions
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TransactionsList;