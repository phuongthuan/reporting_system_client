import React from 'react'
import styled from 'react-emotion'

const WrapperStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NoMatch = ({ location }) => (
  <WrapperStyled>
    <h3>
      Not found for <code>{location.pathname}</code>
    </h3>
  </WrapperStyled>
);

export default NoMatch;