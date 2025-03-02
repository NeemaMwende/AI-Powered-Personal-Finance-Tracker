// src/components/transactions/transaction-form.tsx
'use client';

import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { transactionSchema } from '@/types/schema';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

type FormValues = z.infer<typeof transactionSchema>;

interface TransactionFormProps {
  onSubmit: (data: FormValues) => void;
  defaultValues?: Partial<FormValues>;
}

const TransactionForm: FC<TransactionFormProps> = ({
  onSubmit,
  defaultValues = {
    type: 'expense',
    date: new Date().toISOString().split('T')[0],
  },
}) => {
    const form = useForm<FormValues>({
        resolver: zodResolver(transactionSchema),
        defaultValues: {
          ...defaultValues,
          date: defaultValues.date instanceof Date ? defaultValues.date.toISOString().split('T')[0] : defaultValues.date,
        },
      });

  const categories = [
    'Food',
    'Shopping',
    'Transport',
    'Entertainment',
    'Bills',
    'Housing',
    'Health',
    'Education',
    'Travel',
    'Other',
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Transaction Type</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex space-x-4"
                >
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <RadioGroupItem value="income" />
                    </FormControl>
                    <FormLabel className="font-normal">Income</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <RadioGroupItem value="expense" />
                    </FormControl>
                    <FormLabel className="font-normal">Expense</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="What was this for?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
            <FormLabel>Date</FormLabel>
            <FormControl>
                <Input 
                type="date"
                value={field.value instanceof Date ? field.value.toISOString().split('T')[0] : field.value}
                onChange={(e) => field.onChange(e.target.value)}
                />
            </FormControl>
            <FormMessage />
            </FormItem>
                )}
        />

        <Button type="submit" className="w-full">
          Save Transaction
        </Button>
      </form>
    </Form>
  );
};

export default TransactionForm;