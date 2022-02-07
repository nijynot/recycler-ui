import styled from 'styled-components';

import Modal from '../../../components/Modal';
import { useGlobalContext } from '../../../contexts/GlobalContext';

const ModalBody = styled.div({
  background: '#1F1F1F',
  borderRadius: 8,
  padding: '1rem',
})

const ModalHeading = styled.div({
  color: 'rgba(255, 255, 255, 0.75)',
  fontSize: 16,
  marginBottom: 12,
});

const ModalDescription = styled.div({
  fontSize: 12,
  opacity: 0.5,
  lineHeight: 1.4211,
  marginBottom: 16,
});

const EtherscanLinkItem = styled.code({
  background: 'rgba(255, 255, 255, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.05)',
  borderRadius: 4,
  color: 'rgba(255, 255, 255, 0.75)',
  fontSize: 12,
  display: 'block',
  maxHeight: 300,
  overflowY: 'scroll',
  padding: 16,
  lineHeight: 1.4211,
  textAlign: 'left',
  transition: 'border-color .15s',
  width: '100%',
});

export default function ErrorModal() {
  const { state, dispatch } = useGlobalContext();

  const close = () => {
    dispatch({ type: 'modals.isErrorModalOpen', value: false });
    dispatch({ type: 'error', value: '' });
  };

  return (
    <Modal
      show={state.modals.isErrorModalOpen}
      onHide={() => close()}
    >
      <ModalBody>
        <ModalHeading>Transaction Failed</ModalHeading>
        <ModalDescription>
          Something went wrong with your transaction. <br />
          Please try again.
        </ModalDescription>

        <EtherscanLinkItem>{state.error}</EtherscanLinkItem>
      </ModalBody>
    </Modal>
  );
}
