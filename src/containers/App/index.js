import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';

import { MainWrapper } from './styles';

const loading = () => <div>Loading...</div>;

const Home = Loadable({
  loader: () => import('components/Home'),
  loading
});

const Auth = Loadable({
  loader: () => import('components/Auth'),
  loading
});

const Member = Loadable({
  loader: () => import('containers/Member'),
  loading
});

const App = () => (
  <div className="App">
    <MainWrapper>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/auth" component={Auth} />
        <Route path="/member" component={Member} />
      </Switch>
    </MainWrapper>
  </div>
);

export default App;
