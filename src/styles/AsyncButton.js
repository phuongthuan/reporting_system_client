import styled, { css } from 'react-emotion';

export const AsyncButtonStyles = styled.button`
  background-color: #3a405a;
  padding: 0.3em 1em;
  color: #FFFFFF;
  
  ${props => props.disabled && css`
      background-color: #cccccc;
      color: #666666;
  `}
`;