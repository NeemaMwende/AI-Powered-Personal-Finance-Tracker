// src/components/ChatbotProvider.tsx
'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import ChatbotWidget from './ui/ChatbotWidget';

export default function ChatbotProvider() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const excludePaths = [
   '/login', '/signup'
  ];

  if (!mounted) return null;
  
  if (excludePaths.includes(pathname)) return null;
  
  return <ChatbotWidget />;
}