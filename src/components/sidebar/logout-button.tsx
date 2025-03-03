import { FC } from 'react';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LogoutButtonProps {
  condensed?: boolean;
}

const LogoutButton: FC<LogoutButtonProps> = ({ condensed = false }) => {
  return (
    <Button 
      variant="ghost" 
      className={`w-full ${condensed ? 'justify-center p-2' : 'justify-start'}`} 
      size="sm"
    >
      <LogOut className="h-4 w-4" />
      {!condensed && <span>Log Out</span>}
    </Button>
  );
};

export default LogoutButton;
