import { FC } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

interface BalanceCardProps {
  totalBalance: number;
  income?: number;
  expenses?: number;
  cardNumber?: string;
  cardHolder?: string;
}
const BalanceCard: FC<BalanceCardProps> = ({
  cardNumber = '4328 4389 4141 8183',
  cardHolder = 'Marcel Dias',
}) => {
  const formatCardNumber = (num: string) => {
    if (typeof window !== 'undefined' && window.innerWidth < 340) {
      return `•••• ${num.slice(-4)}`;
    }

    if (typeof window !== 'undefined' && window.innerWidth < 480) {
      return `•••• •••• •••• ${num.slice(-4)}`;
    }
    return num;
  };

  return (
    <Card className="relative w-full h-36 sm:h-40 md:h-48 rounded-xl sm:rounded-2xl shadow-lg bg-gradient-to-r from-red-600 to-blue-200 text-white overflow-hidden">
      <CardContent className="p-3 sm:p-4 md:p-5 flex flex-col justify-between h-full">
        <div className="text-sm sm:text-base md:text-lg tracking-widest font-semibold break-all sm:break-normal">
          {formatCardNumber(cardNumber)}
        </div>
        
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs sm:text-sm">{cardHolder}</p>
            <p className="text-xs text-gray-200">CARDHOLDER</p>
          </div>
          <div className="relative h-4 w-8 sm:h-6 sm:w-10 md:h-8 md:w-12">
            <Image
              src="/cardlogo.png" 
              alt="MasterCard Logo"
              fill
              sizes="(max-width: 640px) 32px, (max-width: 768px) 40px, 48px"
              style={{ objectFit: 'contain' }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BalanceCard;