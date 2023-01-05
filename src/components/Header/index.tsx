import * as Dialog from '@radix-ui/react-dialog';
import { Modal } from '~/components/Modal';
import { HeaderContainer, HeaderContent, NewTransactionButton } from './styles';

export const Header = () => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src="/logo.svg" alt="Logotipo da DT Money" />

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <NewTransactionButton type="button">
              Nova transação
            </NewTransactionButton>
          </Dialog.Trigger>

          <Modal />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  );
};
