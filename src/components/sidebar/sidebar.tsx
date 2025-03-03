'use client';

import { FC, useState } from 'react';
import SidebarNav from './sidebar-nav';
import UserAvatar from './user-avatar';
import LogoutButton from './logout-button';
import { Menu, X } from 'lucide-react';

const Sidebar: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile Toggle Button (visible on small screens) */}
      <button 
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 p-2 rounded-md bg-gray-100 border border-gray-200 shadow-sm md:hidden"
        aria-label="Toggle Sidebar"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile (when sidebar is open) */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" 
          onClick={toggleSidebar}
        />
      )}

      {/* Main Sidebar */}
      <div className={`
        fixed left-0 top-0 h-screen z-40 transition-all duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 md:static
        w-64 bg-white border-r border-gray-200 flex flex-col
        md:hidden lg:flex
      `}>
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

      {/* Condensed Sidebar for Medium Screens */}
      <div className="hidden md:flex lg:hidden fixed left-0 top-0 h-screen w-16 bg-white border-r border-gray-200 flex-col items-center py-4 z-40">
        <div className="mb-6">
          <UserAvatar condensed={true} />
        </div>
        <div className="flex-1 overflow-y-auto w-full">
          <SidebarNav condensed={true} />
        </div>
        <div className="mt-6">
          <LogoutButton condensed={true} />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
