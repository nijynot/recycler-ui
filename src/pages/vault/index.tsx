import styled from 'styled-components';

import H2 from '../../components/H2';
import { useQuery } from '../../hooks/useQuery';
import { Statistics, Statistic } from './components/Statistics';
import Recycler from './components/Recycler';

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

export default function Vault() {
  return (
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

      <Recycler />
    </div>
  );
}
