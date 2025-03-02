// src/components/sidebar/sidebar-nav.tsx
'use client';

import { FC } from 'react';
import { usePathname } from 'next/navigation';
import SidebarItem from './sidebar-item';
import { LayoutDashboard, Wallet, Receipt, BarChart2, Settings, HelpCircle } from 'lucide-react';

const SidebarNav: FC = () => {
  const pathname = usePathname();
  
  const routes = [
    {
      icon: <LayoutDashboard size={20} />,
      label: 'Dashboard',
      href: '/dashboard',
    },
    {
      icon: <Wallet size={20} />,
      label: 'Wallet',
      href: '/wallet',
    },
    {
      icon: <Receipt size={20} />,
      label: 'Transactions',
      href: '/transactions',
    },
    {
      icon: <BarChart2 size={20} />,
      label: 'Revenue analytics',
      href: '/revenue-analytics',
    },
    {
      icon: <Settings size={20} />,
      label: 'Setting',
      href: '/settings',
    },
    {
      icon: <HelpCircle size={20} />,
      label: 'Help',
      href: '/help',
    },
  ];

  return (
    <div className="space-y-1">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
          isActive={pathname === route.href}
        />
      ))}
    </div>
  );
};

export default SidebarNav;