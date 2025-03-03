"use client"
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Mail, MessageCircle } from 'lucide-react';

const HelpPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const faqItems = [
    {
      question: "How do I update my profile information?",
      answer: "Go to Settings and select the Profile tab. There you can update your name, role, email, and profile picture."
    },
    {
      question: "How do I change my password?",
      answer: "Navigate to Settings, select the Password tab, enter your current password and the new password twice to confirm."
    },
    {
      question: "How do I view my transaction history?",
      answer: "Click on the Transactions item in the sidebar to view all your past transactions."
    },
    {
      question: "What payment methods are accepted?",
      answer: "We accept all major credit cards, debit cards, and bank transfers. You can manage your payment methods in the Wallet section."
    },
    {
      question: "How do I export my financial data?",
      answer: "Go to Revenue Analytics and click the Export button at the top right corner to download your data in CSV or PDF format."
    }
  ];
  
  const filteredFaqs = searchQuery 
    ? faqItems.filter(item => 
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.answer.toLowerCase().includes(searchQuery.toLowerCase())
      ) 
    : faqItems;
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Help Center</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Search for Help</CardTitle>
          <CardDescription>Find answers to your questions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search for help topics..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <MessageCircle className="h-8 w-8 mb-2 text-primary" />
              <h3 className="text-lg font-medium mb-1">Live Chat</h3>
              <p className="text-sm text-gray-500 mb-4">Talk to our support team</p>
              <Button variant="outline" className="w-full">Start Chat</Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <Mail className="h-8 w-8 mb-2 text-primary" />
              <h3 className="text-lg font-medium mb-1">Email Support</h3>
              <p className="text-sm text-gray-500 mb-4">Get help via email</p>
              <Button variant="outline" className="w-full">Contact Us</Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <svg className="h-8 w-8 mb-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <h3 className="text-lg font-medium mb-1">Knowledge Base</h3>
              <p className="text-sm text-gray-500 mb-4">Browse our guides</p>
              <Button variant="outline" className="w-full">View Articles</Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {filteredFaqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          
          {filteredFaqs.length === 0 && (
            <div className="py-6 text-center">
              <p className="text-gray-500">No results found for &quot;{searchQuery}&quot;</p>
              <p className="text-sm mt-2">Try a different search term or contact our support team.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default HelpPage;