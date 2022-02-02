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

const EtherscanLinkItem = styled.button({
  alignItems: 'center',
  borderRadius: 4,
  border: '1px solid rgba(255, 255, 255, 0.17)',
  display: 'flex',
  height: 48,
  padding: '0 12px',
  textAlign: 'left',
  width: '100%',
  transition: 'border-color .15s',

  ':hover': {
    borderColor: '#c4c4c4',
  }
});

const EtherscanText = styled.a({
  paddingLeft: 16,
  fontWeight: 500,
});

export default function TransactionSentModal() {
  const { state, dispatch } = useGlobalContext();

  const close = () => {
    dispatch({ type: 'isTransactionSentModalOpen', value: false });
    dispatch({ type: 'txHash', value: '' });
  };

  return (
    <Modal
      show={state.isTransactionSentModalOpen}
      onHide={() => close()}
    >
      <ModalBody>
        <ModalHeading>Transaction Submitted!</ModalHeading>
        <ModalDescription>
          Please wait while your transaction is being confirmed.<br />
          Your transaction is viewable on Etherscan
        </ModalDescription>

        <EtherscanLinkItem>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.98788 11.4267C4.98786 11.2927 5.01431 11.1599 5.06571 11.0362C5.11711 10.9124 5.19245 10.8 5.2874 10.7054C5.38235 10.6109 5.49505 10.536 5.61901 10.4852C5.74296 10.4343 5.87575 10.4084 6.00973 10.4091L7.70384 10.4146C7.97397 10.4146 8.23302 10.522 8.42403 10.713C8.61503 10.9041 8.72234 11.1632 8.72234 11.4335V17.8417C8.91318 17.7851 9.15794 17.7248 9.42606 17.6619C9.61223 17.6181 9.77814 17.5126 9.8969 17.3627C10.0157 17.2127 10.0803 17.027 10.0804 16.8357V8.88682C10.0803 8.753 10.1067 8.62049 10.1579 8.49685C10.2091 8.37322 10.2841 8.26088 10.3787 8.16625C10.4732 8.07162 10.5855 7.99655 10.7091 7.94533C10.8327 7.89411 10.9652 7.86774 11.0989 7.86773H12.7964C13.0665 7.86778 13.3255 7.97513 13.5165 8.16619C13.7075 8.35725 13.8149 8.61637 13.8149 8.88657V16.2644C13.8149 16.2644 14.2397 16.0923 14.6538 15.9175C14.8076 15.8524 14.9388 15.7435 15.0311 15.6043C15.1234 15.4652 15.1727 15.3019 15.1728 15.1349V6.33927C15.1728 6.20548 15.1992 6.07299 15.2503 5.94938C15.3015 5.82577 15.3765 5.71346 15.4711 5.61885C15.5657 5.52424 15.6779 5.44919 15.8015 5.39799C15.9251 5.34678 16.0575 5.32043 16.1912 5.32043H17.8887C18.1588 5.32043 18.4179 5.42777 18.6089 5.61884C18.7999 5.8099 18.9073 6.06905 18.9073 6.33927V13.582C20.379 12.5151 21.8705 11.2318 23.0541 9.68876C23.2258 9.46478 23.3394 9.20177 23.3848 8.92318C23.4302 8.64459 23.406 8.35908 23.3143 8.09214C22.5134 5.75742 21.0112 3.72713 19.0131 2.27887C17.0149 0.830618 14.6184 0.0350986 12.1511 0.00108788C5.49791 -0.0883169 -0.000595994 5.34454 5.75688e-05 12.0008C-0.00647504 14.107 0.543066 16.1777 1.59312 18.0033C1.73793 18.253 1.95097 18.4562 2.20721 18.589C2.46345 18.7218 2.75226 18.7787 3.03969 18.753C3.36084 18.7247 3.76066 18.6847 4.23596 18.6289C4.44284 18.6054 4.63383 18.5065 4.77257 18.3512C4.9113 18.1959 4.98808 17.995 4.98829 17.7867V11.4267" fill="#898989"/>
            <path d="M4.95125 21.7039C6.74054 23.006 8.85503 23.7876 11.0608 23.9622C13.2666 24.1368 15.4776 23.6975 17.4493 22.6931C19.421 21.6887 21.0766 20.1582 22.2327 18.271C23.3889 16.3838 24.0007 14.2135 24.0003 12.0001C24.0003 11.7238 23.9875 11.4506 23.969 11.1788C19.5867 17.7167 11.4953 20.7731 4.95117 21.7042" fill="#4F4F4F"/>
          </svg>

          <EtherscanText href={`https://etherscan.io/tx/${state.txHash}`}>View on Etherscan↗</EtherscanText>
        </EtherscanLinkItem>
      </ModalBody>
    </Modal>
  );
}
