// src/types/schema.ts
import { z } from 'zod';

export const transactionSchema = z.object({
  id: z.string().optional(),
  amount: z.number().positive('Amount must be positive'),
  description: z.string().min(1, 'Description is required'),
  category: z.string().min(1, 'Category is required'),
  date: z.string().or(z.date()),
  type: z.enum(['income', 'expense']),
});

export const userSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  image: z.string().optional(),
});

export const walletSchema = z.object({
  id: z.string().optional(),
  balance: z.number(),
  currency: z.string().default('USD'),
  cardNumber: z.string().optional(),
  cardType: z.string().optional(),
});

export type Transaction = z.infer<typeof transactionSchema>;
export type User = z.infer<typeof userSchema>;
export type Wallet = z.infer<typeof walletSchema>;