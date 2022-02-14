import { BigNumber, utils } from 'ethers';
import styled from 'styled-components';

import { toTwoDecimals } from '../../../utils';

const BalancesStyled = styled.div({
  background: '#252525',
  boxShadow: `
    rgba(0, 0, 0, 0.5) 0px -0.5px 0px 0px inset,
    rgba(255, 255, 255, 0.1) 0px 0.5px 0px 0px inset,
    rgba(255, 255, 255, 0.12) 0px 0px 0px 1px inset`,
  borderRadius: 16,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '36px 40px',
  position: 'relative',
  top: '-2px',
  maxWidth: 530,
  margin: '0 auto',
});

const BalancesLabel = styled.div({
  flex: 1,
  fontSize: 12,
  fontWeight: 500,
  opacity: 0.5,
  width: '100%',
  paddingBottom: 10,
  letterSpacing: '0.04em',
  marginBottom: 16,
  borderBottom: '1px solid rgba(255, 255, 255, 0.25)',
});

const BalanceList = styled.div({
  display: 'flex',
  gap: 40,
});

export function Balances({ children }: { children: React.ReactNode }) {
  return (
    <BalancesStyled>
      <BalancesLabel>YOUR BALANCE</BalancesLabel>
      <BalanceList>
        {children}
      </BalanceList>
    </BalancesStyled>
  );
}

const BalanceStyled = styled.div({
  marginBottom: 12,
  width: '100%',
});

// const BalanceMain = styled.div({
//   display: 'flex',
//   alignItems: 'center',
//   marginBottom: 4,
// });

const BalanceLabel = styled.div({
  flex: 1,
  fontSize: 12,
  fontWeight: 500,
  opacity: 0.5,
});

const BalanceAmount = styled.div({
  fontWeight: 500,
});

const BalanceSymbol = styled.div({
  display: 'inline-block',
  fontSize: 14,
  fontWeight: 400,
  opacity: 0.5,
});

const BalanceComment = styled.div({
  fontSize: 12,
  opacity: 0.25,
  lineHeight: 1.4211,
  margin: '4px 0 12px 0',
});

type BalanceProps = {
  label: string;
  amount?: BigNumber;
  symbol: string;
  comment: string;
};

export function Balance({ label, amount, symbol, comment }: BalanceProps) {
  let render;

  if (amount) {
    render = toTwoDecimals(utils.formatUnits(amount, 18).toString())
  } else {
    render = '-';
  }

  return (
    <BalanceStyled>
      <BalanceLabel>{label}</BalanceLabel>
      <BalanceComment>{comment}</BalanceComment>
      <BalanceAmount>{render} <BalanceSymbol>{symbol}</BalanceSymbol></BalanceAmount>
    </BalanceStyled>
  );
}
