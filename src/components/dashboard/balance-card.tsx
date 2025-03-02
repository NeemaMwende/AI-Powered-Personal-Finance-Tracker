import { FC } from 'react';
import { Card, CardContent } from '@/components/ui/card';
// import { formatCurrency } from '@/utils/formatters';
import Image from 'next/image';

interface BalanceCardProps {
  totalBalance: number;
  income?: number;
  expenses?: number;
  cardNumber?: string;
  cardHolder?: string;
}

const BalanceCard: FC<BalanceCardProps> = ({
  // totalBalance = 4523.98,
  // income = 3150.50,
  // expenses = 1373.48,
  cardNumber = '4328 4389 4141 8183',
  cardHolder = 'Marcel Dias',
}) => {
  return (
    <Card className="relative w-full h-48 rounded-2xl shadow-lg bg-gradient-to-r from-red-600 to-blue-200 text-white overflow-hidden">
      <CardContent className="p-5 flex flex-col justify-between h-full">
    
        <div className="text-lg tracking-widest font-semibold">
          {cardNumber}
        </div>
        
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm">{cardHolder}</p>
            <p className="text-xs text-gray-200">CARDHOLDER</p>
          </div>
          <Image
            src="/cardlogo.png" 
            alt="MasterCard Logo"
            width={40}
            height={25}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default BalanceCard;
