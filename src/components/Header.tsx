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

const HeaderNavigation = styled.div({
  display: 'flex',
  flex: 1,
  justifyContent: 'flex-end',
});

type HeaderProps = {
  children?: JSX.Element;
}

export default function Header({ children }: HeaderProps) {
  return (
    <HeaderStyled>
      <HeaderWrapper>
        <Home href="/">The (Re)cycler</Home>
        <span style={{ marginLeft: 4, opacity: 0.35 }}> by Automata Labs Inc.</span>
        <HeaderNavigation>
          {children}
        </HeaderNavigation>
      </HeaderWrapper>
    </HeaderStyled>
  );
}
