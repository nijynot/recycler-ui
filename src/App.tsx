import { providers } from 'ethers';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { Provider, defaultChains } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';

import Footer from './shared/components/Footer';
import Header from './components/Header';
import Wallet from './components/Wallet';
import { GlobalProvider } from './contexts/GlobalContext';
import Vault from './pages/vault';

const connectors = () => {
  return [new InjectedConnector({ chains: defaultChains })];
};

const provider = () => {
  if (process.env.NODE_ENV === 'production') {
    return new providers.JsonRpcProvider('https://eth-mainnet.alchemyapi.io/v2/5SdINX6r6wQxayajVaR5AxMnlWEi0d2Y');
  } else {
    return new providers.JsonRpcProvider('http://localhost:8545');
  }
};

const Wrapper = styled.div({
  paddingBottom: '4rem',
  flex: 1,
});

const Main = styled.main({
  display: 'flex',
  flexDirection: 'column',
  fontSize: '0.875rem',
  margin: '0 auto',
  maxWidth: 652,
  padding: '8rem 0 1.25rem 0',
  '@media (max-width: 500px)': {
    padding: '8rem 20px 1.25rem 20px',
  },
});

export default function App() {
  return (
    <GlobalProvider>
      <Provider autoConnect connectors={connectors} provider={provider}>
        <BrowserRouter>
          {/* Header */}
          <Header>
            <Wallet />
          </Header>
          
          {/* Main content */}
          <Wrapper>
            <Main>
              <Routes>
                <Route path="/" element={<Vault />} />
              </Routes>
            </Main>
          </Wrapper>

          {/* Footer */}
          <Footer />
        </BrowserRouter>
      </Provider>
    </GlobalProvider>
  );
}
