import { constants, utils } from 'ethers';
import { useSpring } from 'react-spring';
import styled from 'styled-components';

import { UNIT } from '../../constants';
import H2 from '../../components/H2';
import { ReactorSkeleton, ReactorFuel } from '../../constants/svgs/ReactorFilled';
import { useGlobalContext } from '../../contexts/GlobalContext';
import { useVaultData } from '../../hooks/useVaultData';
import { useMarketData } from '../../hooks/useMarketData';
import NumericalInput from '../../shared/components/NumericalInput';

import ActionButton from './components/ActionButton';
import { Balance, Balances } from './components/Balances';
import { Capacities, Capacity } from './components/Capacity';
import { Statistics, Statistic } from './components/Statistics';
import Tabs from './components/Tabs';
import SuccessModal from './components/SuccessModal';
import ErrorModal from './components/ErrorModal';

const comma = require('comma-number');

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
  borderRadius: '10px 10px 0 0',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 'min(10vh, 40px) 0',
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
  position: 'relative',
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

export default function Vault() {
  const { state, dispatch } = useGlobalContext();

  const { data: market } = useMarketData();
  const { data } = useVaultData();

  const spring = useSpring({
    from: { height: 0 },
    to: async (next) => {
      if (data) {
        let current = data?.vault.totalSupply.div(UNIT).toNumber();
        let capacity;

        if (data?.vault.capacity.lt(constants.MaxUint256)) {
          capacity = data?.vault.capacity.div(UNIT).toNumber();
        } else {
          // hard-set 100k tTOKE as the ceil
          // not expected to be used as we expect capacity to be defined and slowly increased
          capacity = 100_000;
        }

        // render minimum 15 pixels of height
        await next({ height: Math.max(current / capacity * 162, 15) });
      }
    },
    config: {
      mass: 1,
      friction: 60,
      clamp: true,
    },
  });

  const value = () => {
    if (state.tab === 0)
      return state.parameters.mint;
    else if (state.tab === 1)
      return state.parameters.burn;
    else
      throw new Error(`Tab "${state.tab}" does not exist.`);
  }

  const setter = (amount: string) => {
    if (state.tab === 0)
      dispatch({ type: 'parameters.mint', value: amount });
    else if (state.tab === 1)
      dispatch({ type: 'parameters.burn', value: amount });
    else
      throw new Error(`Tab "${state.tab}" does not exist.`);
  }

  const max = () => {
    if (state.tab === 0) {
      if (!data?.account.balanceOftTOKE) return;
      dispatch({ type: 'parameters.mint', value: utils.formatUnits(data?.account.balanceOftTOKE, 18) });
    } else if (state.tab === 1) {
      if (!data?.account.balanceOfretTOKE) return;
      dispatch({ type: 'parameters.burn', value: utils.formatUnits(data?.account.balanceOfretTOKE, 18) });
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
          <Statistic
            style={{ display: 'flex', justifyContent: 'flex-end' }}
            label="APR"
            value={data?.vault.totalSupply ? '51.94%' : '-'}
            comment="+9%↑ on (Re)cycler"
            color="rgb(48, 245, 109)"
          />
          <Divider />
          <Statistic
            style={{ display: 'flex', justifyContent: 'flex-start' }}
            label="Total TOKE"
            value={data?.vault.totalSupply ? comma(data?.vault.totalSupply.div(UNIT).toString()) : '-'}
            comment={(data?.vault.totalSupply && market.toke) ? (
              `$${(data?.vault.totalSupply.div(UNIT).toNumber() * market.toke).toFixed(1)} USD` 
            ) : `-`}
          />
        </Statistics>

        {/* Recycler */}
        <Recycler>
          <Name>TOKEMAK (RE)CYCLE VAULT</Name>
          <ReactorWrapper>
            <ReactorSkeleton style={{ position: 'relative', zIndex: 100 }} />
            <ReactorFuel style={spring} />
          </ReactorWrapper>
          <Capacities>
            <Capacity
              label="MAX CAPACITY"
              value={data?.vault.capacity}
            />
            <Capacity
              label="CURRENT DEPOSITS"
              value={data?.vault.totalSupply}
            />
          </Capacities>

          <Tabs />
          <TokenInput>
            <AmountInput value={value()} setter={setter} />
            <Max onClick={max}>MAX</Max>
            <Symbol>{state.tab === 0 ? 'tTOKE' : '(re)tTOKE'}</Symbol>
          </TokenInput>

          <ActionButton data={data} />

          <Description>
            Deposit tTOKE and get the compounding (re)tTOKE.
            <br />
            By holding (re)tTOKE, your balance will automatically compound after each full-cycle.
          </Description>
        </Recycler>

        <Balances>
          <Balance
            label="ACTIVELY EARNING - (re)tTOKE"
            amount={data?.account.balanceOfretTOKE}
            symbol="(re)tTOKE"
            comment="Your (re)tTOKE balance automatically increases when TOKE rewards are compounded every full-cycle."
          />
          <Balance
            label="QUEUED - tTOKE"
            amount={data?.account.queuedOftTOKE}
            symbol="tTOKE"
            comment="Queued balance starts to earn and compound on the next full-cycle."
          />
        </Balances>
      </div>

      {/* Modals */}
      <SuccessModal />
      <ErrorModal />
    </>
  )
}
