import { zodResolver } from '@hookform/resolvers/zod';
import * as Dialog from '@radix-ui/react-dialog';
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react';
import { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as zod from 'zod';
import { useTransactions } from '~/contexts/transactions';
import { CloseButton, Content, Option, Options, Overlay } from './styles';

const transactionFormSchema = zod.object({
  description: zod.string().min(1).max(99),
  price: zod.number().min(0),
  category: zod.string().min(1).max(99),
  type: zod.enum(['INCOME', 'OUTCOME']),
});

type TransactionFormSchema = zod.infer<typeof transactionFormSchema>;

export const Modal = () => {
  const { createTransaction } = useTransactions({
    select: ['createTransaction'],
  });

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<TransactionFormSchema>({
    resolver: zodResolver(transactionFormSchema),
  });

  const handleCreateTransaction = useCallback(
    async (data: TransactionFormSchema) => {
      await createTransaction(data);

      reset();
    },
    [createTransaction, reset],
  );

  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <Dialog.Title>Nova transação</Dialog.Title>

        <CloseButton>
          <X size={24} />
        </CloseButton>

        <form onSubmit={handleSubmit(handleCreateTransaction)}>
          <input
            type="text"
            placeholder="Descrição"
            required
            {...register('description')}
          />

          <input
            type="number"
            placeholder="Preço"
            required
            {...register('price', { valueAsNumber: true })}
          />

          <input
            type="text"
            placeholder="Categoria"
            required
            {...register('category')}
          />

          <Controller
            control={control}
            name="type"
            render={({ field }) => (
              <Options onValueChange={field.onChange} value={field.value}>
                <Option value="INCOME" variant="green">
                  <ArrowCircleUp size={24} />
                  Entrada
                </Option>

                <Option value="OUTCOME" variant="red">
                  <ArrowCircleDown size={24} />
                  Saída
                </Option>
              </Options>
            )}
          />

          <button type="submit" disabled={isSubmitting}>
            Cadastrar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  );
};
