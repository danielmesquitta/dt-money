import { ThemeProvider } from 'styled-components';
import { TransactionsProvider } from './contexts/transactions';
import { Transactions } from './pages/Transactions';
import { GlobalStyles } from './styles/global';
import { defaultTheme } from './styles/themes/default';

export const App = () => (
  <ThemeProvider theme={defaultTheme}>
    <TransactionsProvider>
      <Transactions />
    </TransactionsProvider>

    <GlobalStyles />
  </ThemeProvider>
);

export default App;
