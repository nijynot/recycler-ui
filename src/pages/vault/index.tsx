import { constants, utils } from 'ethers';
import _ from 'lodash';
import { animated, useSpring } from 'react-spring';
import styled from 'styled-components';

import Bold from '../../components/Bold';
import Figure from '../../components/Figure';
import H2 from '../../components/H2';
import Italic from '../../components/Italic';
import { List, Item } from '../../components/List';
import Paragraph from '../../components/Paragraph';
import { UNIT } from '../../constants';
import Figure0 from '../../constants/images/recycler-strategy.png';
import Figure1 from '../../constants/images/rettoke.png';
import { ReactorCore, ReactorFuel, ReactorSkeleton } from '../../constants/svgs/ReactorFilled';
import { useGlobalContext } from '../../contexts/GlobalContext';
import { useVaultData } from '../../hooks/useVaultData';
import { useMarketData } from '../../hooks/useMarketData';
import NumericalInput from '../../shared/components/NumericalInput';

import ActionButton from './components/ActionButton';
import { Balance, Balances } from './components/Balances';
import { Statistics, Statistic } from './components/Statistics';
import Tabs from './components/Tabs';
import SuccessModal from './components/SuccessModal';
import ErrorModal from './components/ErrorModal';
import { IndicatorCapacity, IndicatorSupply } from './components/Indicator';

const comma = require('comma-number');

const Heading = styled.div({
  textAlign: 'center',
  marginBottom: 40,
});

const H2Light = styled(H2)({
  display: 'inline-block',
  fontWeight: 300,
  letterSpacing: '-0.055em',
});

const H2ExtraBold = styled(H2)({
  display: 'inline-block',
  fontWeight: 800,
  letterSpacing: '-0.055em',
});

const SubHeading = styled.div({
  marginTop: 10,
  opacity: 0.75,
  lineHeight: 1.4211,
});

const Divider = styled(animated.div)({
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
  borderRadius: 16,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  maxWidth: 530,
  margin: '0 auto 16px auto',
  padding: '36px 40px',
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
  margin: '16px auto 24px auto',
  maxWidth: 326,
  alignItems: 'center',
});

const TokenInput = styled.div({
  alignItems: 'center',
  background: '#2A2A2A',
  border: '1px solid #404040',
  borderRadius: 8,
  boxSizing: 'border-box',
  color: 'white',
  display: 'flex',
  marginBottom: 12,
  outline: 0,
  transition: 'all 0.15s',
  width: '100%',

  ':focus': {
    border: '1px solid rgba(255, 255, 255, 0.4)',
  }
});

const Input = styled(NumericalInput)({
  border: 0,
  background: '#2A2A2A',
  borderRadius: 8,
  boxSizing: 'border-box',
  color: 'white',
  flex: 1,
  outline: 0,
  padding: '16px 16px',
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

const HorizontalDivider = styled.div({
  height: 1,
  background: 'rgba(255, 255, 255, 0.17)',
  margin: '64px auto',
  maxWidth: 530,
});

const Block = styled.div({
  margin: '32px auto',
  maxWidth: 530,
});

const Caption = styled.div({
  fontSize: 12,
  marginTop: 10,
  opacity: 0.5,
  paddingBottom: 8,
  textAlign: 'center',
});

const Monospace = styled.span({
  fontFamily: 'iA Writer Mono',
  fontWeight: 700,
  letterSpacing: 0,
});

const Output = styled.div({
  display: 'flex',
  fontSize: 12,
  marginTop: 8,
  width: '100%',
});

const OutputLabel = styled.div({
  flex: 1,
  letterSpacing: '0.03em',
  opacity: 0.5,
});

const OutputGrey = styled.div({
  opacity: 0.5,
});

export default function Vault() {
  const config = {
    mass: 15,
    friction: 100,
    clamp: true,
    precision: 0.2,
    // decay: 0.997,
  };

  const { state, dispatch } = useGlobalContext();

  const { data: market } = useMarketData();
  const { data } = useVaultData();

  const springFuel = useSpring({
    from: { height: 0 },
    to: async (next) => {
      if (data) {
        let current = data?.vault.totalSupply.div(UNIT).toNumber();
        let capacity;

        if (data?.vault.capacity.lt(constants.MaxUint256)) {
          capacity = data?.vault.capacity.div(UNIT).toNumber();
          // render minimum 15 pixels of height
          await next({ height: _.clamp(current / capacity * 162, 15, 162) });
        } else {
          // hard-set 100k tTOKE as the ceil
          // not expected to be used as we expect capacity to be defined and slowly increased
          capacity = 100_000;
          // render minimum 15 pixels of height
          await next({ height: _.clamp(current / capacity * 162, 15, 115) });
        }
      }
    },
    config,
  });

  const springCapacity = useSpring({
    from: {
      opacity: 0,
      top: -2,
      transform: 'translate(-100%, -30%)',
    },
    to: async (next) => {
      if (data) {
        await next({ opacity: 1 });
      }
    },
    config,
  });

  const springSupply = useSpring({
    from: {
      bottom: 0,
      opacity: 0,
    },
    to: async (next) => {
      if (data) {
        let current = data?.vault.totalSupply.div(UNIT).toNumber();
        let capacity;

        if (data?.vault.capacity.lt(constants.MaxUint256)) {
          capacity = data?.vault.capacity.div(UNIT).toNumber();

          await next({
            bottom: _.clamp(current / capacity * 162, 15, 162),
            opacity: 1,
          });
        } else {
          capacity = 100_000;

          await next({
            bottom: _.clamp(current / capacity * 162, 15, 115),
            opacity: 1,
          });
        }
      }
    },
    config,
  });

  const springNumber = useSpring({
    from: { value: 0 },
    to: async (next) => {
      if (data) {
        await next({ value: data?.vault.totalSupply.div(UNIT).toNumber() });
      }
    },
    config,
  });

  const springStatistic = useSpring({
    from: { opacity: 0 },
    to: async (next) => {
      if (data) {
        await next({ opacity: 1 });
      }
    },
    config,
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
            the highest yielding reactors every week.
          </SubHeading>
        </Heading>

        <Name>TOKEMAK (RE)CYCLE VAULT</Name>
        <ReactorWrapper>
          <animated.div
            style={{
              position: 'absolute',
              top: 0,
              height: 1,
              background: '#434343',
              width: 64,
              left: 0,
              zIndex: 10000,
            }}
          />
          <IndicatorCapacity
            value={data?.vault.capacity}
            style={springCapacity}
          />
          <IndicatorSupply
            value={springNumber.value.to((v): number => comma(Math.floor(v)))}
            style={springSupply}
          />
          <ReactorSkeleton/>
          <ReactorCore />
          <ReactorFuel style={springFuel} />
        </ReactorWrapper>

        <Statistics>
          <Statistic
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              ...springStatistic,
            }}
            label="APR"
            value={data?.vault.totalSupply ? '51.94%' : '-'}
            comment="+9%↑ on (Re)cycler"
            color="rgb(48, 245, 109)"
          />
          <Divider style={springStatistic} />
          <Statistic
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              ...springStatistic,
            }}
            label="Total TOKE"
            value={data?.vault.totalSupply ? comma(data?.vault.totalSupply.div(UNIT).toString()) : '-'}
            comment={(data?.vault.totalSupply && market.toke) ? (
              `$${(data?.vault.totalSupply.div(UNIT).toNumber() * market.toke).toFixed(1)} USD` 
            ) : `-`}
          />
        </Statistics>

        {/* Recycler */}
        <Recycler>
          <Tabs />
          <TokenInput>
            <Input value={value()} setter={setter} />
            <Max onClick={max}>MAX</Max>
            <Symbol>{state.tab === 0 ? 'tTOKE' : '(re)tTOKE'}</Symbol>
          </TokenInput>

          <ActionButton data={data} />

          <Output>
            <OutputLabel>
              {state.tab === 0 ? 'You receive (on next cycle)' : 'You receive'}
            </OutputLabel>
            {value() ? value() : '0'}
            <OutputGrey style={{ marginLeft: 5 }}>
              {state.tab === 0 ? '(re)tTOKE' : 'tTOKE'}
            </OutputGrey>
          </Output>
          <Output>
            <OutputLabel>Vault fee (only on weekly-rewards)</OutputLabel>
            {data ? data?.vault.fee.toNumber() / 100 : '-'}
            <OutputGrey>%</OutputGrey>
          </Output>
        </Recycler>

        <Balances>
          <Balance
            label="ACTIVE"
            amount={data?.account.balanceOfretTOKE}
            symbol="(re)tTOKE"
            comment="Actively compounds TOKE rewards every week."
          />
          <Balance
            label="QUEUED"
            amount={data?.account.queuedOftTOKE}
            symbol="tTOKE"
            comment="Queued tokens start earning on the next weekly cycle."
          />
        </Balances>

        <HorizontalDivider />

        <Block>
          <H2 style={{ marginBottom: 10 }}>What is the (Re)cycler?</H2>
          <Paragraph>
            The (re)cycler vault algorithmically choses the highest earning reactors <Italic>and</Italic> compounds your TOKE rewards every week.
          </Paragraph>
          <Paragraph>
            This means that you can "put and forget" your TOKE in the vault, and it'll automatically maximise your profits.
          </Paragraph>
        </Block>

        <Figure src={Figure0} />
        <Caption>Figure: The vault strategy - algorithmic voting and compounding rewards.</Caption>

        <Block>
          <Paragraph>
            The (re)cycler also has a natural symbiotic relationship with Tokemak that is positive-sum.
            <br />
            <br />
            Noting Tokemak's equations: when the reactors are in balance, the rewards are increased for every staker.
            The (re)cycler automates this and is an additive primitive for the larger Tokemak eco-system.
          </Paragraph>
        </Block>

        <Block>
          <H2 style={{
            marginTop: 40,
            marginBottom: 10,
          }}>The <Monospace>(re)tTOKE</Monospace> token</H2>
          <Paragraph>
            The (re)tTOKE is a token that is pegged 1:1 to tTOKE and will automatically increase in balance when rewards are paid out (akin to stETH's rebasing). 
            <br />
            <br />
            When depositing tTOKE into the vault, and equal amount of (re)tTOKE will be minted - and when (re)tTOKE is burned, the tTOKE will be redeemed.
          </Paragraph>
        </Block>

        <Figure src={Figure1} />
        <Caption>Figure: The relation between tTOKE and (re)tTOKE</Caption>

        <Block>
          <Paragraph>
            Similarly to Tokemak itself, you do not start earning rewards as soon as you deposit into the (re)cycler vault - instead you're eligible for rewards at the start of the next weekly cycle.
            <br />
            <br />
            Upon depositing tTOKE, (re)tTOKE will first be zero. This is expected. When the next cycle begins, your (re)tTOKE balance will automatically show up in your wallet (no transaction is needed for this).
          </Paragraph>
        </Block>

        <Block>
          <H2 style={{
            marginTop: 40,
            marginBottom: 10,
          }}>The Risks</H2>
          <List>
            <Item>
              <Paragraph>
                <Bold style={{ paddingBottom: 2, display: 'inline-block' }}>Slashing Risk</Bold><br />
                The vault has similar risks to Tokemak itself. When voting with Tokemak, it's possible that tTOKE can be slashed.
                As such, we're introducing a constraint on which reactors can be voted on is desireable, and will be maintained by the laboratory.
                <br />
                <br />
                Below are the reactors that the (re)cycler vault can currently vote on.
              </Paragraph>
            </Item>
          </List>

          <List>
            <Item>
              <Paragraph>
                <Bold style={{ paddingBottom: 2, display: 'inline-block' }}>Contract Risk</Bold><br />
                The contracts have not been audited and we advise users to deposit with caution, and only risk funds they can afford to potentially lose.
              </Paragraph>
            </Item>
            
            <Item>  
              <Paragraph>
                <Bold style={{ paddingBottom: 2, display: 'inline-block' }}>Key Management Risk</Bold><br />
                Automata Labs Inc. holds admin keys to a partially-upgradeable contract for vault management, and is exposed to the risk of e.g. being hacked.
              </Paragraph>
            </Item>
          </List>
        </Block>
      </div>

      {/* Modals */}
      <SuccessModal />
      <ErrorModal />
    </>
  )
}
