import React from 'react';
import styled from 'react-emotion';

const WrapperStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NoPermision = ({location}) => (
  <WrapperStyled>
    <h3>
      You don't have permisson to access this route
      <code>{location.pathname}</code>
    </h3>
  </WrapperStyled>
);

export default NoPermision;