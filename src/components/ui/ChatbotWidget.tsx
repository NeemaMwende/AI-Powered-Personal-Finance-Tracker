// src/components/ui/ChatbotWidget.tsx
'use client';

import { useState, useRef, useEffect } from 'react';

type Message = {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I can help you with financial insights and spending suggestions. How can I assist you today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages when new ones are added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Send to your API endpoint
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputMessage }),
      });

      const data = await response.json();

      // Add bot response
      const botMessage: Message = {
        id: Date.now().toString() + '-bot',
        content: data.message || 'Sorry, I couldn\'t process that request.',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error getting response:', error);
      // Add error message
      const errorMessage: Message = {
        id: Date.now().toString() + '-error',
        content: 'Sorry, there was an error processing your request.',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 font-sans">
      {/* Chat Button */}
      <button 
        className="w-14 h-14 rounded-full bg-indigo-600 text-white border-none text-2xl cursor-pointer shadow-lg flex items-center justify-center transition-all hover:bg-indigo-700 hover:scale-105"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle chat"
      >
        {isOpen ? '✕' : '💬'}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 h-96 bg-white rounded-lg shadow-xl flex flex-col overflow-hidden">
          <div className="p-3 bg-indigo-600 text-white font-medium">
            <h3 className="m-0 text-sm">Finance Bot</h3>
          </div>
          <div className="flex-1 p-3 overflow-y-auto flex flex-col gap-2">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`max-w-4/5 p-2.5 rounded-2xl text-sm leading-snug ${
                  message.sender === 'user' 
                    ? 'bg-gray-200 text-black self-end rounded-br-sm' 
                    : 'bg-indigo-600 text-white self-start rounded-bl-sm'
                }`}
              >
                {message.content}
              </div>
            ))}
            {isLoading && (
              <div className="max-w-4/5 p-2.5 rounded-2xl text-sm leading-snug bg-indigo-600 text-white self-start rounded-bl-sm flex gap-1">
                <span className="animate-pulse">•</span>
                <span className="animate-pulse delay-100">•</span>
                <span className="animate-pulse delay-200">•</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSubmit} className="flex p-2 border-t border-gray-200">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your question..."
              disabled={isLoading}
              className="flex-1 p-2 border border-gray-200 rounded-full text-sm outline-none focus:border-indigo-600"
            />
            <button 
              type="submit" 
              disabled={isLoading || !inputMessage.trim()} 
              className="ml-2 px-4 py-2 bg-indigo-600 text-white border-none rounded-full text-sm cursor-pointer disabled:bg-indigo-300 disabled:cursor-not-allowed"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}