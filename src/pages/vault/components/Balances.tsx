import { BigNumber, utils } from 'ethers';
import styled from 'styled-components';

const BalancesStyled = styled.div({
  background: '#252525',
  boxShadow: `
    rgba(0, 0, 0, 0.5) 0px -0.5px 0px 0px inset,
    rgba(255, 255, 255, 0.1) 0px 0.5px 0px 0px inset,
    rgba(255, 255, 255, 0.12) 0px 0px 0px 1px inset`,
  borderRadius: '0 0 10px 10px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '32px 0 24px 0',
  position: 'relative',
  top: '-2px',
});

const BalancesLabel = styled.div({
  flex: 1,
  fontSize: 14,
  fontWeight: 500,
  opacity: 0.5,
  width: 328,
  paddingBottom: 10,
  letterSpacing: '0.04em',
  marginBottom: 16,
  borderBottom: '1px solid rgba(255, 255, 255, 0.25)',
});

export function Balances({ children }: { children: React.ReactNode }) {
  return (
    <BalancesStyled>
      <BalancesLabel>YOUR BALANCE</BalancesLabel>
      {children}
    </BalancesStyled>
  );
}

const BalanceStyled = styled.div({
  width: 328,
  marginBottom: 12,
});

const BalanceMain = styled.div({
  display: 'flex',
  alignItems: 'center',
  marginBottom: 4,
});

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
  fontSize: 12,
  fontWeight: 400,
  opacity: 0.5,
});

const BalanceComment = styled.div({
  fontSize: 12,
  opacity: 0.25,
  lineHeight: 1.4211,
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
    render = utils.formatUnits(amount, 18).toString()
  } else {
    render = '-';
  }

  return (
    <BalanceStyled>
      <BalanceMain>
        <BalanceLabel>{label}</BalanceLabel>
        <BalanceAmount>{render}</BalanceAmount>
      </BalanceMain>

      <BalanceComment>{comment}</BalanceComment>
    </BalanceStyled>
  );
}
