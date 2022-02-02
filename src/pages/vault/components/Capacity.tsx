import { BigNumber, constants } from 'ethers';
import millify from 'millify';
import styled from 'styled-components';

import { getAddressList, UNIT } from '../../../constants';
import { useQuery } from '../../../hooks/useQuery';

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

const Text = styled.div({
  opacity: 0.5,
  padding: '0 4px',
});

export type CapacityItemProps = {
  label?: string;
  value?: BigNumber;
};

export function CapacityItem({ label, value }: CapacityItemProps) {
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
      <Text style={{
        flex: 1,
        fontWeight: 400,
        letterSpacing: '0.03em',
      }}>{label}</Text>
      {render} <Text>tTOKE</Text>
    </Wrapper>
  );
}

type CapacityProps = {
  currentDeposits: BigNumber;
  maxCapacity: BigNumber;
};

export default function Capacity({ currentDeposits, maxCapacity }: CapacityProps) {
  return (
    <CapacityStyled>
      <CapacityItem
        label="MAX CAPACITY"
        value={maxCapacity}
      />
      <CapacityItem
        label="CURRENT DEPOSITS"
        value={currentDeposits}
      />
    </CapacityStyled>
  );
}
