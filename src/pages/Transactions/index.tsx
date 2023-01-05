import { Header } from '~/components/Header';
import { SearchForm } from '~/components/SearchForm';
import { Summary } from '~/components/Summary';
import { Table } from '~/components/Table';
import { TransactionsContainer, TransactionsContent } from './styles';

export const Transactions = () => {
  return (
    <TransactionsContainer>
      <Header />

      <Summary />

      <TransactionsContent>
        <SearchForm />

        <Table />
      </TransactionsContent>
    </TransactionsContainer>
  );
};
