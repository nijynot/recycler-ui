import { BigNumber, utils } from 'ethers';
import styled from 'styled-components';
import { useAccount } from 'wagmi';

import { getAddressList } from '../../constants';
import Reactor from '../../constants/svgs/Reactor';
import { useGlobalContext } from '../../contexts/GlobalContext';
import { useQuery } from '../../hooks/useQuery';
import NumericalInput from '../../shared/components/NumericalInput';

import Button from './components/Button';
import Capacity from './components/Capacity';
import H2 from '../../components/H2';
import { Statistics, Statistic } from './components/Statistics';
import Tabs from './components/Tabs';
import TransactionSentModal from './components/TransactionSentModal';

const Heading = styled.div({
  textAlign: 'center',
  marginBottom: 40,
});

const H2Light = styled(H2)({
  display: 'inline-block',
  fontWeight: 300,
});

const H2ExtraBold = styled(H2)({
  display: 'inline-block',
  fontWeight: 800,
});

const SubHeading = styled.div({
  marginTop: 10,
  opacity: 0.75,
  lineHeight: 1.4211,
});

const Divider = styled.div({
  height: 46,
  width: 1,
  background: 'rgba(255, 255, 255, 0.17)',
});

const Recycler = styled.div({
  background: '#191919',
  boxShadow: `
    rgba(0, 0, 0, 0.5) 0px -0.5px 0px 0px inset,
    rgba(255, 255, 255, 0.1) 0px 0.5px 0px 0px inset,
    rgba(255, 255, 255, 0.12) 0px 0px 0px 1px inset`,
  borderRadius: 10,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 'min(10vh, 100px) 0',
});

const Name = styled.div({
  fontSize: 12,
  fontWeight: 600,
  letterSpacing: '0.05em',
  opacity: 0.5,
  textAlign: 'center',
});

const ReactorWrapper = styled.div({
  display: 'flex',
  justifyContent: 'center',
  margin: '12px 0',
});

const Description = styled.div({
  width: 328,
  marginTop: 24,
  lineHeight: 1.4211,
  fontSize: 12,
  opacity: 0.5,
});

const TokenInput = styled.div({
  background: '#2A2A2A',
  border: '1px solid #404040',
  borderRadius: 4,
  boxSizing: 'border-box',
  color: 'white',
  display: 'flex',
  marginBottom: 12,
  outline: 0,
  alignItems: 'center',
  transition: 'all 0.15s',
  width: 328,

  ':focus': {
    border: '1px solid rgba(255, 255, 255, 0.4)',
  }
});

const AmountInput = styled(NumericalInput)({
  border: 0,
  background: '#2A2A2A',
  borderRadius: 4,
  boxSizing: 'border-box',
  color: 'white',
  flex: 1,
  outline: 0,
  padding: '14px 16px',
});

const Max = styled.button({
  fontSize: 11,
  color: 'rgba(255, 255, 255, 0.75)',
  border: '1px solid #404040',
  borderRadius: 4,
  marginRight: 10,
  marginTop: 1,
  padding: '2px 4px',
  transition: 'all .15s',

  ':hover': {
    background: 'rgba(255, 255, 255, 0.07)',
  }
});

const Symbol = styled.div({
  fontWeight: 500,
  marginRight: 14,
  marginTop: 1,
  opacity: 0.75,
});

type Query = {
  erc20: {
    balanceOf: BigNumber;
  },
};

const query = `query($erc20: String!, $account: String!, $connected: Boolean!) {
  erc20(address: $erc20) @include(if: $connected) {
    balanceOf(account: $account)
  }
}`;

export default function Vault() {
  const { state, dispatch } = useGlobalContext();
  const [{ data: account }] = useAccount();
  const { data } = useQuery<Query>(query, {
    erc20: getAddressList().TokeVotePool,
    account: (account?.address) ? account?.address : '',
    connected: (account?.address) ? true : false,
  })

  const value = () => {
    if (state.tab === 0)
      return state.depositAmount;
    else if (state.tab === 1)
      return state.withdrawAmount;
    else
      throw new Error(`Tab "${state.tab}" does not exist.`);
  }

  const setter = (amount: string) => {
    if (state.tab === 0)
      dispatch({ type: 'depositAmount', value: amount });
    else if (state.tab === 1)
      dispatch({ type: 'withdrawAmount', value: amount });
    else
      throw new Error(`Tab "${state.tab}" does not exist.`);
  }

  const max = () => {
    if (state.tab === 0) {
      dispatch({ type: 'depositAmount', value: utils.formatUnits(data?.erc20?.balanceOf, 18) });
    }
  };

  return (
    <>
      {/* Vault */}
      <div>
        <Heading>
          <H2Light style={{ marginRight: 8 }}>Tokemak</H2Light>
          <H2ExtraBold>(Re)cycler</H2ExtraBold>

          <SubHeading>
            The (Re)cycler compounds TOKE rewards from<br />
            the highest yielding reactors and bribes.
          </SubHeading>
        </Heading>

        <Statistics>
          <Statistic label="APR" value="51.94%" comment="+9%↑ on (Re)cycler" color="rgb(48, 245, 109)" />
          <Divider />
          <Statistic label="Total TOKE" value="116,666" comment="$252,666 USD" />
        </Statistics>

        {/* Recycler */}
        <Recycler>
          <Name>TOKEMAK (RE)CYCLE VAULT</Name>
          <ReactorWrapper><Reactor /></ReactorWrapper>
          <Capacity />

          <Tabs />
          <TokenInput>
            <AmountInput value={value()} setter={setter} />
            <Max onClick={max}>MAX</Max>
            <Symbol>tTOKE</Symbol>
          </TokenInput>
          <Button />

          <Description>
            Deposit tTOKE and get the compounding (re)tTOKE.
            <br />
            By holding (re)tTOKE, your balance will automatically compound after each full-cycle.
          </Description>
        </Recycler>
      </div>

      {/* Modal for deposit/withdraw */}
      <TransactionSentModal />
    </>
  );
}
