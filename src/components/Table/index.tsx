import { useTransactions } from '~/contexts/transactions';
import { currencyFormatter, dateFormatter } from '~/utils/formatter';
import { TableBody, TableContainer, TableData, TableRow } from './styles';

export const Table = () => {
  const { transactions } = useTransactions({ select: ['transactions'] });

  return (
    <TableContainer>
      <TableBody>
        {transactions.map(
          ({ id, description, type, price, category, createdAt }) => (
            <TableRow key={id}>
              <TableData>{description}</TableData>

              <TableData color={type === 'INCOME' ? 'green' : 'red'}>
                {`${type === 'INCOME' ? '+' : '-'} ${currencyFormatter.format(
                  price,
                )}`}
              </TableData>

              <TableData>{category}</TableData>

              <TableData>{dateFormatter.format(new Date(createdAt))}</TableData>
            </TableRow>
          ),
        )}
      </TableBody>
    </TableContainer>
  );
};
