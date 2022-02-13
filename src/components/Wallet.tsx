import { useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import styled from 'styled-components';
import { useAccount, useConnect, useNetwork } from 'wagmi';

import { useGlobalContext } from '../contexts/GlobalContext';
import { isSupportedChain } from '../constants';
import Modal from './Modal';

function MetaMask() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g style={{ mixBlendMode: 'luminosity' }}>
      <path fillRule="evenodd" clipRule="evenodd" d="M6.86914 20.9892L10.013 21.8241V20.7323L10.2696 20.4755H12.0661V21.7599V22.659H10.1413L7.76739 21.6314L6.86914 20.9892Z" fill="#CDBDB2"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M17.1348 20.9892L14.0551 21.8241V20.7323L13.7984 20.4755H12.0019V21.7599V22.659H13.9267L16.3007 21.6314L17.1348 20.9892Z" fill="#CDBDB2"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M10.2693 18.613L10.0127 20.7323L10.3335 20.4754H13.6698L14.0548 20.7323L13.7982 18.613L13.2849 18.2919L10.7185 18.3561L10.2693 18.613Z" fill="#393939"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M8.53711 4.29163L10.077 7.888L10.7827 18.356H13.285L14.0549 7.888L15.4664 4.29163H8.53711Z" fill="#F89C35"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M1.8004 12.1909L0.00390625 17.3928L4.49514 17.1359H7.38236V14.8882L7.25404 10.2643L6.61243 10.7781L1.8004 12.1909Z" fill="#F89D35"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M5.20117 12.7689L10.4623 12.8974L9.88488 15.5946L7.38263 14.9524L5.20117 12.7689Z" fill="#D87C30"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M5.20117 12.8331L7.38263 14.8882V16.9433L5.20117 12.8331Z" fill="#EA8D3A"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M7.38281 14.9524L9.94923 15.5946L10.7833 18.3561L10.2059 18.6772L7.38281 17.0075V14.9524Z" fill="#F89D35"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M7.38242 17.0074L6.86914 20.9891L10.2696 18.613L7.38242 17.0074Z" fill="#EB8F35"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M10.4619 12.8973L10.7827 18.3561L9.82031 15.5625L10.4619 12.8973Z" fill="#EA8E3A"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M4.43066 17.0717L7.38204 17.0074L6.86876 20.9891L4.43066 17.0717Z" fill="#D87C30"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M1.41544 22.7231L6.86907 20.9891L4.43098 17.0717L0.00390625 17.3928L1.41544 22.7231Z" fill="#EB8F35"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M10.0774 7.88806L7.31847 10.2L5.20117 12.7689L10.4623 12.9615L10.0774 7.88806Z" fill="#E8821E"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M6.86914 20.9892L10.2696 18.613L10.013 20.6681V21.8241L7.70323 21.3745L6.86914 20.9892Z" fill="#DFCEC3"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M17.1348 20.9892L13.7984 18.613L14.0551 20.6681V21.8241L16.3648 21.3745L17.1348 20.9892Z" fill="#DFCEC3"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M9.05009 14.0532L9.75586 15.5303L7.2536 14.8881L9.05009 14.0532Z" fill="#393939"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M1.35156 1.27332L10.0774 7.88808L8.60169 4.2917L1.35156 1.27332Z" fill="#E88F35"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M1.35118 1.27332L0.196289 4.80547L0.837894 8.65873L0.38877 8.91562L1.03037 9.49361L0.517091 9.94315L1.22286 10.5854L0.773733 10.9707L1.8003 12.2551L6.61233 10.778C8.96488 8.89421 10.1198 7.9309 10.077 7.88808C10.0342 7.84527 7.12562 5.64035 1.35118 1.27332V1.27332Z" fill="#8E5A30"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M22.2035 12.1909L24 17.3928L19.5088 17.1359H16.6215V14.8882L16.7499 10.2643L17.3915 10.7781L22.2035 12.1909Z" fill="#F89D35"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M18.8027 12.7689L13.5416 12.8974L14.119 15.5946L16.6213 14.9524L18.8027 12.7689Z" fill="#D87C30"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M18.8027 12.8331L16.6213 14.8882V16.9433L18.8027 12.8331Z" fill="#EA8D3A"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M16.6211 14.9524L14.0547 15.5946L13.2206 18.3561L13.798 18.6772L16.6211 17.0075V14.9524Z" fill="#F89D35"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M16.6215 17.0074L17.1348 20.9891L13.7984 18.6772L16.6215 17.0074Z" fill="#EB8F35"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M13.542 12.8973L13.2212 18.3561L14.1836 15.5625L13.542 12.8973Z" fill="#EA8E3A"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M19.5732 17.0717L16.6219 17.0074L17.1351 20.9891L19.5732 17.0717Z" fill="#D87C30"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M22.5885 22.7231L17.1348 20.9891L19.5729 17.0717L24 17.3928L22.5885 22.7231Z" fill="#EB8F35"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M13.9265 7.88806L16.6854 10.2L18.8027 12.7689L13.5416 12.9615L13.9265 7.88806Z" fill="#E8821E"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M14.9538 14.0532L14.248 15.5303L16.7503 14.8881L14.9538 14.0532Z" fill="#393939"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M22.6523 1.27332L13.9265 7.88808L15.4022 4.2917L22.6523 1.27332Z" fill="#E88F35"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M22.6527 1.27332L23.8076 4.80547L23.166 8.65873L23.6151 8.91562L22.9735 9.49361L23.4868 9.94315L22.781 10.5854L23.2302 10.9707L22.2036 12.2551L17.3916 10.778C15.039 8.89421 13.8841 7.9309 13.9269 7.88808C13.9697 7.84527 16.8783 5.64035 22.6527 1.27332V1.27332Z" fill="#8E5A30"/>
      </g>
    </svg>
  )
}

const WalletStyled = styled.div({
  alignItems: 'center',
  background: 'linear-gradient(180deg, #2C2C2C 0%, #222222 100%)',
  border: 0,
  boxShadow: `
    rgba(0, 0, 0, 0.5) 0px -0.5px 0px 0px inset,
    rgba(255, 255, 255, 0.1) 0px 0.5px 0px 0px inset,
    rgba(255, 255, 255, 0.12) 0px 0px 0px 1px inset`,
  borderRadius: 4,
  color: 'rgba(255, 255, 255, 0.8)',
  display: 'flex',
  fontSize: 12,
  fontWeight: 500,
  gap: 4,
  justifyContent: 'center',
  padding: '8px 10px',
  width: 135,

  ':hover': {
    color: '#ffffff',
    background: 'linear-gradient(180deg, #2e2e2e 0%, #2c2c2c 100%)',
  },
});

const WrongNetwork = styled(WalletStyled)({
  background: 'rgb(255, 59, 48)',
  boxShadow: `
    rgba(0, 0, 0, 0.2) 0px -0.5px 0px 0px inset,
    rgba(255, 255, 255, 0.1) 0px 0.5px 0px 0px inset,
    rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset`,
});

const ModalBody = styled.div({
  background: '#1F1F1F',
  borderRadius: 8,
  padding: '1rem',
})

const ModalHeading = styled.div({
  color: 'rgba(255, 255, 255, 0.75)',
  fontSize: 13,
  marginBottom: 12,
});

const Connectors = styled.div({
  marginBottom: 12,
});

const Connector = styled.button({
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

const ConnectorName = styled.span({
  paddingLeft: 16,
});

const ConnectorError = styled.div({
  fontSize: 12,
  marginBottom: 10,
});

const Disclaimer = styled.div({
  fontSize: 12,
  opacity: 0.5,
  lineHeight: 1.4211,
});

export default function Wallet() {
  const { state, dispatch } = useGlobalContext();

  const [{ data, error }, connect] = useConnect();
  const [{ data: account }, disconnect] = useAccount({ fetchEns: true });
  const [{ data: network }] = useNetwork();

  const open = () => {
    dispatch({ type: 'modals.isWalletModalOpen', value: true });
  };

  const close = () => {
    dispatch({ type: 'modals.isWalletModalOpen', value: false });
  };

  useEffect(() => {
    if (state.modals.isWalletModalOpen && account?.address) {
      dispatch({ type: 'modals.isWalletModalOpen', value: false });
    }
  }, [dispatch, state.modals.isWalletModalOpen, account?.address]);

  let render: JSX.Element;

  if (network?.chain?.id && !isSupportedChain(network?.chain?.id)) {
    render = (
      <WrongNetwork>Wrong Network</WrongNetwork>
    );
  } else if (account?.address) {
    render = (
      <Dropdown align="end">
        <Dropdown.Toggle>
          <WalletStyled>
            <svg width="11" height="16" viewBox="0 0 11 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path opacity="0.600006" d="M5.49866 5.99084L0.311523 8.14312L5.49866 10.9421L10.6858 8.14312L5.49866 5.99084Z" fill="white" fillOpacity="0.5"/>
              <path opacity="0.449997" d="M0.311523 8.14311L5.49867 10.9421V5.99082V0.286194L0.311523 8.14311Z" fill="white" fillOpacity="0.5"/>
              <path opacity="0.800003" d="M5.49805 0.286194V5.99082V10.9421L10.6852 8.14311L5.49805 0.286194Z" fill="white" fillOpacity="0.5"/>
              <path opacity="0.449997" d="M0.311523 9.04102L5.49867 15.7138V11.8386L0.311523 9.04102Z" fill="white" fillOpacity="0.5"/>
              <path opacity="0.800003" d="M5.49805 11.8387V15.7138L10.6883 9.04108L5.49805 11.8387Z" fill="white" fillOpacity="0.5"/>
            </svg>

            <div style={{ flex: 1 }}>
              {account.address.slice(0, 6) + '...' + account.address.substr(account.address.length - 4)}
            </div>
          </WalletStyled>
        </Dropdown.Toggle>

        <Dropdown.Menu style={{ marginTop: 4 }}>
          <Dropdown.Item onClick={() => disconnect()}>Disconnect</Dropdown.Item>
          <Dropdown.Item href={`https://etherscan.io/address/${account.address}`}>Etherscan</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  } else {
    render = (
      <WalletStyled
        onClick={() => open()}
        style={{ background: '#0a70ff' }}
      >
        <svg width="11" height="16" viewBox="0 0 11 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path opacity="0.600006" d="M5.49866 5.99084L0.311523 8.14312L5.49866 10.9421L10.6858 8.14312L5.49866 5.99084Z" fill="white" fillOpacity="0.5"/>
          <path opacity="0.449997" d="M0.311523 8.14311L5.49867 10.9421V5.99082V0.286194L0.311523 8.14311Z" fill="white" fillOpacity="0.5"/>
          <path opacity="0.800003" d="M5.49805 0.286194V5.99082V10.9421L10.6852 8.14311L5.49805 0.286194Z" fill="white" fillOpacity="0.5"/>
          <path opacity="0.449997" d="M0.311523 9.04102L5.49867 15.7138V11.8386L0.311523 9.04102Z" fill="white" fillOpacity="0.5"/>
          <path opacity="0.800003" d="M5.49805 11.8387V15.7138L10.6883 9.04108L5.49805 11.8387Z" fill="white" fillOpacity="0.5"/>
        </svg>

        <div style={{ flex: 1, textAlign: 'center' }}>
          Connect Wallet
        </div>
      </WalletStyled>
    );
  }

  return (
    <>
      {render}

      <Modal
        show={state.modals.isWalletModalOpen}
        onHide={() => close()}
      >
        <ModalBody>
          <ModalHeading>Choose a Wallet</ModalHeading>
          <Connectors>
            {data.connectors.map((conn) => (
              <Connector
                disabled={!conn.ready}
                key={conn.id}
                onClick={() => connect(conn)}
              >
                <MetaMask />
                <ConnectorName>{conn.name}</ConnectorName>
                {!conn.ready && ' (unsupported)'}
              </Connector>
            ))}
          </Connectors>
          <ConnectorError>
            {error && <div>{error?.message ?? 'Failed to connect'}</div>}
          </ConnectorError>
          <Disclaimer>
            By connecting a wallet, you agree to Automata Labs' Terms of Service and acknowledge that you have read and understand the disclaimer.
          </Disclaimer>
        </ModalBody>
      </Modal>
    </>
  );
}
