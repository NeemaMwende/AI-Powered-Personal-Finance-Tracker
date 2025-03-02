// src/app/api/ai/insights/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getSpendingInsights } from '@/lib/openai';

export async function POST(request: NextRequest) {
  try {
    const { transactions } = await request.json();
    
    if (!transactions || !Array.isArray(transactions)) {
      return NextResponse.json(
        { error: 'Invalid transactions data' },
        { status: 400 }
      );
    }
    
    const insights = await getSpendingInsights(transactions);
    
    return NextResponse.json({ insights });
  } catch (error) {
    console.error('Error in AI insights API:', error);
    return NextResponse.json(
      { error: 'Failed to generate insights' },
      { status: 500 }
    );
  }
}