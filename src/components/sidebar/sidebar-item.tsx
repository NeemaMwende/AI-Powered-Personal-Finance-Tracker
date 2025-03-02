// src/components/sidebar/sidebar-item.tsx
import { FC } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  isActive?: boolean;
}

const SidebarItem: FC<SidebarItemProps> = ({
  icon,
  label,
  href,
  isActive = false,
}) => {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-md",
        isActive
          ? "bg-gray-100 text-gray-900"
          : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
      )}
    >
      {icon}
      {label}
    </Link>
  );
};

export default SidebarItem;