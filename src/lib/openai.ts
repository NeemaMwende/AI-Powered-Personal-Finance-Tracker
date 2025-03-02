// src/lib/openai.ts
import OpenAI from 'openai';

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  throw new Error('OPENAI_API_KEY is not defined');
}

const openai = new OpenAI({
  apiKey,
});

export async function getSpendingInsights(transactions: unknown[]) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a financial advisor analyzing spending patterns.',
        },
        {
          role: 'user',
          content: `Analyze these transactions and provide 3 brief insights about spending patterns and 2 recommendations: ${JSON.stringify(transactions)}`,
        },
      ],
      max_tokens: 300,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error getting spending insights:', error);
    return 'Unable to generate spending insights at this time.';
  }
}

export async function predictFutureExpenses(transactions: unknown[]) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a financial forecasting expert.',
        },
        {
          role: 'user',
          content: `Based on these transactions, predict likely expenses for the next month and suggest budgeting recommendations: ${JSON.stringify(transactions)}`,
        },
      ],
      max_tokens: 300,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error predicting future expenses:', error);
    return 'Unable to generate expense predictions at this time.';
  }
}

export async function categorizeTransaction(transaction: unknown) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are an AI that categorizes financial transactions accurately.',
        },
        {
          role: 'user',
          content: `Categorize this transaction into one of these categories: Food, Shopping, Transport, Entertainment, Bills, Housing, Health, Education, Travel, Other. Transaction: ${JSON.stringify(transaction)}`,
        },
      ],
      max_tokens: 50,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error categorizing transaction:', error);
    return 'Other';
  }
}