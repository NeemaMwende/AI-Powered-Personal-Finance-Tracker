// src/lib/websocket.ts
'use client';

import { useState, useEffect, useCallback } from 'react';

type WebSocketMessage = {
  type: string;
  data: unknown;
};

export function useWebSocket(url: string) {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<WebSocketMessage[]>([]);

  useEffect(() => {
    // Create WebSocket connection
    const websocket = new WebSocket(url);
    
    websocket.onopen = () => {
      setIsConnected(true);
      console.log('WebSocket connection established');
    };
    
    websocket.onclose = () => {
      setIsConnected(false);
      console.log('WebSocket connection closed');
    };
    
    websocket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
    
    websocket.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        setMessages((prev) => [...prev, message]);
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };
    
    setSocket(websocket);
    
    // Cleanup
    return () => {
      websocket.close();
    };
  }, [url]);

  const sendMessage = useCallback(
    (type: string, data: unknown) => {
      if (socket && isConnected) {
        socket.send(JSON.stringify({ type, data }));
      }
    },
    [socket, isConnected]
  );

  return { isConnected, messages, sendMessage };
}