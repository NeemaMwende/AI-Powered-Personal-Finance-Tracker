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
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-1">
            <BalanceCard
              totalBalance={4523.98}
              income={3150.50}
              expenses={1373.48}
              cardNumber="4328 4389 4141 8183"
            />
          </div>
          
          <div className="col-span-2 grid grid-cols-2 gap-6">
            <MonthlyEarningsChart />
            <EarningsDonutChart earnings={4423.98} />
            
            <TransactionsList />
            
            <div className="space-y-6">
              <PayableAccounts current={14} total={19} />
              <ReceiptsList />
              <PayablesList />
            </div>
          </div>
        </div>
      </Suspense>
    </div>
  );
}