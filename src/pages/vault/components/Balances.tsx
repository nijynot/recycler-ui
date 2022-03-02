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
  padding: '36px 40px 32px 40px',
  position: 'relative',
  top: '-2px',
  maxWidth: 530,
  margin: '0 auto',
});

// const BalancesLabel = styled.div({
//   flex: 1,
//   fontSize: 12,
//   fontWeight: 500,
//   opacity: 0.5,
//   width: '100%',
//   paddingBottom: 10,
//   letterSpacing: '0.04em',
//   marginBottom: 16,
//   borderBottom: '1px solid rgba(255, 255, 255, 0.25)',
// });

const BalanceList = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 20,
  width: '100%',
});

export function Balances({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BalanceStyled style={{
        alignItems: 'center',
        display: 'flex',
        margin: '20px auto',
        maxWidth: 360,
        position: 'relative',
        textAlign: 'center',
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.14)',
          height: 1,
          width: '30%',
        }}></div>
        <BalanceLabel>YOUR VAULT BALANCE</BalanceLabel>
        <div style={{
          background: 'rgba(255, 255, 255, 0.14)',
          height: 1,
          width: '30%',
        }}></div>
      </BalanceStyled>

      <BalancesStyled>
        <BalanceList>
          {children}
        </BalanceList>
      </BalancesStyled>
    </>
  );
}

const BalanceStyled = styled.div({
  display: 'flex',
  width: '100%',
});

// const BalanceMain = styled.div({
//   display: 'flex',
//   alignItems: 'center',
//   marginBottom: 4,
// });

const BalanceLabel = styled.div({
  flex: 1,
  fontSize: 11,
  fontWeight: 500,
  opacity: 0.5,
});

const BalanceAmount = styled.div({
  fontSize: 12,
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
  margin: '4px 0 0 0',
});

type BalanceSharesProps = {
  reToke?: BigNumber;
  toke?: BigNumber;
};

export function BalanceShares({ reToke, toke }: BalanceSharesProps) {
  let renderReToke;
  let renderToke;

  if (reToke) {
    renderReToke = toTwoDecimals(utils.formatUnits(reToke, 18).toString())
  } else {
    renderReToke = '-';
  }

  if (toke) {
    renderToke = toTwoDecimals(utils.formatUnits(toke, 18).toString())
  } else {
    renderToke = '-';
  }

  return (
    <BalanceStyled>
      <div style={{ flex: 1, marginRight: 20 }}>
        <BalanceLabel>DEPOSIT</BalanceLabel>
        <BalanceComment>Actively compounds TOKE rewards every week.</BalanceComment>
      </div>
      <BalanceAmount>
        {renderReToke} <BalanceSymbol style={{ marginRight: 5 }}>(re)TOKE =</BalanceSymbol>
        {renderToke} <BalanceSymbol>TOKE</BalanceSymbol>
      </BalanceAmount>
    </BalanceStyled>
  );
}

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
      <div style={{ flex: 1, marginRight: 20 }}>
        <BalanceLabel>{label}</BalanceLabel>
        <BalanceComment>{comment}</BalanceComment>
      </div>
      <BalanceAmount>{render} <BalanceSymbol>{symbol}</BalanceSymbol></BalanceAmount>
    </BalanceStyled>
  );
}
