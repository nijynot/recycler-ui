import { BigNumber, constants } from 'ethers';
import millify from 'millify';
import { animated } from 'react-spring';
import styled from 'styled-components';

import { UNIT } from '../../../constants';

const IndicatorStyled = styled(animated.div)({
  boxShadow: '0 0 4px #111111',
  background: '#111111',
  fontSize: 12,
  left: -10,
  opacity: 0,
  position: 'absolute',
  transform: 'translate(-100%, 30%)',
  zIndex: 9,
});

const IndicatorSymbol = styled.span({
  opacity: 0.5,
});

type IndicatorCapacityProps = {
  value?: BigNumber;
  style?: any;
}

export function IndicatorCapacity({ value, style }: IndicatorCapacityProps) {
  let render;

  if (value) {
    if (value.eq(constants.MaxUint256)) {
      render = '∞';
    } else {
      try {
        render = millify(value.div(UNIT).toNumber());
      } catch (e) {
        render = '∞';
        console.error(e);
      }
    }
  } else {
    render = '-';
  }
  
  return (
    <IndicatorStyled style={style}>
      {render} <IndicatorSymbol>TOKE</IndicatorSymbol>
    </IndicatorStyled>
  );
}

type IndicatorSupplyProps = {
  value?: any;
  style?: any;
}

export function IndicatorSupply({ value, style }: IndicatorSupplyProps) {
  return (
    <IndicatorStyled style={style}>
      <animated.span>{value}</animated.span>{' '}
      <IndicatorSymbol>TOKE</IndicatorSymbol>
    </IndicatorStyled>
  );
}
