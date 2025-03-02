// src/app/dashboard/page.tsx
import { Suspense } from 'react';
import BalanceCard from '@/components/dashboard/balance-card';
import MonthlyEarningsChart from '@/components/dashboard/monthly-earnings-chart';
import EarningsDonutChart from '@/components/dashboard/earnings-donut-chart';
import TransactionsList from '@/components/dashboard/transactions-list';
import PayableAccounts from '@/components/dashboard/payable-accounts';
import ReceiptsList from '@/components/dashboard/receipts-list';
import PayablesList from '@/components/dashboard/payables-list';
import DashboardSkeleton from '@/components/dashboard/dashboard-skeleton';

export default function DashboardPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>
      
      <Suspense fallback={<DashboardSkeleton />}>
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-4">
            <BalanceCard
              totalBalance={4523.98}
              income={3150.50}
              expenses={1373.48}
              cardNumber="4328 4389 4141 8183"
            />
          </div>
          
          <div className="col-span-8">
            <div className="grid grid-cols-12 gap-6 h-full">
             
              <div className="col-span-8">
                <div className="flex flex-col h-full">
                  <h3 className="text-sm font-medium mb-1">Balance</h3>
                  <div className="bg-white rounded-md shadow-sm p-4 flex-grow flex flex-col">
                    <div className="text-2xl font-bold">${4523.98}</div>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div>
                        <p className="text-xs text-gray-500">Income</p>
                        <p className="text-sm font-medium text-green-500">${3150.50}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Expenses</p>
                        <p className="text-sm font-medium text-red-500">${1373.48}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="col-span-4">
                <div className="flex flex-col h-full">
                  <h3 className="text-sm font-medium mb-1">Payable Accounts</h3>
                  <div className="bg-white rounded-md shadow-sm p-4 flex-grow">
                    <PayableAccounts current={14} total={19} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-span-12">
            <TransactionsList />
          </div>
          
          <div className="col-span-4">
            <MonthlyEarningsChart />
          </div>
          
          <div className="col-span-4">
            <EarningsDonutChart earnings={4423.98} />
          </div>
          
          <div className="col-span-4">
            <div className="grid grid-rows-2 gap-6 h-full">
              <ReceiptsList />
              <PayablesList />
            </div>
          </div>
        </div>
      </Suspense>
    </div>
  );
}