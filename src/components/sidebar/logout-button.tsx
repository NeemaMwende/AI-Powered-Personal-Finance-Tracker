// src/components/sidebar/logout-button.tsx
import { FC } from 'react';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

const LogoutButton: FC = () => {
  return (
    <Button variant="ghost" className="w-full justify-start" size="sm">
      <LogOut className="mr-2 h-4 w-4" />
      Log Out
    </Button>
  );
};

export default LogoutButton;