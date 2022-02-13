import styled from 'styled-components';

export const List = styled.ul`
  margin: 10px 0;
`;

export const Item = styled.li`
  padding-left: 1.25rem;
  padding-bottom: 2px;
  position: relative;

  &:before {
    content: "";
    background: rgba(255, 255, 255, 0.5);
    border-radius: 50%;
    top: 0.5em;
    height: 4px;
    left: 0;
    position: absolute;
    transform: translate(25%, 0);
    width: 4px;
  }
`;
