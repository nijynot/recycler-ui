import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';

const HeaderStyled = styled.header({
  backdropFilter: 'saturate(180%) blur(20px)',
  background: 'rgba(0, 0, 0, 0.1)',
  borderBottom: '1px solid rgba(255, 255, 255, 0.17)',
  fontSize: 13,
  position: 'fixed',
  WebkitBackdropFilter: 'saturate(180%) blur(8px)',
  width: '100%',
  zIndex: 333,

  '@media (max-width: 500px)': {
    padding: '0 20px 0 20px',
  },
});

const HeaderWrapper = styled.div({
  alignItems: 'center',
  display: 'flex',
  margin: '0 auto',
  maxWidth: 652,
  height: 56,
});

const Home = styled.a({
  opacity: 0.75,
  transition: 'opacity .15s',
  ":hover": {
    opacity: 1,
  },
})

const Labs = styled.a({
  transition: 'color .15s',
  ':hover': {
    color: 'rgba(255, 255, 255, 0.75)',
  }
});

const HeaderNavigation = styled.div({
  display: 'flex',
  flex: 1,
  justifyContent: 'flex-end',
});

type HeaderProps = {
  children?: JSX.Element;
}

export default function Header({ children }: HeaderProps) {
  const isMobile = useMediaQuery({ query: '(max-width: 500px)' });
  
  return (
    <HeaderStyled>
      <HeaderWrapper>
        <Home href="/">The (Re)cycler</Home>
        {!isMobile && (
          <span style={{ marginLeft: 4, color: 'rgba(255, 255, 255, 0.35)' }}>
            by <Labs href="https://automata.fi">Automata Labs Inc.</Labs>
          </span>
        )}
        <HeaderNavigation>
          {children}
        </HeaderNavigation>
      </HeaderWrapper>
    </HeaderStyled>
  );
}
