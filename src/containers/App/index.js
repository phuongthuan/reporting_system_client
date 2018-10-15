import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';

import { MainWrapper } from './styles';

const loading = () => <div>Loading...</div>;

const Home = Loadable({
  loader: () => import('components/Dashboard'),
  loading
});

const Auth = Loadable({
  loader: () => import('components/Auth'),
  loading
});

const App = () => (
  <div className="App">
    <MainWrapper>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/auth" component={Auth} />
      </Switch>
    </MainWrapper>
  </div>
);

export default App;
