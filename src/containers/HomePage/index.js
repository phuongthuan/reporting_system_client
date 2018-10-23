import React, { Component } from 'react';
import styled from 'react-emotion';

const HomeContainer = styled.div`
  color: hotpink;
`;

class HomePage extends Component {
  render() {
    return (
      <HomeContainer>
        Home Page.
      </HomeContainer>
    );
  }
}

export default HomePage;