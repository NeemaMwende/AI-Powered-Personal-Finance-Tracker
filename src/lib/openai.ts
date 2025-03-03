// src/lib/openai.ts
import OpenAI from 'openai';

const getOpenAIClient = () => {
  const apiKey = process.env.OPENAI_API_KEY;
  
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is not defined');
  }
  
  return new OpenAI({ apiKey });
};

export async function getSpendingInsights(transactions: unknown[]) {
  try {
    const openai = getOpenAIClient();
    
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
    
    return response.choices[0].message.content || 'Unable to generate spending insights at this time.';
  } catch (error) {
    console.error('Error getting spending insights:', error);
    return 'Unable to generate spending insights at this time.';
  }
}

export async function predictFutureExpenses(transactions: unknown[]) {
  try {
    const openai = getOpenAIClient();
    
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
    
    return response.choices[0].message.content || 'Unable to generate expense predictions at this time.';
  } catch (error) {
    console.error('Error predicting future expenses:', error);
    return 'Unable to generate expense predictions at this time.';
  }
}

export async function categorizeTransaction(transaction: unknown) {
  try {
    const openai = getOpenAIClient();
    
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
    
    return response.choices[0].message.content || 'Other';
  } catch (error) {
    console.error('Error categorizing transaction:', error);
    return 'Other';
  }
}

export async function getDetailedSpendingAnalytics(transactions: unknown[], timeframe: string = 'month') {
  try {
    const openai = getOpenAIClient();
    
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a data analyst specializing in personal finance. Provide detailed, data-driven insights.',
        },
        {
          role: 'user',
          content: `Perform a detailed analysis of these transactions over the ${timeframe}. 
          Include: 
          1. Top spending categories 
          2. Unusual spending patterns 
          3. Month-over-month changes 
          4. Opportunities for savings
          5. Potential budget adjustments
          
          Transactions: ${JSON.stringify(transactions)}`,
        },
      ],
      max_tokens: 500,
    });
    
    return response.choices[0].message.content || 'Unable to generate detailed analytics at this time.';
  } catch (error) {
    console.error('Error getting detailed analytics:', error);
    return 'Unable to generate detailed analytics at this time.';
  }
}

export async function getPersonalizedFinancialAdvice(
  transactions: unknown[], 
  userGoals: string,
  financialSituation: string
) {
  try {
    const openai = getOpenAIClient();
    
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a certified financial planner providing personalized advice.',
        },
        {
          role: 'user',
          content: `Based on this user's financial information, provide personalized financial advice.
          
          Financial Goals: ${userGoals}
          Financial Situation: ${financialSituation}
          Recent Transactions: ${JSON.stringify(transactions)}
          
          Provide specific, actionable advice relevant to their goals and spending patterns.`,
        },
      ],
      max_tokens: 400,
    });
    
    return response.choices[0].message.content || 'Unable to generate personalized advice at this time.';
  } catch (error) {
    console.error('Error getting personalized advice:', error);
    return 'Unable to generate personalized advice at this time.';
  }
}