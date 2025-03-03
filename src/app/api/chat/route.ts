// src/app/api/chat/route.ts
import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { getSpendingInsights, predictFutureExpenses, categorizeTransaction } from '../../../lib/openai';

const mockTransactions = [
  { date: '2023-03-01', amount: 45.99, description: 'Grocery Store', category: 'Food' },
  { date: '2023-03-02', amount: 9.99, description: 'Streaming Service', category: 'Entertainment' },
  { date: '2023-03-05', amount: 35.00, description: 'Gas Station', category: 'Transport' },
  { date: '2023-03-08', amount: 120.00, description: 'Electricity Bill', category: 'Bills' },
  { date: '2023-03-10', amount: 65.75, description: 'Restaurant', category: 'Food' },
];

export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    let response = '';

    if (message.toLowerCase().includes('insight') || message.toLowerCase().includes('analysis')) {
      response = await getSpendingInsights(mockTransactions);
    } else if (message.toLowerCase().includes('predict') || message.toLowerCase().includes('future') || message.toLowerCase().includes('forecast')) {
      response = await predictFutureExpenses(mockTransactions);
    } else if (message.toLowerCase().includes('categorize') || message.toLowerCase().includes('category')) {
      const transaction = { description: message.replace(/categorize|category/gi, '').trim() };
      response = await categorizeTransaction(transaction);
    } else {
      const apiKey = process.env.OPENAI_API_KEY;
      if (!apiKey) {
        throw new Error('OPENAI_API_KEY is not defined');
      }
      
      const openai = new OpenAI({ apiKey });
      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful financial assistant that provides brief, helpful advice about personal finance and spending habits. Keep responses under 100 words.',
          },
          {
            role: 'user',
            content: message,
          },
        ],
        max_tokens: 150,
      });
      
      response = completion.choices[0].message.content || 'I couldn\'t process that request.';
    }

    return NextResponse.json({ message: response });
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { message: 'An error occurred while processing your request.' },
      { status: 500 }
    );
  }
}