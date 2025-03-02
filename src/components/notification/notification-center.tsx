// src/components/notifications/notification-center.tsx
'use client';

import { FC, useEffect, useState } from 'react';
import { Bell } from 'lucide-react';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useWebSocket } from '@/lib/websocket';

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

const NotificationCenter: FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const { messages } = useWebSocket(process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001');

  useEffect(() => {
    // Fetch initial notifications
    fetch('/api/notifications')
      .then((res) => res.json())
      .then((data: Notification[]) => {
        setNotifications(data);
        setUnreadCount(data.filter((n) => !n.read).length);
      })
      .catch((error) => console.error('Error fetching notifications:', error));
  }, []);

  useEffect(() => {
    // Process incoming WebSocket messages
    const newNotification = messages.find((m) => m.type === 'notification');
    
    if (newNotification && newNotification.data) {
      const formattedNotification: Notification = newNotification.data as Notification;

      setNotifications((prev) => [formattedNotification, ...prev]);
      setUnreadCount((prev) => prev + 1);
    }
  }, [messages]);

  const markAllAsRead = () => {
    fetch('/api/notifications/read-all', { method: 'POST' })
      .then(() => {
        setNotifications((prev) => 
          prev.map((n) => ({ ...n, read: true }))
        );
        setUnreadCount(0);
      })
      .catch((error) => console.error('Error marking notifications as read:', error));
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell size={20} />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="flex flex-row items-center justify-between">
          <SheetTitle>Notifications</SheetTitle>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
          >
            Mark all as read
          </Button>
        </SheetHeader>
        <div className="mt-4 space-y-4">
          {notifications.length === 0 ? (
            <p className="text-center text-gray-500 py-4">No notifications</p>
          ) : (
            notifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`p-3 rounded-md ${notification.read ? 'bg-gray-50' : 'bg-blue-50 border-l-4 border-blue-500'}`}
              >
                <div className="flex justify-between">
                  <h4 className="text-sm font-medium">{notification.title}</h4>
                  <span className="text-xs text-gray-500">
                    {new Date(notification.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-sm mt-1">{notification.message}</p>
              </div>
            ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default NotificationCenter;
