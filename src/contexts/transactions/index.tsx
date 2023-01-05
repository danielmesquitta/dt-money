import { useCallback, useEffect, useState } from 'react';
import { createContext, useContextSelector } from 'use-context-selector';
import { api } from '~/services/api';
import type {
  CreateTransactionDTO,
  Transaction,
  TransactionProviderProps,
  TransactionsContextType,
  UseTransactionsData,
} from './types';

const TransactionsContext = createContext({} as TransactionsContextType);

export const TransactionsProvider = ({
  children,
}: TransactionProviderProps) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const fetchTransactions = useCallback(async (query?: string) => {
    const { data } = await api.get('/transactions', {
      params: { q: query, _sort: 'id', _order: 'desc' },
    });

    setTransactions(data);
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const createTransaction = useCallback(async (data: CreateTransactionDTO) => {
    const { data: newTransaction } = await api.post('/transactions', {
      ...data,
      createdAt: new Date().toISOString(),
    });

    setTransactions((prev) => [newTransaction, ...prev]);
  }, []);

  return (
    <TransactionsContext.Provider
      value={{ transactions, fetchTransactions, createTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};

export const useTransactions = (data?: UseTransactionsData) => {
  const { select } = data || { select: [] };

  const context = useContextSelector(TransactionsContext, (context) => {
    if (select.length) {
      const selectedContext = {} as Partial<TransactionsContextType>;

      select.forEach((key) => {
        Object.assign(selectedContext, { [key]: context[key] });
      });

      console.log({ selectedContext });

      return selectedContext as TransactionsContextType;
    }

    return context;
  });

  if (!context) {
    throw new Error(
      'useTransactions must be used within a TransactionsContextProvider',
    );
  }

  return context;
};
