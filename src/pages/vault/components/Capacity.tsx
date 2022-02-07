import { BigNumber, constants } from 'ethers';
import millify from 'millify';
import styled from 'styled-components';

import { UNIT } from '../../../constants';

export const CapacityStyled = styled.div({
  display: 'flex',
  flexDirection: 'column',
  fontSize: 12,
  justifyContent: 'center',
  marginTop: 8,
  width: 328,
});

const Wrapper = styled.div({
  display: 'flex',
  fontWeight: 400,
  marginBottom: 6,
  width: '100%',
});

const CapacityLabel = styled.div({
  opacity: 0.5,
  fontWeight: 300,
  padding: '0 4px',
  flex: 1,
  letterSpacing: '0.03em',
});

const CapacityAmount = styled.div({
  fontWeight: 600,
});

const CapacitySymbol = styled.div({
  opacity: 0.5,
  fontWeight: 400,
  padding: '0 4px',
});

export type CapacityProps = {
  label?: string;
  value?: BigNumber;
};

export function Capacity({ label, value }: CapacityProps) {
  let render;

  if (value) {
    if (value.eq(constants.MaxUint256)) {
      render = '∞';
    } else {
      render = millify(value.div(UNIT).toNumber());
    }
  } else {
    render = '-';
  }

  return (
    <Wrapper>
      <CapacityLabel>{label}</CapacityLabel>
      <CapacityAmount>{render}</CapacityAmount>
      <CapacitySymbol>tTOKE</CapacitySymbol>
    </Wrapper>
  );
}

export function Capacities({ children }: { children: React.ReactNode }) {
  return (
    <CapacityStyled>{children}</CapacityStyled>
  );
}
