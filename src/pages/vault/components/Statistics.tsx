import { animated } from 'react-spring';
import styled from 'styled-components';

import H1 from '../../../components/H1';

const StatisticStyled = styled(animated.div)({
  flex: 1,
  margin: '0 24px',
});

const Center = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const Label = styled.div({
  fontSize: 12,
  opacity: 0.5,
  letterSpacing: '0.05em',
  fontWeight: 500,
});

const Value = styled(H1)({
  fontSize: 32,
  fontWeight: 600,
  margin: '6px 0',
});

const Comment = styled(Label)({
  fontWeight: 400,
});

export const Statistics = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: 48,
});

type StatisticProps = {
  label: string;
  value: string;
  comment: string;
  color?: string;
  // style?: React.CSSProperties;
  style?: any;
};

export function Statistic({ label, value, comment, color, style }: StatisticProps) {
  return (
    <StatisticStyled style={style}>
      <Center>
        <Label>{label}</Label>
        <Value style={{ color }}>{value}</Value>
        <Comment>{comment}</Comment>
      </Center>
    </StatisticStyled>
  );
}
