// src/components/sidebar/sidebar.tsx
import { FC } from 'react';
import SidebarNav from './sidebar-nav';
import UserAvatar from './user-avatar';
import LogoutButton from './logout-button';

const Sidebar: FC = () => {
  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b">
        <UserAvatar />
      </div>
      <div className="flex-1 overflow-y-auto py-2">
        <SidebarNav />
      </div>
      <div className="p-4 border-t">
        <LogoutButton />
      </div>
    </div>
  );
};

export default Sidebar;