import styled from 'styled-components';
import { SummaryCardProps } from './types';

export const SummaryContainer = styled.section`
  width: 100%;
  max-width: 70rem;
  margin: 0 auto;
  padding: 0 1.5rem;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  margin-top: -5rem;
`;

export const SummaryCard = styled.div<SummaryCardProps>`
  background-color: ${({ theme, variant = 'gray' }) =>
    variant === 'gray' ? theme['gray-600'] : theme[`${variant}-700`]};
  border-radius: 6px;
  padding: 2rem;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${({ theme }) => theme['gray-300']};
  }

  strong {
    display: block;
    margin-top: 1rem;
    font-size: 2rem;
  }
`;
