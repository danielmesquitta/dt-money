import styled from 'styled-components';
import { TableDataProps } from './types';

export const TableContainer = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.5rem;
  margin-top: 1.5rem;
`;

export const TableBody = styled.tbody``;

export const TableRow = styled.tr``;

export const TableData = styled.td<TableDataProps>`
  padding: 1.25rem 2rem;
  background: ${({ theme }) => theme['gray-700']};

  &:first-of-type {
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    width: 50%;
  }

  &:last-of-type {
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
  }

  color: ${({ color, theme }) => {
    switch (color) {
      case 'green':
        return theme['green-300'];

      case 'red':
        return theme['red-300'];

      default:
        return 'currentColor';
    }
  }};
`;
