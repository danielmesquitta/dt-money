import type { ReactNode } from 'react';

export interface Transaction {
  id: number;
  description: string;
  type: 'INCOME' | 'OUTCOME';
  price: number;
  category: string;
  createdAt: string;
}

export type CreateTransactionDTO = Omit<Transaction, 'id' | 'createdAt'>;

export interface TransactionsContextType {
  transactions: Transaction[];
  fetchTransactions: (query?: string) => Promise<void>;
  createTransaction: (transaction: CreateTransactionDTO) => Promise<void>;
}

export interface TransactionProviderProps {
  children: ReactNode;
}

export interface UseTransactionsData {
  select: Array<keyof TransactionsContextType>;
}
