import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from 'phosphor-react';
import { useSummary } from '~/hooks/useSummary';
import { defaultTheme } from '~/styles/themes/default';
import { currencyFormatter } from '~/utils/formatter';
import { SummaryCard, SummaryContainer } from './styles';

export const Summary = () => {
  const summary = useSummary();

  return (
    <SummaryContainer>
      <SummaryCard>
        <header>
          <span>Entradas</span>

          <ArrowCircleUp size={32} color={defaultTheme['green-300']} />
        </header>

        <strong>{currencyFormatter.format(summary.income)}</strong>
      </SummaryCard>

      <SummaryCard>
        <header>
          <span>Saídas</span>

          <ArrowCircleDown size={32} color={defaultTheme['red-300']} />
        </header>

        <strong>{currencyFormatter.format(summary.outcome)}</strong>
      </SummaryCard>

      <SummaryCard variant={summary.total > 0 ? 'green' : 'red'}>
        <header>
          <span>Total</span>

          <CurrencyDollar size={32} color={defaultTheme['white']} />
        </header>

        <strong>{currencyFormatter.format(summary.total)}</strong>
      </SummaryCard>
    </SummaryContainer>
  );
};
