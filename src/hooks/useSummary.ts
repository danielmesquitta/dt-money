import { useMemo } from 'react';
import { useTransactions } from '~/contexts/transactions';

export const useSummary = () => {
  const { transactions } = useTransactions({ select: ['transactions'] });

  const summary = useMemo(
    () =>
      transactions.reduce(
        (acc, curr) => {
          switch (curr.type) {
            case 'INCOME':
              acc.income += curr.price;
              acc.total += curr.price;
              break;

            case 'OUTCOME':
              acc.outcome += curr.price;
              acc.total -= curr.price;
              break;

            default:
              break;
          }

          return acc;
        },
        {
          income: 0,
          outcome: 0,
          total: 0,
        },
      ),
    [transactions],
  );

  return summary;
};
