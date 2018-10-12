import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from 'components/Home';
import { MainWrapper } from './styles';

const App = () => (
  <div className="App">
    <MainWrapper>
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </MainWrapper>
  </div>
);

export default App;
