import styled from 'styled-components';

import { useGlobalContext } from '../../../contexts/GlobalContext';

const TabsStyled = styled.div({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: 12,
  width: '100%',
});

const Tab = styled.button(({ active }: { active?: boolean; }) => ({
  background: active ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
  border: '1px solid #404040',
  color: active ? 'white' : 'rgba(255, 255, 255, 0.35)',
  fontSize: 14,
  fontWeight: 500,
  padding: 16,
  transition: 'all 0.15s',
  width: '50%',

  ':hover': {
    background: active ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.035)',
  }
}));

export default function Tabs() {
  const { state, dispatch } = useGlobalContext();

  return (
    <TabsStyled>
      <Tab
        active={state.tab === 0}
        style={{ borderRadius: '8px 0 0 8px' }}
        onClick={() => dispatch({ type: 'tab', value: 0 })}
      >
        Deposit
      </Tab>
      <Tab
        active={state.tab === 1}
        style={{ borderRadius: '0 8px 8px 0', borderLeft: 0 }}
        onClick={() => dispatch({ type: 'tab', value: 1 })}
      >
        Withdraw
      </Tab>
    </TabsStyled>
  );
}
