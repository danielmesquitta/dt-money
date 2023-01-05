import { zodResolver } from '@hookform/resolvers/zod';
import { MagnifyingGlass, Trash } from 'phosphor-react';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import * as zod from 'zod';
import { useTransactions } from '~/contexts/transactions';
import { SearchFormContainer } from './styles';

const searchFormSchema = zod.object({
  query: zod.string().max(99),
});

type SearchFormSchema = zod.infer<typeof searchFormSchema>;

export const SearchForm = () => {
  const { fetchTransactions } = useTransactions({
    select: ['fetchTransactions'],
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<SearchFormSchema>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      query: '',
    },
  });

  const handleClear = useCallback(() => {
    fetchTransactions();

    setValue('query', '');
  }, [fetchTransactions, setValue]);

  const handleSearch = useCallback(
    ({ query }: SearchFormSchema) => {
      fetchTransactions(query);
    },
    [fetchTransactions],
  );

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearch)}>
      <input
        type="text"
        placeholder="Busque por transações"
        {...register('query')}
      />

      <button type="button" onClick={handleClear} disabled={isSubmitting}>
        Limpar <Trash />
      </button>

      <button type="submit" disabled={isSubmitting}>
        Buscar <MagnifyingGlass />
      </button>
    </SearchFormContainer>
  );
};
