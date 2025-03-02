// src/app/layout.tsx
import { FC, ReactNode } from 'react';
import Sidebar from '@/components/sidebar/sidebar';
import './globals.css';

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div className="flex h-screen bg-gray-50">
          <Sidebar />
          <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;